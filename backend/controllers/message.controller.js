import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";



export const sendMessage = async(req, res) =>{
    
    try {
        const { message }  = req.body;
        const { id : receiverId } = req.params;
        const senderId = req.user._id;

        let convo = await Conversation.findOne({
            participants : {
                $all : [senderId, receiverId]
            }
        })

        if(!convo){
            convo = await Conversation.create({
                participants : [ senderId, receiverId]
            })
        }

        const newMsg = new Message({ senderId, receiverId, message })

        if(newMsg){
            convo.messages.push(newMsg._id);
        }

        // Socket wil go here....

        await Promise.all([convo.save(), newMsg.save()])

        res.send(201).json(newMsg)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error : 'Internal Server Error...'})
    }   
}

export const getMessages = async(req, res) =>{
    try {
        const { id : userToChatId } = req.params;
        const senderId = req.user._id;

        const convo = await Conversation.findOne({
            participants : {
                $all : [ senderId, userToChatId]
            }
        }).populate('messages');

        if(!convo){
            return res.status(200).json([]);
        }

        res.status(200).json(convo.messages)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error : 'Internal Server Error...'})        
    }
}