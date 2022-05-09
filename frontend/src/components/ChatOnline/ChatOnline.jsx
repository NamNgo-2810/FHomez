import React from "react";
import "./ChatOnline.module.scss";

function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="" alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Nam Ngo</span>
            </div>
        </div>
    );
}

export default ChatOnline;
