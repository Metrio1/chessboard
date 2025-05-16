import "../index.scss";
import {Chessboard} from "../../../widgets/chessboard/ui/Chessboard.jsx";

export const Booking = () => {

  return (
    <>
      <div className="booking">
        <h1 className="booking__title">Шахматка броней</h1>
          <Chessboard />
      </div >
    </>
  )
}
