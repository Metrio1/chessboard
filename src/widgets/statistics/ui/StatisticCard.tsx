import * as React from "react";

export interface StatisticCardProps {
    title: string;
}
export const StatisticCard: React.FC<StatisticCardProps> = ({
    title = "Загаловок карточки"
}) => {

    return (
        <div className="statisticCard">
            <div className="statisticCard__title">
                {title}
            </div>
        </div>
    )
}