const config = require("../config");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.createNewConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getConversationOfUser = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.query.userId] },
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).send(error);
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
