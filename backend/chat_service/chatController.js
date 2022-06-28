const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

exports.createNewConversation = async (req, res) => {
    const existConversations = await Conversation.find({
        id: req.body.id_1,
    });

    const exist = existConversations.find(
        (conversation) =>
            (conversation.members[0].id == req.body.id_1 &&
                conversation.members[1].id == req.body.id_2) ||
            (conversation.members[0].id == req.body.id_2 &&
                conversation.members[1].id == req.body.id_1)
    );

    if (exist) {
        return res.status(200).json(exist);
    }

    const newConversation = new Conversation({
        members: [
            {
                id: req.body.id_1,
                user: req.body.user_1,
                avtUrl: req.body.avt_1,
            },
            {
                id: req.body.id_2,
                user: req.body.user_2,
                avtUrl: req.body.avt_2,
            },
        ],
    });

    try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.getConversationOfUser = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            id: req.query.userId,
        });
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.sendMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.query.conversationId,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send(error);
    }
};
