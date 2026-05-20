
import { fromNodeHeaders } from "better-auth/node";
import { Server } from "socket.io";
import { auth } from "../auth.ts";
import { Message } from "../models/message.schema.ts";



export const initSocket = (server:any)=>{
   const io =  new Server(server,{
  cors:{
    origin:process.env.FRONTEND_URL || "http://localhost:3000",
    credentials:true
  }
})


// only authenticated users can connect to socket.io
io.use(async (socket,next)=>{
  try {
    const cookies = socket.handshake.headers.cookie

    if(!cookies) return next(new Error("unauthorized"))

    const session = await auth.api.getSession({
        headers: fromNodeHeaders(socket.handshake.headers)
      });

     if(!session?.user) return next(new Error("unauthorized"))


        socket.data.user = session.user
      next()
  } catch (error) {
    console.log("Socket authentication error:", error)
    next(new Error("unauthorized"))
  }
})

io.on("connection",(socket)=>{
    console.log("A user connected with socket id:", socket.id)

    //joins public room
    socket.join("public_chat")
    console.log(`user with socket id ${socket.id} joined public_chat room and email: ${socket.data.user.email}`)

    socket.on('send_message',async (data)=>{
      try {
        const message = new Message({
        senderId:socket.data.user.id,
        senderName:socket.data.user.name,
        text:data.text
      })

      const savedMessage = await message.save()

      console.log("Message saved and broadcasted:", savedMessage)


      const formattedMessage = {
        id:savedMessage._id,
        senderId:savedMessage.senderId,
        senderName:savedMessage.senderName,
        text:savedMessage.text,
        timestamp:Date.now(),
        status:"delivered"
      }
      // Broadcast to all clients in the "public_chat" room
      io.to("public_chat").emit("receive_message",formattedMessage)
      } catch (error) {
        console.error("Error saving message:", error)
      }
      

      


      
    })

    socket.on("disconnect",(reason)=>{
    console.log("A user disconnected with socket id:", socket.id, "Reason:", reason)
})
})


}



