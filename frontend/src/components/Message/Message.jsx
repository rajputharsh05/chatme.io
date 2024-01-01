
import "./Message.css"

function Message( {UserName , Msg} ){
    return (
        <div className="message">
            {
                <p>{UserName} :  {Msg}</p>
            }
        </div>
    )
}

export default Message;