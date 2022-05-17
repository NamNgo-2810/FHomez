import React from "react";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import "./Chat.module.scss";

function Chat() {
<<<<<<< Updated upstream
=======
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

    const user = {
        id: "456",
        profilePicture:
            "https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-9/78498609_1829635693846512_3492573706100670464_n.jpg?_nc_cat=107&ccb=1-6&_nc_sid=174925&_nc_ohc=tAAbT9vLCJgAX8TSIO0&_nc_ht=scontent.fhan3-2.fna&oh=00_AT_YquzHOjufhv4USaF0iSY7wtvJSM-ys_zuEBLbF38zEQ&oe=62A372C4",
        username: "Phong",
    };

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
                    `http://localhost:5000/api/chat/message?conversationId=627a68fb2141eb8b9e643b9f`
                );
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, []);

>>>>>>> Stashed changes
    return (
        <div className="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input
                        placeholder="Search for people"
                        className="chatMenuInput"
                    />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message />
                        <Message own={true} />
                        <Message />
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
