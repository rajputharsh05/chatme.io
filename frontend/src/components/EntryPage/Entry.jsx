import { useState } from "react"
import Login from "./Login";
import SignUp from "./SignUp";


function Entry(){
    
    const [current , Setcurrent] = useState("Login");
    const [btnText,SetbtnText] = useState("Not created an account")

    function handlechnage(){
        if(current === "Login"){
            Setcurrent("Signup")
        }else{
            Setcurrent("Login")
        }
        handlebtnText();
    }

    function handlebtnText(){
        if(btnText === "Not created an account"){
            SetbtnText("Already have an account");
        }else{
            SetbtnText("Not created an account");
        }
    }



    if(current === "Login")
    {
        return (
            <div>
               <Login></Login>
               <button onClick={ handlechnage }>{btnText}</button>
            </div>
        )
    }else{
        return (
            <div>
                <SignUp></SignUp>
                <button onClick={handlechnage}>{btnText}</button>
            </div>
        )
    }
}

export default Entry


