"use client"

import { ChatMessageData } from "@/components/ui/chat/types"
import { socket } from "@/lib/socket"
import { useCallback, useEffect, useState } from "react"

export const useSocket = ()=>{

  const [messages,setMessages]= useState<ChatMessageData[]>([])
  const [loading,setLoading] = useState(true)


  const loadHistory = async ()=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/history`)
      if (!response.ok) {
        throw new Error("Failed to load chat history")
      }
      const data = await response.json()
      setMessages(data)
      setLoading(false)
    } catch (error) {
      console.error("Error loading chat history:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()

    // establish socket connection
    socket.connect()

    // catch broadcasted messages
    socket.on("receive_message", (message: ChatMessageData) => {
      setMessages((prev) => [...prev, message])
    })
     socket.on("connect_error", (err) => {
    console.error("Connection failed:", err.message); 
  });

    setLoading(false)
  
    return () => {
      socket.off("receive_message")
      socket.off("connect_error")
      socket.disconnect()
    }
  }, [])

  const handleSend= useCallback((text: string) => {
      socket.emit("send_message",{text})
    }, [])

    return {messages,loading,handleSend}

}