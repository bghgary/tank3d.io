import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Sources } from "../sources";
import { World } from "../worlds/world";
import { BulletTank } from "./bulletTank";
import { PlayerTank } from "./playerTank";

export class GatlingGunTank extends BulletTank {
    public constructor(world: World, parent: TransformNode, previousTank?: PlayerTank) {
        super(world, GatlingGunTank.CreateNode(world.sources, parent), previousTank);
    }

    public static CreateNode(sources: Sources, parent?: TransformNode): TransformNode {
        return sources.create(sources.tank.gatlingGun, parent);
    }
}
