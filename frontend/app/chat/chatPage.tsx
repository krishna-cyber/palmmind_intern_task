"use client"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { ChatUser } from "@/components/ui/chat"
import {
  ChatComposer,
  ChatMessages,
  ChatProvider,
} from "@/components/ui/chat"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useSocket } from "@/hooks/useSocket"
import { authClient } from "@/lib/auth-client"

import { EllipsisVertical, LogOut, UserPen, Users } from "lucide-react"



const currentUser: ChatUser = {
  id: "user-1",
  name: "You",
  status: "online",
  role:"admin"
}


const ChatPage =   ({currentUser}:{currentUser: ChatUser}) => {

 

const {messages,handleSend,loading}= useSocket()


  const presenceColors = {
  online: "#22C55E",
  away: "#EAB308",
  dnd: "#EF4444",
  offline: "#A1A1AA",
}

  return (
 <ChatProvider currentUser={currentUser} theme="lunar">
   <div className="flex h-screen flex-col">
   {/* navbar header */}
   <header className="flex items-center justify-around border-b px-4 py-2">
     <h1 className="text-lg flex gap-4 font-semibold"> <Avatar>
       <AvatarImage src={currentUser?.image} alt={currentUser?.name} />
       <AvatarBadge style={{
         width: 10,
       height: 10,
       borderRadius: "50%",
       background:currentUser?.status ? presenceColors[currentUser?.status] : presenceColors["online"],
       border: "2px solid #fff",

       }} />
       <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
     </Avatar>{currentUser?.name}</h1>
     <span className=" text-2xl font-bold text-green-500">Public Chat</span>
     {/* Dropdown menu */}
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
    <Button variant="outline" size="icon">
     <EllipsisVertical />
   </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent>
     <DropdownMenuGroup>
       {currentUser?.role === "admin" && (
         <DropdownMenuItem><Users />View Members</DropdownMenuItem>
       )}
       <DropdownMenuItem><UserPen />Update Profile</DropdownMenuItem>
   <Separator/>
       <DropdownMenuItem onClick={()=> {
        authClient.signOut()
        globalThis.window.location.href ="/sign-in"
       }} variant="destructive"><LogOut />Logout</DropdownMenuItem>
     </DropdownMenuGroup>
   </DropdownMenuContent>
     </DropdownMenu>
     {/* <span className="text-sm text-gray-500">Online</span> */}
   </header>
   {loading ? (
     <div className="flex-1 flex items-center justify-center">
       <span className="text-gray-500">Loading chat...</span>
     </div>
   ) : (
     <ChatMessages messages={messages} />
   )}
     <ChatComposer onSend={handleSend} />
   </div>
 </ChatProvider>

   )

}

export default ChatPage   