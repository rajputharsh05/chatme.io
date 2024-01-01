import "./Nav.css"
 
function Nav(){
    const CurrentLoggedInUser = sessionStorage.getItem("Username")
    return (
        <div className="Nav" >
                <h3>ChatMe.IO </h3>
                <h6>{CurrentLoggedInUser}</h6>
        </div>
    )
}

export default Nav;