"use client"

import { socket } from "@/lib/socket"
import { useEffect } from "react"

export const useSocket = ()=>{
  useEffect(() => {
    socket.connect()

     socket.on("connect_error", (err) => {
    console.error("Connection failed:", err.message); 
  });
  
    return () => {
      socket.disconnect()
    }
  }, [])

}