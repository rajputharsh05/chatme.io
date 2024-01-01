const express = require("express");
const server = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { connect } = require("./utility/db");
const userRouter = require("./views/userView");
const { WebSocketServer, WebSocket } = require("ws");
const JWT = require("jsonwebtoken")
const JWT_SECRET = "@Harsh12345";

const PORT = process.env.PORT || 8000;
const URL = process.env.URL;

server.use(cors());
server.use(bodyparser.urlencoded({ extended: false }))
server.use(bodyparser.json());


server.use("/chatme.io", userRouter)

const s = server.listen(8000, () => {
    console.log("server started")
    connect();
})





const wss = new WebSocketServer({ noServer: true });

function onSocketPreError(){
    console.log("Pre Error");
}

function onSocketPostError() {
    console.log("Post Error");
}

s.on("upgrade", (req, socket, head) => {
    socket.on('error', onSocketPreError)
    wss.handleUpgrade(req, socket, head, (ws) => {
        socket.removeListener('error', onSocketPreError);
        wss.emit('connection', ws, req);
    })
})

const records = new Map();

function SendMsgToSubscribers(Subscribers , MessageToBeSend){
        Subscribers.forEach((Subscriber) => {
            if(Subscriber.readyState === WebSocket.OPEN) {
                Subscriber.send(JSON.stringify(MessageToBeSend));
            }
        })
}


function CreateDataPackageForSubscribers(ParsedMessageOfSubsriber, records){
            const MessageForSubscribers = {
                "data" : {
                    "User" : ParsedMessageOfSubsriber.User,
                    "msg" : ParsedMessageOfSubsriber.msg
                },
                "records" : JSON.stringify(records)
            } 
    return MessageForSubscribers;    
}


wss.on("connection",(ws,req) => {

   
    ws.on('error',onSocketPostError);


    ws.on('message',(MessageFromSubscriber) => {

        const ParsedMessageOfSubsriber = JSON.parse(MessageFromSubscriber);
        const { Type } = ParsedMessageOfSubsriber;
        const JWT_Token = ParsedMessageOfSubsriber.token; 
        const UserDataFromJWT = JWT.verify(JWT_Token,JWT_SECRET);
        
        if(Type === "New User Joined")
        {
            const UserEmail = UserDataFromJWT.Email;
            records.set(UserEmail,ws);
            const MessageForSubscribers = CreateDataPackageForSubscribers(ParsedMessageOfSubsriber,records);

            SendMsgToSubscribers(wss.clients,MessageForSubscribers)
            
        } else if (Type === "Private")
        {
            const UserEmail = UserDataFromJWT.Email;
            records.set(UserEmail,ws);
            const MessageForSubscribers = CreateDataPackageForSubscribers(ParsedMessageOfSubsriber,records);

            const EmailOfPartner1 = UserDataFromJWT.Email;
            const EmailOfPartner2 = UserDataFromJWT.Email;
            
            const Partner1 = records.get("rishab@gmail.com");
            const Partner2 = records.get("hsd020@nist.edu");

            const PrivateChat = {
                Partner1,
                Partner2,
            }

            if(Partner1 && Partner1.readyState === WebSocket.OPEN){
                Partner1.send(JSON.stringify(MessageForSubscribers))
            }

            if(Partner2 && Partner2.readyState === WebSocket.OPEN){
                Partner2.send(JSON.stringify(MessageForSubscribers))
            }

        } else if (Type === "Public")
        {
            const UserEmail = UserDataFromJWT.Email;
            records.set(UserEmail,ws);

            const MessageForSubscribers = CreateDataPackageForSubscribers(ParsedMessageOfSubsriber,records);

            SendMsgToSubscribers(wss.clients,MessageForSubscribers)

        } else if (Type === "Close") 
        {
            const UserEmail = UserDataFromJWT.Email;

            console.log("One user disconnected");
            console.log(records);
            records.delete(UserEmail);
            console.log(records);

            const MessageForSubscribers = CreateDataPackageForSubscribers(ParsedMessageOfSubsriber,records);

            SendMsgToSubscribers(wss.clients,MessageForSubscribers)

        }
    })
})

