import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../services/firebase.service";

const chatURL = "http://localhost:5000/api/chat/";

function Chat() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [message, setMessage] = useState("");
    const [imageMessage, setImageMessage] = useState(null);
    const imageInputRef = useRef(null);
    const socket = useRef(io("ws://localhost:8900"));
    const { user } = useContext(AuthContext);

    const getConversations = async () => {
        try {
            const res = await axios.get(
                `${chatURL}conversation?userId=${user.user_id}`
            );
            setConversations(res.data);
            setCurrentChat(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const getMessages = async () => {
        try {
            const res = await axios.get(
                `${chatURL}message?conversationId=${currentChat._id}`
            );
            setMessages(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getLocalImage = () => {
        imageInputRef.current.click();
    };

    const handleImageUpload = (e) => {
        setImageMessage(e.target.files[0]);
    };

    const onSend = async (content) => {
        if (!content && !imageMessage) {
            console.log("Empty");
            return;
        }
        if (imageMessage) {
            const uploadTask = uploadBytesResumable(
                ref(storage, `${imageMessage.name}-${user.user_id}`),
                imageMessage
            )
                .then((result) => {
                    return getDownloadURL(result.ref);
                })
                .then((downloadURL) => {
                    const newMessage = {
                        sender: user.username,
                        senderId: user.user_id,
                        contentType: "image",
                        content: downloadURL,
                        conversationId: currentChat._id,
                    };
                    return newMessage;
                })
                .then(async (newMessage) => {
                    const res = await axios.post(
                        `${chatURL}message/send`,
                        newMessage
                    );
                    return { res, newMessage };
                })
                .then(({ res, newMessage }) => {
                    setMessages([...messages, res.data]);

                    const receiverId = currentChat.members.find(
                        (member) => member.id != user.user_id
                    ).id;

                    socket.current.emit("sendMessage", {
                        senderId: user.user_id,
                        receiverId: receiverId,
                        contentType: newMessage.contentType,
                        content: newMessage.content,
                    });
                });
        } else {
            const newMessage = {
                sender: user.username,
                senderId: user.user_id,
                contentType: "text",
                content: content,
                conversationId: currentChat._id,
            };

            try {
                const res = await axios.post(
                    `${chatURL}message/send`,
                    newMessage
                );
                setMessages([...messages, res.data]);
            } catch (error) {
                console.log(error);
                return;
            }

            const receiverId = currentChat.members.find(
                (member) => member.id != user.user_id
            ).id;

            socket.current.emit("sendMessage", {
                senderId: user.user_id,
                receiverId: receiverId,
                contentType: newMessage.contentType,
                content: newMessage.content,
            });
        }

        setMessage("");
        setImageMessage(null);
    };

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                contentType: data.contentType,
                content: data.content,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        socket.current.emit("addUser", user.user_id);
        // socket.current.on("getUsers", (users) => {});
    }, [user]);

    useEffect(() => {
        getConversations();
    }, [user.user_id]);

    useEffect(() => {
        if (currentChat) {
            getMessages();
        }
    }, [currentChat]);

    return (
        <div style={{ marginTop: "80px", height: "450px" }}>
            <MainContainer>
                <Sidebar position="left" scrollable={false}>
                    <ConversationList>
                        {conversations?.map((conversation, index) => {
                            return (
                                <Conversation
                                    onClick={() => {
                                        setCurrentChat(conversation);
                                    }}
                                    key={`${index}`}
                                    active={
                                        conversation._id === currentChat._id
                                    }
                                >
                                    <Avatar
                                        status="available"
                                        src={
                                            conversation.members.find(
                                                (member) =>
                                                    member.id !== user.user_id
                                            ).avtUrl
                                        }
                                    />
                                    <Conversation.Content
                                        style={{ textAlign: "start" }}
                                        name={
                                            conversation.members.find(
                                                (member) =>
                                                    member.id !== user.user_id
                                            ).user
                                        }
                                    // lastSenderName={
                                    //     messages?.[messages?.length - 1]
                                    //         .sender
                                    // }
                                    // info={
                                    //     messages?.[messages.length - 1]
                                    //         .content
                                    // }
                                    />
                                </Conversation>
                            );
                        })}
                    </ConversationList>
                </Sidebar>

                <ChatContainer>
                    {() => {
                        if (currentChat) {
                            return (
                                <ConversationHeader>
                                    <ConversationHeader.Back />
                                    <Avatar
                                        src={
                                            currentChat.members.find(
                                                (member) =>
                                                    member.id !== user.user_id
                                            ).avtUrl
                                        }
                                    />
                                    <ConversationHeader.Content
                                        userName={
                                            currentChat.members.find(
                                                (member) =>
                                                    member.id !== user.user_id
                                            ).user
                                        }
                                        info="Active"
                                    />
                                </ConversationHeader>
                            );
                        }
                    }}

                    <MessageList>
                        {messages?.map((message, index) => {
                            return (
                                <Message
                                    model={{
                                        direction:
                                            message?.senderId === user.user_id
                                                ? "outgoing"
                                                : "incoming",
                                    }}
                                    key={`${index}`}
                                    avatarSpacer
                                >
                                    <Avatar
                                        src={
                                            currentChat?.members.find(
                                                (member) =>
                                                    message?.senderId ===
                                                    member.id
                                            )?.avtUrl
                                        }
                                    />
                                    {message?.contentType === "text" ? (
                                        <Message.TextContent
                                            text={message?.content}
                                        />
                                    ) : (
                                        <Message.ImageContent
                                            src={message?.content}
                                            alt=""
                                            width={150}
                                        />
                                    )}
                                </Message>
                            );
                        })}
                    </MessageList>
                    <MessageInput
                        placeholder="Aa"
                        onSend={onSend}
                        value={imageMessage ? "*" : message}
                        onChange={(e) => {
                            setMessage(e);
                        }}
                        style={{ textAlign: "start" }}
                        onAttachClick={getLocalImage}
                        sendDisabled={false}
                    />
                </ChatContainer>
            </MainContainer>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={imageInputRef}
                onChange={handleImageUpload}
            />
            {imageMessage ? (
                <img
                    src={URL.createObjectURL(imageMessage)}
                    style={{
                        width: 150,
                        alignSelf: "start",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                />
            ) : null}
        </div>
    );
}

export default Chat;
