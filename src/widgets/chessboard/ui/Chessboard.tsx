import { ChessboardGrid } from "./ChessboardGrid";
import "../index.scss";
import {useEffect, useState} from "react";

interface RoomType {
    id: string;
    name: string;
}

export const Chessboard = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost/wp-json/booking/v1/room-types');
                if (!response.ok) throw new Error('Ошибка загрузки типов номеров');
                const data = await response.json();
                setRooms(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Произошла неизвестная ошибка');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return <ChessboardGrid rooms={rooms} />;
};
