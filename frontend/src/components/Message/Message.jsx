import React from "react";
import "./Message.css";
import { format } from "timeago.js";

function Message({ message, own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={
                        own
                            ? "https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/274923351_1337119300139137_3012035318960112960_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=ds_b6ZVMWy8AX81iBPT&_nc_ht=scontent-hkt1-1.xx&oh=00_AT_Mrse_kwxS3R_rosAc0isg9YSkpLEbLx6jVBipcNaVXA&oe=627FE3AA"
                            : "https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-9/78498609_1829635693846512_3492573706100670464_n.jpg?_nc_cat=107&ccb=1-6&_nc_sid=174925&_nc_ohc=tAAbT9vLCJgAX8TSIO0&_nc_ht=scontent.fhan3-2.fna&oh=00_AT_YquzHOjufhv4USaF0iSY7wtvJSM-ys_zuEBLbF38zEQ&oe=62A372C4"
                    }
                    alt=""
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}

export default Message;
