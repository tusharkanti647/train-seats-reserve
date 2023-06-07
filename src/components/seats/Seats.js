import EventSeatIcon from '@mui/icons-material/EventSeat';

import "./Seats.css";
import { useEffect, useState } from "react";


//give the color 
//-----------------------------------------------------------
//for own seats color is green
const ownSeatsColor={color:"green"}
//for reserved seats by other user color is brown
const otherUserSeatsColor={color:"brown"}

function Seats({userData}) {
    const [seats, setSeats]=useState([]);

    //
    useEffect(()=>{
        const fetchFun= async ()=>{
            const response = await fetch("http://localhost:8000/seats-get");
            const data = await response.json();
            setSeats(data);
        }
        fetchFun();
    },[userData.userName]);
    

    return (<div style={{marginTop:'30px'}}>
        <div className="box-container">
            {seats.map((seat) => (
                <div key={seat.seatNumber} style={seat.user ? (seat.user===userData.userName ? ownSeatsColor : otherUserSeatsColor) : {}} className="box">
                    <EventSeatIcon />
                    {seat.seatNumber}
                </div>
            ))}
        </div>
    </div>)
}

export default Seats;