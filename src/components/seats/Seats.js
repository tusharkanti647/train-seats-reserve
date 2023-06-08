import EventSeatIcon from '@mui/icons-material/EventSeat';

import "./Seats.css";
import { useEffect, useState } from "react";
import Lodar from '../Lodar';


//give the color 
//-----------------------------------------------------------
//for own seats color is green
const ownSeatsColor={color:"green"}
//for reserved seats by other user color is brown
const otherUserSeatsColor={color:"brown"}

function Seats({userData}) {
    const [seats, setSeats]=useState([]);
    const [isLodarShow, setIsLodarShow] = useState(false);

    //fetch the seats from db
    //----------------------------------------------------------------------------------------
    useEffect(()=>{
        const fetchFun= async ()=>{
            setIsLodarShow(true);
            const response = await fetch("https://train-seats-reserve.onrender.com/seats-get");
            const data = await response.json();
            setIsLodarShow(false);
            setSeats(data);
        }
        fetchFun();
    },[userData.userName, userData.seatsData]);
    


    //render the the lodar
    if(isLodarShow){
        return(<Lodar />);
    }

    //render the seats
    //------------------------------------------------------------------------------------------------
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