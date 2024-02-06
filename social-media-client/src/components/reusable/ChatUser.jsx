

const ChatUser = ({ img, name, message, time, count, online }) => {

    return (
        <div className={`flex justify-between px-2 h-14 rounded-md cursor-pointer shadow-md `}>
            <div className="w-full flex items-center gap-2">
                <div className="relative">
                    <img src={img} alt="" className="h-9 w-9 rounded-full object-cover" />
                    <div className={`absolute ${online ? 'bg-green-400' : 'bg-slate-400'} h-2 w-2 rounded-full right-[2px] bottom-[2px]`}></div>
                </div>
                <div>
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-xs">{message.substring(0, 15) + " . . ."}</p>
                </div>
            </div>
            <div className="w-1/6 flex flex-col items-end justify-center text-sm">
                <p>{time}</p>
                <p className="chatCounter h-4 w-4 rounded-full flex items-center justify-center p-1 text-xs">{count}</p>
            </div>
        </div>
    )
}

export default ChatUser