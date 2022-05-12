import React, { useEffect, useState } from "react";
import axios from "axios";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import "./Chat.css";

function Chat() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    const user = {
        id: "123",
        profilePicture:
            "https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/274923351_1337119300139137_3012035318960112960_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=ds_b6ZVMWy8AX81iBPT&_nc_ht=scontent-hkt1-1.xx&oh=00_AT_Mrse_kwxS3R_rosAc0isg9YSkpLEbLx6jVBipcNaVXA&oe=627FE3AA",
        username: "Nam",
    };

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/chat/conversation?userId=${user.id}`
                );
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
    }, [user.id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/chat/message?conversationId=627a68fb2141eb8b9e643b9f`
                );
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, []);

    return (
        <div className="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input
                        placeholder="Search for people"
                        className="chatMenuInput"
                    />
                    {conversations.map((c) => (
                        <div key={12} onClick={() => setCurrentChat(c)}>
                            <Conversation
                                conversation={c}
                                currentUser={user.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {messages.map((message) => (
                            <Message
                                key={23}
                                message={message}
                                own={message.sender === user.username}
                            />
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            className="chatMessageInput"
                            placeholder="Aa"
                        ></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
    );
}

export default Chat;
