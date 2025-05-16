import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.js";
import { Booking } from '../pages/booking/ui/Booking.jsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Booking />
  </StrictMode>,
)
