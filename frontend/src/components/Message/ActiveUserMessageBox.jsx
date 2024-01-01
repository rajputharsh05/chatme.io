

function ActiveUserMessageBox({User}){

    function SendUsersToPrivateChatRoom(e){
        e.view.location.href = "http://localhost:3000/privatechat"
    }

    return (
        <div className="ActiveUserListElement">
             <h2>{User}</h2>
             <button onClick={SendUsersToPrivateChatRoom} >Message privately !</button>
        </div>
    )
}

export default ActiveUserMessageBox