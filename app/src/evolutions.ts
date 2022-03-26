import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Sources } from "./sources";
import { AssassinTank } from "./tanks/assassinTank";
import { BaseTank } from "./tanks/baseTank";
import { DirectorTank } from "./tanks/directorTank";
import { FlankGuardTank } from "./tanks/flankGuardTank";
import { GatlingGunTank } from "./tanks/gatlingGunTank";
import { HunterTank } from "./tanks/hunterTank";
import { LancerTank } from "./tanks/lancerTank";
import { LauncherTank } from "./tanks/launcherTank";
import { MachineGunTank } from "./tanks/machineGunTank";
import { PlayerTank } from "./tanks/playerTank";
import { PounderTank } from "./tanks/pounderTank";
import { SniperTank } from "./tanks/sniperTank";
import { TrapperTank } from "./tanks/trapperTank";
import { TwinSniperTank } from "./tanks/twinSniperTank";
import { TwinTank } from "./tanks/twinTank";
import { World } from "./worlds/world";

interface TankConstructor {
    prototype: PlayerTank;
    new(world: World, parent: TransformNode, previousTank?: PlayerTank): PlayerTank;
    CreateMesh(sources: Sources, parent?: TransformNode): AbstractMesh;
}

export interface EvolutionNode {
    readonly Tank: TankConstructor;
    readonly children: Array<EvolutionNode>;
}

export const EvolutionRootNode: EvolutionNode = {
    Tank: BaseTank,
    children: [{
        Tank: SniperTank,
        children: [{
            Tank: AssassinTank,
            children: [],
        }, {
            Tank: TwinSniperTank,
            children: [],
        }, {
            Tank: GatlingGunTank,
            children: [],
        }, {
            Tank: HunterTank,
            children: [],
        }]
    }, {
        Tank: TwinTank,
        children: [{
            Tank: TwinSniperTank,
            children: [],
        }]
    }, {
        Tank: FlankGuardTank,
        children: []
    }, {
        Tank: PounderTank,
        children: [{
            Tank: LauncherTank,
            children: []
        }]
    }, {
        Tank: DirectorTank,
        children: []
    }, {
        Tank: TrapperTank,
        children: []
    }, {
        Tank: MachineGunTank,
        children: [{
            Tank: GatlingGunTank,
            children: [],
        }]
    }, {
        Tank: LancerTank,
        children: []
    }],
};
