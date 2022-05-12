import React from "react";
import "./Message.css";

function Message({ message, own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={
                        own
                            ? "https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/274923351_1337119300139137_3012035318960112960_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=ds_b6ZVMWy8AX81iBPT&_nc_ht=scontent-hkt1-1.xx&oh=00_AT_Mrse_kwxS3R_rosAc0isg9YSkpLEbLx6jVBipcNaVXA&oe=627FE3AA"
                            : "https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-1/239899002_2453517901458285_4456313710144166463_n.jpg?stp=c0.49.248.248a_dst-jpg&_nc_cat=111&ccb=1-6&_nc_sid=7206a8&_nc_ohc=VdoViWadUE4AX-9tttt&_nc_ht=scontent-hkt1-1.xx&oh=00_AT8Hs_JHp5dek70KCGDnu04SXdxaRhHlLx7g6rw87d1KFw&oe=627EE20B"
                    }
                    alt=""
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    );
}

export default Message;
