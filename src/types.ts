import {ModelConfig} from "@antv/g6-core";

export interface Tasks extends ModelConfig {
    operatingUnitId: string;
    operatingUnitName: string;
    finCount: number;
    onScheduleFinCount: number;
    behindScheduleFinCount: number;
    completeFinCount: number;
    planPercentComplete: number;
    realPercentComplete: number;
    progressStatus: number;
    children?: Array<Tasks>;
}