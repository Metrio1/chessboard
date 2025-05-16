import "../index.scss";
import {useState} from "react";
import { format, compareAsc } from "date-fns";


export const ChessboardGrid = ({rooms}) => {

    const [reservation, setReservation] = useState(false)

    const handleMouseDown = (roomId, formattedDate) => {
        console.log(roomId, formattedDate);
    }

    const handleMouseEnter = (roomId, formattedDate) => {
        console.log(roomId, formattedDate);
    };

    const handleMouseUp = () => {

    };


    // Состояние: дата первого дня текущего отображаемого месяца
    const [visibleDate, setVisibleDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    // Генерирует список дней для переданного месяца
    const getDaysForMonth = (date)=> {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = [];

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

    console.log(visibleDays);

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
                        {visibleDays.map((dayInfo, i) => (
                            <div
                                key={i}
                                className="chessboardGrid__cell chessboardGrid__cell--header"
                            >
                                <div className="chessboardGrid__day-number">{dayInfo.day}</div>
                                <div className="chessboardGrid__weekday">{dayInfo.weekDay}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chessboardGrid__body">
                    {rooms.map(room => (
                        <div key={room.id} className="chessboardGrid__row">
                            {visibleDays.map((dayInfo, idx) => (
                                <div
                                    key={`${room.id}-${idx}`}
                                    className="chessboardGrid__cell"
                                    data-js={room.id}
                                    // onMouseDown={() => handleMouseDown(room.id, `${dayInfo.date.getFullYear()}-${dayInfo.date.getMonth() + 1}-${dayInfo.date.getDate()}`)}
                                    onMouseDown={() => handleMouseDown(`${room.id}`, format(new Date(dayInfo.date), "dd-MM-yyyy"))}
                                    onMouseEnter={() => handleMouseEnter(`${room.id}`, format(new Date(dayInfo.date), "dd-MM-yyyy"))}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
