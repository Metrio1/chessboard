import { ChessboardGrid } from "./ChessboardGrid";
import "../index.scss";
import type {DayInfo} from "../../../entities/day";

export const Chessboard = () => {
    const start = new Date(2025, 0, 1);
    const end = new Date(2025, 11, 31);
    const days: DayInfo[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push({
            date: new Date(d),
            day: d.getDate(),
            monthName: d.toLocaleString("ru", { month: "long" }),
            weekDay: d.toLocaleString("ru", { weekday: "short" }),
        });
    }

    const rooms = [
        { id: "r1", name: "Двухместный" },
        { id: "r2", name: "Трёхместный" },
        { id: "r3", name: "Четырёхместный" },
    ];

    return <ChessboardGrid days={days} rooms={rooms} />;
};