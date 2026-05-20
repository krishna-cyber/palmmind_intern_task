import { Router } from "express";
import { Message } from "../models/message.schema.ts";

const router = Router()

router.get("/history", async(req,res)=>{
    try {
      
        const history = await Message.find({}).sort({createdAt: -1}).limit(100).lean()
        

        const formattedMessages = history.map((message)=>{
            return({
                id:message._id,
                senderId:message.senderId,
                senderName:message.senderName,
                text:message.text,
                timestamp:message.createdAt,
                status:"delivered"
            })
        })
        res.json(formattedMessages)
    } catch (error) {
        console.log("Error fetching chat history:", error)
        res.status(500).json({ error: "Failed to fetch chat history" })
    }
})


export { router as chatrouter };
