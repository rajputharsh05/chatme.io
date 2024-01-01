import axios from "axios"
import React from "react";
import "./Login.css"
import Nav from "../chatroom/Nav";

function Login(){

  async function handleLogin(e){
       console.log(e.view.location);
       const EmailEle = document.getElementById("Email");
       const PasswordEle = document.getElementById("password");
       const Email = EmailEle.value;
       const Password = PasswordEle.value;
       console.log(Email,Password)
       EmailEle.value = "";
       PasswordEle.value = "";

       try{
              const result = await axios.post("http://localhost:8000/chatme.io/login",{
                     Password,
                     Email
              });
              if(result.data.token){
                     sessionStorage.setItem('data',result.data.token)
                     sessionStorage.setItem('Username',result.data.Fname)
                     e.view.location.href = "http://localhost:3000/chatroom"
                     console.log(e.view.location);
              }
       }catch(err){
              console.log(err);
       }
}

     return(
       <>
        <Nav></Nav>
        <div className="Main" >
               <div className="center">
                      <input id = "Email" type="text" placeholder="Your Email"></input>
                      <input id = "password" type="text" placeholder="Your password"></input>
                      <button onClick={ handleLogin }>Login</button>
               </div>
        </div>
       </>
     )
}

export default Login