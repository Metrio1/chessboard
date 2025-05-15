import "../index.scss";
import type { DayInfo } from "../../../entities/day.ts";
import {useState} from "react";

interface GridProps {
    rooms: { id: string; name: string }[];
}

export const ChessboardGrid = ({ rooms }: GridProps) => {

    const [selectedRanges, setSelectedRanges] = useState<Record<string, { start: number; end: number }[]>>({});
    const [dragState, setDragState] = useState<{ roomId: string; startIdx: number } | null>(null);

    const handleMouseDown = (roomId: string, dayIdx: number) => {
        setDragState({ roomId, startIdx: dayIdx });

        setSelectedRanges(prev => ({
            ...prev,
            [roomId]: [...(prev[roomId] || []), { start: dayIdx, end: dayIdx }],
        }))
    }

    const handleMouseEnter = (roomId: string, dayIdx: number) => {
        if (!dragState || dragState.roomId !== roomId) return;

        const start = dragState.startIdx;
        const newRange = { start: Math.min(start, dayIdx), end: Math.max(start, dayIdx) };

        setSelectedRanges(prev => {
            const ranges = [...(prev[roomId] || [])];
            ranges[ranges.length - 1] = newRange;

            return { ...prev, [roomId]: ranges };
        });
    };

    const handleMouseUp = () => {
        setDragState(null);
    };


    // Состояние: дата первого дня текущего отображаемого месяца
    const [visibleDate, setVisibleDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    // Генерирует список дней для переданного месяца
    const getDaysForMonth = (date: Date): DayInfo[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days: DayInfo[] = [];

        const d = new Date(year, month, 1);

        // Пока дата принадлежит указанному месяцу, добавляем в массив
        while (d.getMonth() === month) {
            days.push({
                date: new Date(d),
                day: d.getDate(),
                year: d.getFullYear(),
                monthName: d.toLocaleString("ru", { month: "long" }),
                weekDay: d.toLocaleString("ru", { weekday: "short" }),
            });
            d.setDate(d.getDate() + 1); // переходим к следующему дню
        }

        return days;
    };

    const visibleDays = getDaysForMonth(visibleDate);
    const visibleMonthName = visibleDate.toLocaleString("ru", { month: "long" });
    const visibleYear = visibleDate.getFullYear();

    const goToPrevMonth = () => {
        setVisibleDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setVisibleDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    return (
        <div className="chessboardGrid">
            <div className="chessboardGrid__left">
                <div className="chessboardGrid__cell chessboardGrid__cell--corner" />
                {rooms.map(room => (
                    <div
                        key={room.id}
                        className="chessboardGrid__cell chessboardGrid__cell--row-header"
                    >
                        {room.name}
                    </div>
                ))}
            </div>

            <div className="chessboardGrid__right">
                <div className="chessboardGrid__header">
                    <div className="chessboardGrid__months">
                        <div className="chessboardGrid__month-navigation">
                            <button onClick={goToPrevMonth}>←</button>
                        </div>
                        <div className="chessboardGrid__month-name">
                            {visibleMonthName} {visibleYear}
                        </div>
                        <div className="chessboardGrid__month-navigation chessboardGrid__month-navigation-right">
                            <button onClick={goToNextMonth}>→</button>
                        </div>
                    </div>

                    <div className="chessboardGrid__days">
                        {visibleDays.map((d, i) => (
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
                    {rooms.map(room => (
                        <div key={room.id} className="chessboardGrid__row">
                            {visibleDays.map((_, idx) => (
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
