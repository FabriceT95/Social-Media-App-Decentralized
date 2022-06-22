const router = require('express').Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');


// New Conversation
router.post('/', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);

    } catch (error) {
        res.status(500).json(error);
    }
})

// Get Conversation
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const conversations = await Conversation.find({
            members: { $in: [userId] }
        });
        const lastMessages = await Promise.all(
            conversations.map(conversation => {
                return Message.findOne({ conversationId: conversation._doc._id }, {}, { sort: { "createdAt": - 1 } });

            })
        );

        let orderedConversations = [];
        for (i = 0; i < conversations.length; i++) {
            for (j = 0; j < lastMessages.length; j++) {
                if (conversations[i]._id == lastMessages[j].conversationId) {
                    let tempObj = {}
                    tempObj = { ...conversations[i] };
                    tempObj._doc.text = lastMessages[j].text
                    tempObj._doc.textCreatedAt = lastMessages[j].createdAt
                    tempObj._doc.sender = lastMessages[j].sender
                    orderedConversations.push(tempObj._doc)
                  
                }
            }
        } 

        res.status(200).json(orderedConversations);

    } catch (error) {
        res.status(500).json(error);
    }
})


// Get conv includes two user id
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $in: [req.params.firstUserId, req.params.secondUserId] }
        });

        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error);
    }
})










module.exports = router;