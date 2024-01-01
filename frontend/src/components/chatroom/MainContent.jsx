import { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./MainContent.css"
import socket from "../../Socket";
import ActiveUsers from "../ActiveUser/ActiveUsers";


function MainContent() {
    
    const [UserMsg, SetUserMsg] = useState([]);

    const User = sessionStorage.getItem("Username");
    const token = sessionStorage.getItem("data");
    
    useEffect(() => {

        socket.addEventListener("open", (event) => {
            socket.send(JSON.stringify({"Type":"New User Joined",User,token,msg:"Joined The chat"}));
            console.log("Connection started");
        })

        socket.addEventListener("message", (event) => {

            const RecivedData = JSON.parse(event.data);

            if (UserMsg.length > 0) {

                const lastObj = UserMsg[UserMsg.length - 1];
    
                if (lastObj.Username === RecivedData.data.User && lastObj.Msg === RecivedData.data.msg) {
                    console.log("Copied ele");
                } else {
                    SetUserMsg((UserMsg) => [...UserMsg, { "Username": RecivedData.data.User, "Msg": RecivedData.data.msg }]);
                }
            } else {
                SetUserMsg((UserMsg) => [...UserMsg, { "Username": RecivedData.data.User, "Msg": RecivedData.data.msg }]);
            }
        })

        socket.close = (event) => {
            console.log("Event Closed");
            socket.send(JSON.stringify({"Type":"Close",User,token,"msg":"Left The Chat"}));
        }

    },[])


    function HandleMsg() {

        const msg = document.getElementById("msg").value;
        document.getElementById("msg").value = "";

        if (msg !== null) {
            
            const UserMsg = {
                User,
                msg,
                token,
                "Type": "Public",
                "With": "All"
            }
            socket.send(JSON.stringify(UserMsg));
        }
    }


    return (
        <div>
            <div className="root">
                <div className="child-1">
                    {
                        UserMsg.map((ele) => (
                            <Message UserName={ele.Username} Msg={ele.Msg} ></Message>
                        ))
                    }
                </div>
                <div className="child-2">
                    <ActiveUsers></ActiveUsers>
                </div>
            </div>
            <div>
                <input type="text" name="msg" id="msg" />
                <button onClick={HandleMsg}>Send</button>
                <button onClick={socket.close}>Close</button>
            </div>
        </div>
    )
}

export default MainContent
