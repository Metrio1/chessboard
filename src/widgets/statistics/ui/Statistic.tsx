import {StatisticCard} from "./StatisticCard.tsx";
import "../index.scss";

export const Statistic = () => {

    return (
        <div className="statistic">
            <StatisticCard title={"Загрузка на сегодня"} />
            <StatisticCard title={"Гости сегодня"} />
            <StatisticCard title={"Заметки и указания"} />
            <StatisticCard title={"Состояния номеров"} />
        </div>
    )
}