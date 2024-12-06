import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSockerId, io } from "../lib/socket.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggerUserId = req.user._id;

    const filterUsers = await User.find({ _id: { $ne: loggerUserId } }).select(
      "-password"
    );

    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error en getUsersForSideBar", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, reciverId: userToChatId },
        { senderId: userToChatId, reciverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error en getMessages", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSockerId(reciverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error en sendMessage: ", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
