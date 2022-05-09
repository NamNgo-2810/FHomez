import React from "react";
import "./Message.module.scss";

function Message({ own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src="" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    );
}

export default Message;
