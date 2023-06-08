import { Box, Button, TextField } from "@mui/material";
import Lodar from "../Lodar";

const { useState } = require("react");


function From({setUserData}) {
    const [inputData, seatInputData] = useState({
        userName: "",
        seatCount: 0,
    });
    const [isLodarShow, setIsLodarShow] = useState(false);


    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        seatInputData({ ...inputData, [name]: value });
    }

    //handel submit data
    //-------------------------------------------------------------------------
    const handelSUbmit = async (event) => {
        event.preventDefault();

        try{
            const {userName, seatCount}= inputData;

            //if userName is not provided or number of seatCount is not between 1 to 7 it return
            if(!userName){
                alert("Please enter user name");
                return;
            }
            if(seatCount<=0 || seatCount>7){
                alert("Enter number of seat between 1 to 7");
                return;
            }
            setIsLodarShow(true);
            const response = await fetch("https://train-seats-reserve.onrender.com/seats-reserved", {
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({userName, seatCount})
            });
            const userData = await response.json();
            setIsLodarShow(false);
            //set the response
            setUserData({userName: userData.seatData.userName, seatsData: userData.seatData.seatsData, message: userData.message});
            seatInputData({userName: "", seatCount: 0,});
        }catch(err){
            console.log(err);
        }
    }

    //render the the lodar
    if(isLodarShow){
        return(<Lodar />);
    }


    //render the input fill
    //------------------------------------------------------------------------------
    return (<div style={{ display: "flex", justifyContent: "center" }} >
        <div style={{ width: "400px", display: "flex",  justifyContent: "center", alignItems: "center" }}>
            <Box
                component="form"
                method="POST"
                onSubmit={handelSUbmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="on"
            >
                <div >
                    <div style={{ display: "flex", justifyContent: "center", color:"#1976D2" }}>
                        <h2>Please Fill The Booking details</h2>
                    </div>
                    <TextField
                        error={false}
                        required
                        name="userName"
                        id="outlined-required-userName"
                        label="User Name"
                        value={inputData.userName}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="seatCount"
                        type="number"
                        id="outlined-required-number"
                        label="Number of Seats Book"
                        value={inputData.seatCount>0 ? inputData.seatCount :""}
                        onChange={handelInput}
                    />



                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handelSUbmit} variant="contained">SAVE</Button>
                    </div>
                </div>
               

            </Box>
        </div>
    </div>)
}

export default From;