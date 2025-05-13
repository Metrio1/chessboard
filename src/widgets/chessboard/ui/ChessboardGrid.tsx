import * as React from "react";
import "../index.scss";
import type { DayInfo } from "../../../entities/day.ts";

interface GridProps {
    days: DayInfo[];
    rooms: { id: string; name: string }[];
}

export const ChessboardGrid: React.FC<GridProps> = ({ days, rooms }) => {
    const monthGroups = days.reduce<Array<{ name: string; span: number }>>(
        (acc, cur) => {
            const last = acc[acc.length - 1];
            if (last && last.name === cur.monthName) last.span++;
            else acc.push({ name: cur.monthName, span: 1 });
            return acc;
        },
        []
    );

    return (
        <div className="chessboardGridWrapper">
            <div className="chessboardGrid">
                <div className="chessboardGrid__cell chessboardGrid__cell--corner" />

                {monthGroups.map((m, i) => (
                    <div
                        key={i}
                        className="chessboardGrid__cell chessboardGrid__cell--month"
                        data-span={m.span}
                    >
                        {m.name}
                    </div>
                ))}

                {days.map((d, i) => (
                    <div
                        key={i}
                        className="chessboardGrid__cell chessboardGrid__cell--header"
                    >
                        <div className="chessboardGrid__day-number">{d.day}</div>
                        <div className="chessboardGrid__weekday">{d.weekDay}</div>
                    </div>
                ))}

                {rooms.map((room) => (
                    <React.Fragment key={room.id}>
                        <div className="chessboardGrid__cell chessboardGrid__cell--row-header">
                            {room.name}
                        </div>
                        {days.map((_, idx) => (
                            <div
                                key={`${room.id}-${idx}`}
                                className="chessboardGrid__cell"
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>

    );
};