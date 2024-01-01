import axios from "axios"
import Nav from "../chatroom/Nav"

function SignUp() {

    function handleSignup() {
        const EmailEle = document.getElementById("Email")
        const FnameEle = document.getElementById("Fname")
        const LnameEle = document.getElementById("Lname")
        const PasswordEle = document.getElementById("Password")
        const Password = PasswordEle.value
        const Fname = FnameEle.value
        const Lname = LnameEle.value
        const Email = EmailEle.value
        EmailEle.value = ""
        PasswordEle.value = ""
        LnameEle.value = ""
        FnameEle.value = ""
        console.log(Fname, Lname, Password, Email)
        axios.post("http://localhost:8000/chatme.io/", {
            Fname,
            Lname,
            Password,
            Email
        }).then(() => {
            console.log("data sent !")
        })
    }

    return (
        <>
            <Nav></Nav>
            <div className="Main">
                <div className="center">
                    <input id="Email" type="text" placeholder="Your Email"></input>
                    <input id="Fname" type="text" placeholder="Your First Name"></input>
                    <input id="Lname" type="text" placeholder="Your Last Name"></input>
                    <input id="Password" type="text" placeholder="Your password"></input>
                    <button onClick={handleSignup} >Sign-Up</button>
                </div>
            </div>
        </>
    )
}

export default SignUp