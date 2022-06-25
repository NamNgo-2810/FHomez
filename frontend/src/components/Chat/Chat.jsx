import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { io } from "socket.io-client";
import "./Chat.css";
import AuthContext from "../../contexts/AuthContext";
import {
    ChatContainer,
    MainContainer,
    MessageInput,
    MessageList,
    Message,
    ConversationList,
    Conversation,
    Sidebar,
    Avatar,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function Chat() {
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

    const { user } = useContext(AuthContext);
    console.log("user", user);
    // const user = {
    //     id: "123",
    //     profilePicture:
    //         "https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-6/274923351_1337119300139137_3012035318960112960_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=ds_b6ZVMWy8AX81iBPT&_nc_ht=scontent-hkt1-1.xx&oh=00_AT_Mrse_kwxS3R_rosAc0isg9YSkpLEbLx6jVBipcNaVXA&oe=627FE3AA",
    //     username: "Nam",
    // };

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
                console.log("res", res);
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
        <div style={{ marginTop: "80px", height: "700px" }}>
            <MainContainer>
                <Sidebar position="left" scrollable={false}>
                    <ConversationList>
                        <Conversation onClick={() => {}}>
                            <Avatar
                                status="available"
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                            />
                            <Conversation.Content
                                name="Nam"
                                lastSenderName="Nam"
                                info="Hello"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            />
                        </Conversation>
                    </ConversationList>
                </Sidebar>

                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Back />
                        <Avatar src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
                        <ConversationHeader.Content
                            userName="Nam"
                            info="Active"
                        />
                    </ConversationHeader>
                    <MessageList>
                        <Message
                            model={{
                                message: "Hello my friend",
                                sentTime: "15 mins ago",
                                sender: "Zoe",
                                direction: "incoming",
                                position: "single",
                            }}
                        />
                    </MessageList>
                    <MessageInput placeholder="Aa" onSend={onSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default Chat;
