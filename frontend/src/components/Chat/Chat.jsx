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

function Chat() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const socket = useRef(io("ws://localhost:8900"));
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [message, setMessage] = useState("");

    const { user } = useContext(AuthContext);

    const getConversations = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/chat/conversation?userId=${user.user_id}`
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
                `http://localhost:5000/api/chat/message?conversationId=${currentChat._id}`
            );
            setMessages(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onSend = async (text) => {
        const newMessage = {
            sender: user.user_id,
            text: text,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user.user_id.toString()
        );

        socket.current.emit("sendMessage", {
            senderId: user.user_id,
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
        console.log("New message");
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        socket.current.emit("addUser", user.user_id);
        socket.current.on("getUsers", (users) => {});
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
        <div style={{ marginTop: "80px", height: "400px" }}>
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
                                >
                                    <Avatar
                                        name={
                                            conversation.members[
                                                conversation.members[0] ===
                                                user.user_id.toString()
                                                    ? 1
                                                    : 0
                                            ]
                                        }
                                        status="available"
                                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                                    />
                                    <Conversation.Content
                                        name={
                                            conversation.members[
                                                conversation.members[0] ===
                                                user.user_id.toString()
                                                    ? 1
                                                    : 0
                                            ]
                                        }
                                        lastSenderName="Nam"
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
                                    <Avatar src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
                                    <ConversationHeader.Content
                                        userName={
                                            currentChat?.members[0] ===
                                            user.user_id.toString()
                                                ? currentChat.members[0]
                                                : currentChat.members[1]
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
                                        message: message?.text,
                                        sender: message?.sender,
                                        direction:
                                            message?.sender ===
                                            user.user_id.toString()
                                                ? "outgoing"
                                                : "incoming",
                                    }}
                                    key={`${index}`}
                                    avatarSpacer
                                >
                                    <Avatar src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
                                </Message>
                            );
                        })}
                    </MessageList>
                    <MessageInput
                        placeholder="Aa"
                        onSend={onSend}
                        value={message}
                        onChange={(e) => {
                            setMessage(e);
                        }}
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default Chat;
