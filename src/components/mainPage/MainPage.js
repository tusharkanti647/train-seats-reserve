import { useState } from "react";
import From from "../from/From";
import Seats from "../seats/Seats";


function MainPage() {
    const [userData, setUserData] = useState({
        userName: "",
        seatsData: [],
        message: ""
    });

    //render the main page
    //----------------------------------------------------------------------------------------------
    return (<>
        <From setUserData={setUserData} />
        {userData.message ? <div style={{ display: "flex", justifyContent: "center", margin: "20px", color: "#1976D2" }} ><h3>{userData.message}</h3></div> :
            (userData.userName ? (<div style={{ display: "flex", justifyContent: "center", margin: "20px", color: "#1976D2" }}>
                <h3>{userData.userName} you are successfully reserved seat number are <br />
                    {userData.seatsData.map((ele) => ele + "  ")}</h3>
            </div>) : "")}
        <Seats userData={userData} />
    </>)
}

export default MainPage;