import { useState } from "react"
import socket from "../../Socket";
import Message from "../Message/Message";
import ActiveUserMessageBox from "../Message/ActiveUserMessageBox";


function ActiveUsers(){
    
    const [ ActiveUsers , SetActiveUsers] = useState(new Set());

    socket.onmessage = ((MessageFromTheServer) => {

        const ParsedMessageFromTheServer = JSON.parse(MessageFromTheServer.data);
        

        const CurrentUser = ParsedMessageFromTheServer.data.User;

        console.log(CurrentUser);


        if(ParsedMessageFromTheServer.data.msg === "Left The Chat")
        {
            const NewActiveUserList = new Set(ActiveUsers);
            NewActiveUserList.delete(CurrentUser);

            SetActiveUsers((ActiveUsers) => NewActiveUserList);   
        }else{
            if(!ActiveUsers.has(CurrentUser)){
                SetActiveUsers((ActiveUsers) => new Set([...ActiveUsers,`${CurrentUser}`]));
            }
        }
    
    })
    

    return(
        <div>
            <h1>Active Users</h1>
            {
                Array.from(ActiveUsers).map((element)=>(
                       <ActiveUserMessageBox User={element} ></ActiveUserMessageBox>
                ))
            }
        </div>
    )
}

export default ActiveUsers;