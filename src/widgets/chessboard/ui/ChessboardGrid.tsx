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
        <div className="chessboardGrid">
            <div className="chessboardGrid__left">
                <div className="chessboardGrid__cell chessboardGrid__cell--corner" />
                {rooms.map(room => (
                    <div key={room.id} className="chessboardGrid__cell chessboardGrid__cell--row-header">
                        {room.name}
                    </div>
                ))}
            </div>

            <div className="chessboardGrid__right">
                <div className="chessboardGrid__header">
                    <div className="chessboardGrid__months">
                        {monthGroups.map((m, i) => (
                            <div
                                key={i}
                                className="chessboardGrid__cell chessboardGrid__cell--month"
                                style={{ gridColumn: `span ${m.span}` }}
                            >
                                {m.name}
                            </div>
                        ))}
                    </div>
                    <div className="chessboardGrid__days">
                        {days.map((d, i) => (
                            <div
                                key={i}
                                className="chessboardGrid__cell chessboardGrid__cell--header"
                            >
                                <div className="chessboardGrid__day-number">{d.day}</div>
                                <div className="chessboardGrid__weekday">{d.weekDay}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chessboardGrid__body">
                    {rooms.map((room) => (
                        <div key={room.id} className="chessboardGrid__row">
                            {days.map((_, idx) => (
                                <div
                                    key={`${room.id}-${idx}`}
                                    className="chessboardGrid__cell"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};