import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Sources } from "../sources";
import { World } from "../worlds/world";
import { BulletTank } from "./bulletTank";
import { PlayerTank } from "./playerTank";

export class TwinTank extends BulletTank {
    private _barrelIndex = 0;

    public constructor(world: World, parent: TransformNode, previousTank?: PlayerTank) {
        super(world, TwinTank.CreateNode(world.sources, parent), previousTank);
    }

    public static CreateNode(sources: Sources, parent?: TransformNode): TransformNode {
        return sources.create(sources.tank.twin, parent);
    }

    public override shoot(): void {
        if (this._reloadTime === 0) {
            this._shootFrom(this._barrels[this._barrelIndex]!);
            this._barrelIndex = (this._barrelIndex + 1) % this._barrels.length;
            this._reloadTime = this._properties.reloadTime;
        }

        PlayerTank.prototype.shoot.call(this);
    }
}
