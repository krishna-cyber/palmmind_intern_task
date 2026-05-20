
import { fromNodeHeaders } from "better-auth/node";
import { Server } from "socket.io";
import { auth } from "../auth.ts";



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


    socket.on("disconnect",(reason)=>{
    console.log("A user disconnected with socket id:", socket.id, "Reason:", reason)
})
})


}



