import {Tasks} from "../types";

export const mockData = {
    operatingUnitId: "3280a3a0-7e66-46d6-a215-66c68e88d5f6",
    operatingUnitName: "Tổng công ty",
    operatingUnitCode: "TCT",
    finCount: 12,
    onScheduleFinCount: 12,
    behindScheduleFinCount: 0,
    completeFinCount: 1,
    planPercentComplete: 1.39,
    realPercentComplete: 25,
    progressStatus: 0,
    children: [
        {
            operatingUnitId: "3280a3a0-7e66-46d6-a215-66c68e88d5f6",
            operatingUnitName: "Công Ty Dịch Vụ Khí",
            operatingUnitCode: "DVK",
            finCount: 12,
            onScheduleFinCount: 12,
            behindScheduleFinCount: 0,
            completeFinCount: 1,
            planPercentComplete: 1.39,
            realPercentComplete: 25,
            progressStatus: 0
        },
        {
            operatingUnitId: "48bad6d6-bd68-4353-a1fa-8770f16d6d82",
            operatingUnitName: "Công Ty Vận Chuyển Khí Đông Nam Bộ",
            operatingUnitCode: "KDN",
            finCount: 5,
            onScheduleFinCount: 5,
            behindScheduleFinCount: 0,
            completeFinCount: 1,
            planPercentComplete: 79.36,
            realPercentComplete: 0,
            progressStatus: 1
        },
        {
            operatingUnitId: "3726ac41-c426-4534-9955-4410bbda9ea8",
            operatingUnitName: "Công Ty Khí Cà Mau",
            operatingUnitCode: "KCM",
            finCount: 3,
            onScheduleFinCount: 3,
            behindScheduleFinCount: 0,
            completeFinCount: 0,
            planPercentComplete: 22.22,
            realPercentComplete: 34.34,
            progressStatus: 0
        },
        {
            operatingUnitId: "81979e76-bbf1-461d-99c4-581ad51614fb",
            operatingUnitName: "Chi Nhánh Khí Hải Phòng",
            operatingUnitCode: "KHP",
            finCount: 3,
            onScheduleFinCount: 3,
            behindScheduleFinCount: 0,
            completeFinCount: 0,
            planPercentComplete: 1.39,
            realPercentComplete: 0.4,
            progressStatus: 1
        },
        {
            operatingUnitId: "8083ea9b-7fdf-48a5-a141-4dfcbe9d7c2f",
            operatingUnitName: "Công ty chế biến Khí Vũng Tàu",
            operatingUnitCode: "KVT",
            finCount: 16,
            onScheduleFinCount: 16,
            behindScheduleFinCount: 0,
            completeFinCount: 1,
            planPercentComplete: 97.71,
            realPercentComplete: 27.76,
            progressStatus: 1
        }
    ],
} as Tasks;