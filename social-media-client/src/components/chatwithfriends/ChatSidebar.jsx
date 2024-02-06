import { AiOutlineMessage, AiOutlinePhone, AiOutlineSetting, AiOutlineUsergroupAdd } from "react-icons/ai"
import { Link, useParams } from "react-router-dom"
import Budgie from "../../assets/img/Budgie.png"
import Ellipse1 from "../../assets/img/Ellipse1.png"

const ChatSidebar = () => {
  const { activeChatSidebar } = useParams()

  return (
    <div className="h-full w-full flex flex-col items-center py-2 justify-between">
      <div className="w-full flex flex-col items-center gap-5">
        <Link to='/' className="flex items-center justify-center w-3/4 cursor-pointer">
          <img src={Budgie} alt="" className="p-1 h-full w-full rounded-sm bg-blue-200" />
        </Link>
        <Link to={`/chat-with-friends`} className={`h-10 w-10 flex items-center justify-center rounded-sm text-xl ${activeChatSidebar === undefined ? 'bg-blue-400' : ''}`}>
          <AiOutlineMessage />
        </Link>
        <Link to={`/chat-with-friends/group/${1}`} className={`h-10 w-10 flex items-center justify-center rounded-sm text-xl ${Number(activeChatSidebar) === 1 ? 'bg-blue-400' : ''}`}>
          <AiOutlineUsergroupAdd />
        </Link>
        <Link to={`/chat-with-friends/call/${2}`} className={`h-10 w-10 flex items-center justify-center rounded-sm text-xl ${Number(activeChatSidebar) === 2 ? 'bg-blue-400' : ''}`}>
          <AiOutlinePhone />
        </Link>
        <Link to={`/chat-with-friends/settings/${3}`} className={`h-10 w-10 flex items-center justify-center rounded-sm text-xl ${Number(activeChatSidebar) === 3 ? 'bg-blue-400' : ''}`}>
          <AiOutlineSetting />
        </Link>
      </div>
      <Link to='/chat-with-friends/userprofile' className={`flex h-12 w-12 items-center justify-center rounded-full cursor-pointer border`}>
        <img src={Ellipse1} alt="" className="h-full w-full object-center" />
      </Link>
    </div>
  )
}

export default ChatSidebar