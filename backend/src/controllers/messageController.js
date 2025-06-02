import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filterUsers);
    } catch (error) {
        console.error("Error fetching user for sidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getMessages = async (req, res) => {
    try {
        const { id : userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId:myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const myId = req.user._id;

        let imageUrl;
        if(image){
            //Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: myId,
            receiverId,
            text,
            image: imageUrl || ""
        });

        await newMessage.save();

        //todo realtime functionality goes here => socketio
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}   