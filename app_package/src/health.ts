import { InstancedMesh } from "@babylonjs/core";

const REGEN_TIME = 30;
const REGEN_SPEED = 0.2;
const DAMAGE_SPEED = 5;

export class Health {
    private readonly _mesh: InstancedMesh;
    private readonly _size: number;
    private readonly _max: number;
    private _current: number;
    private _target: number;
    private _speed = 0;
    private _regenTime = 0;

    public constructor(mesh: InstancedMesh, size: number, max: number) {
        this._mesh = mesh;
        this._size = size;
        this._max = this._current = this._target = max;
    }

    public update(deltaTime: number): boolean {
        if (this._target < this._current) {
            this._mesh.setEnabled(true);
            this._current = Math.max(Math.max(this._current - this._speed * deltaTime, this._target), 0);
            this._mesh.scaling.x = this._current / this._max * this._size;
            if (this._current === 0) {
                this._target = this._current;
                return false;
            }
        } else if (this._target > this._current) {
            this._mesh.setEnabled(true);
            this._current = Math.min(Math.min(this._current + this._speed * deltaTime, this._target), this._max);
            this._mesh.scaling.x = this._current / this._max * this._size;
            if (this._current === this._max) {
                this._target = this._current;
                this._mesh.setEnabled(false);
            }
        } else if (this._regenTime > 0) {
            this._regenTime = Math.max(this._regenTime - deltaTime, 0);
            if (this._regenTime === 0) {
                this._target = this._max;
                this._speed = this._max * REGEN_SPEED;
            }
        }

        return true;
    }

    public damage(value: number): void {
        this._target = Math.min(this._current, this._target) - value;
        this._speed = (this._current - this._target) * DAMAGE_SPEED;
        this._regenTime = REGEN_TIME;
    }
}
