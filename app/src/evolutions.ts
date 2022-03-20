import { BaseTank } from "./tanks/baseTank";
import { FlankGuardTank } from "./tanks/flankGuardTank";
import { PounderTank } from "./tanks/pounderTank";
import { SniperTank } from "./tanks/sniperTank";
import { PlayerTank } from "./tanks/playerTank";
import { TwinTank } from "./tanks/twinTank";
import { World } from "./worlds/world";
import { Sources } from "./sources";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { DirectorTank } from "./tanks/directorTank";
import { TrapperTank } from "./tanks/trapperTank";
import { MachineGunTank } from "./tanks/machineGunTank";
import { LancerTank } from "./tanks/lancerTank";
import { AssassinTank } from "./tanks/assassinTank";
import { TwinSniperTank } from "./tanks/twinSniperTank";
import { GatlingGunTank } from "./tanks/gatlingGunTank";

interface TankConstructor {
    prototype: PlayerTank;
    new(world: World, parent: TransformNode, previousTank?: PlayerTank): PlayerTank;
    CreateNode(sources: Sources, parent?: TransformNode): TransformNode;
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
        children: []
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
