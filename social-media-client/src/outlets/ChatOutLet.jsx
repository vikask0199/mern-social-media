import { Outlet } from "react-router-dom"
import ChatSidebar from "../components/chatwithfriends/ChatSidebar"

const ChatOutLet = () => {
  return (
    <div className="h-screen flex">
      <div className="w-16">
        <ChatSidebar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default ChatOutLet