const config = require("../config");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.createNewConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderID, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).send(error);
    }
};
