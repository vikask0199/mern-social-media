import { useEffect, useRef, useState } from "react";
import { FaRegCircle } from "react-icons/fa6";
import { MdOutlineCall, MdOutlineVideocam } from "react-icons/md";
import Ellipse1 from "../../assets/img/Ellipse1.png";
import { ChatList, Chat_History } from "../../constants/Data";
import ChatUser from "../reusable/ChatUser";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { HiMiniLink } from "react-icons/hi2";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import VideoCompo from "./videoCompo";
import EmojiMart from "./EmojiMart";
import { v4 as uuidv4 } from 'uuid';
import FloatingActionButton from "./FloatingActionButton";
import ContactInfo from "./ContactInfo";


const ChatHome = () => {
  const [users, setUsers] = useState(ChatList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const delay = 300;

    const debounceTimer = setTimeout(() => {
      const filteredUsers = ChatList.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setUsers(filteredUsers);
    }, delay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  const [isClicked, setIsClicked] = useState(-1)
  const handleUserClick = (userId) => {
    setIsClicked(userId)
    const clickedUser = ChatList.find(user => user.id === userId);
    setSelectedUser(clickedUser);
  };

  // for diplay emojis
  const [isOpenEmogi, setIsOpenEmogi] = useState(false)

  // select file
  const [isDisplaying, setIsDisplaying] = useState(false);

  // chat rendering
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);


  // contact info
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="h-full flex">
      <div className="w-1/4 px-2 flex flex-col gap-3 border-l py-1 overflow-auto custom-scrollbar">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold">Chats</h1>
          <FaRegCircle />
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none py-4 w-full rounded-sm indent-2 inputsearchNAme"
        />

        {/* Display pinned users */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xs">Pinned Users</h2>
          {users
            .filter((user) => user.pinned)
            .map((user) => (
              <div key={user.id} onClick={() => handleUserClick(user.id)} className={`${user.id === isClicked ? 'inputsearchNAme' : ''}`}>
                <ChatUser img={Ellipse1} name={user.name} message={'hjvfhhfudh bhdhs duhhvcj ffdfsfd'} time={'4:50'} count={`10`} online={user.online} />
              </div>
            ))}
        </div>

        {/* Display all users */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xs">All Users</h2>
          {users.map((user) => (
            !user.pinned && (
              <div key={uuidv4()} onClick={() => handleUserClick(user.id)} className={`${user.id === isClicked ? 'inputsearchNAme' : ''}`}>
                <ChatUser img={Ellipse1} name={user.name} message={'hjvfhhfudh bhdhs duhhvcj ffdfsfd'} time={'4:50'} count={`10`} />
              </div>
            )
          ))}
        </div>
      </div>

      {/* chatting section */}
      {selectedUser !== null ? (
        <div className="w-full flex">
          <div className="flex-grow duration-300 flex flex-col border-l justify-between">
            <div className="border-b h-20 flex justify-between px-1">
              <div className="flex h-full items-center justify-center gap-3 cursor-pointer" onClick={() => setIsContactOpen((prev) => !prev)}>
                <img src={Ellipse1} alt="" className="h-10 w-10 rounded-full" />
                <div className="flex flex-col">
                  <h1 className="font-bold tracking-wider text-lg">{selectedUser.name}</h1>
                  <p className="text-xs tracking-wider font-semibold">{selectedUser.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 text-3xl">
                <MdOutlineVideocam className="border cursor-pointer rounded p-1" />
                <MdOutlineCall className="border cursor-pointer rounded p-1" />
                <IoIosInformationCircleOutline className="border cursor-pointer rounded p-1" onClick={() => setIsContactOpen((prev) => !prev)} />
              </div>
            </div>

            <div className="space-y-4 h-full overflow-auto custom-scrollbar px-1 pb-1" ref={chatContainerRef}>
              {Chat_History.map((message, index) => (
                <div key={index} className={`w-full flex ${message.incoming ? '' : 'justify-end'}`} >
                  {message.type === 'msg' && <p className={`w-fit px-2 py-1 text-sm rounded-md ${message.incoming ? 'chatOutGping' : 'chatIcoming'}`}>{message.message}</p>}
                  {message.type === 'divider' && <div className="text-center text-xs w-full">{message.text}</div>}
                </div>
              ))}
            </div>

            <div className="h-20 border-t px-1 flex items-center justify-center">
              <div className="flex w-full items-center justify-center gap-2">
                {/* file selection start */}
                <div className="z-10 fixed bottom-14 left-[23.5%]">
                  <FloatingActionButton isDisplaying={isDisplaying} />
                </div>
                <HiMiniLink className="h-10 w-10 p-1 cursor-pointer chatOutGping rounded-md" onClick={() => setIsDisplaying((prev) => !prev)} />
                {/* file selection ends */}

                <input type="text" placeholder="Write your message . . ." className="flex-grow outline-none rounded-3xl h-10 indent-2 chatOutGping" />

                {/* emoji start*/}
                {
                  isOpenEmogi ? (
                    <div className={`z-10 fixed bottom-14 right-0`}>
                      <EmojiMart />
                    </div>
                  ) : (
                    ''
                  )
                }
                <FaRegFaceSmileBeam className="h-10 w-10 p-1 cursor-pointer chatOutGping rounded-md" onClick={() => setIsOpenEmogi((prev) => !prev)} />
                {/* emoji ends */}

                <BsFillSendFill className="h-10 w-10 p-1 cursor-pointer sendbg rounded-md" />
              </div>
            </div>
          </div>
          {
            isContactOpen && (
              <div className="w-1/4 min-w-80">
                <ContactInfo setIsContactOpen={setIsContactOpen} selectedUser={selectedUser} />
              </div>
            )
          }
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <VideoCompo />
        </div>
      )}
    </div>
  )
}

export default ChatHome