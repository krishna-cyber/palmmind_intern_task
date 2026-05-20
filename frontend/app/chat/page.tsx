import { ChatUser } from "@/components/ui/chat/types"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"
import ChatPage from "./chatPage"


const page =   async () => {
  const{data,error} = await authClient.getSession({
    fetchOptions:{
      headers: await headers()
    }
  })
  

return (
  <ChatPage currentUser={data?.user as ChatUser} />
)


}


  

export default page   