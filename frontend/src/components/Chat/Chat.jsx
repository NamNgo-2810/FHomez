import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import { io } from "socket.io-client";
import "./Chat.css";

function Chat({ user, conversationId }) {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            message: undefined,
        },
    });
    const scrollRef = useRef();
    const socket = useRef(io("ws://localhost:8900"));
    const [arrivalMessage, setArrivalMessage] = useState(null);

    console.log(user);

    const onSend = async (e) => {
        const newMessage = {
            sender: user.id,
            text: e.message,
            conversationId: currentChat._id,
        };
        reset({
            message: "",
        });

        const receiverId = currentChat.members.find(
            (member) => member !== user.id
        );

        socket.current.emit("sendMessage", {
            senderId: user.id,
            receiverId: receiverId,
            text: newMessage.text,
        });

        try {
            const res = await axios.post(
                `http://localhost:5000/api/chat/message/send`,
                newMessage
            );
            setMessages([...messages, res.data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user.id);
        socket.current.on("getUsers", (users) => {
            console.log(users);
        });
    }, [user]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/chat/conversation?userId=${user.id}`
                );
                setConversations(res.data);
                setCurrentChat(res.data[0]);
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
                    `http://localhost:5000/api/chat/message?conversationId=${conversationId}`
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
                            <div ref={scrollRef}>
                                <Message
                                    key={message._id}
                                    message={message}
                                    own={message.sender === user.id}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <input
                            className="chatMessageInput"
                            placeholder="Aa"
                            defaultValue=""
                            {...register("message")}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(onSend)();
                                }
                            }}
                        />
                        <button
                            className="chatSubmitButton"
                            onClick={handleSubmit(onSend)}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
