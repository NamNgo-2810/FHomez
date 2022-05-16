import React from "react";
import "./Conversation.css";

function Conversation({ conversation, currentUser }) {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const friendId = conversation.members.find((m) => m !== currentUser.id);
    //     // Call API to get friend's info
    //     setUser({
    //         id: friendId,
    //         profilePicture:
    //             "https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-1/239899002_2453517901458285_4456313710144166463_n.jpg?stp=c0.49.248.248a_dst-jpg&_nc_cat=111&ccb=1-6&_nc_sid=7206a8&_nc_ohc=VdoViWadUE4AX-9tttt&_nc_ht=scontent-hkt1-1.xx&oh=00_AT8Hs_JHp5dek70KCGDnu04SXdxaRhHlLx7g6rw87d1KFw&oe=627EE20B",
    //         username: "Phong",
    //     });
    // }, [currentUser, conversation]);

    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const user = {
        id: friendId,
        profilePicture:
            "https://scontent-hkt1-1.xx.fbcdn.net/v/t39.30808-1/239899002_2453517901458285_4456313710144166463_n.jpg?stp=c0.49.248.248a_dst-jpg&_nc_cat=111&ccb=1-6&_nc_sid=7206a8&_nc_ohc=VdoViWadUE4AX-9tttt&_nc_ht=scontent-hkt1-1.xx&oh=00_AT8Hs_JHp5dek70KCGDnu04SXdxaRhHlLx7g6rw87d1KFw&oe=627EE20B",
        username: "Phong",
    };

    return (
        <div className="conversation">
            <div>
                <img
                    className="conversationImg"
                    src={user.profilePicture}
                    alt=""
                />
                <span className="conversationName">{user.username}</span>
            </div>
        </div>
    );
}

export default Conversation;
