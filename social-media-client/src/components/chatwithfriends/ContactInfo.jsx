import { useState } from "react";
import { FaRegBell, FaRegStar } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCall, IoVideocam } from "react-icons/io5";
import { MdArrowForwardIos, MdBlock, MdDeleteOutline } from "react-icons/md";
import ToggleButton from 'react-toggle-button';
import Ellipse1 from "../../assets/img/Ellipse1.png";



const ContactInfo = ({ setIsContactOpen, selectedUser }) => {

    const [value, setValue] = useState(false);

    const handleToggle = () => {
        setValue((prevValue) => !prevValue);
    };

    return (
        <div className="flex flex-col border-l justify-center h-full">
            <div className="h-20 border-b flex items-center gap-2 cursor-pointer px-1" onClick={() => setIsContactOpen((prev) => !prev)}>
                <IoMdCloseCircleOutline className="border cursor-pointer rounded p-1 text-3xl" />
                <p>Contact Info</p>
            </div>

            <div className="h-full overflow-auto custom-scrollbar flex flex-col">
                <div className="flex flex-col gap-5 py-5 border-b px-1">
                    <div className="flex gap-3 items-center justify-center">
                        <img src={Ellipse1} alt="" className="h-16 w-16 rounded-full" />
                        <div>
                            <p className="font-bold text-lg">Hello javascript</p>
                            <p className="font-semibold">9990458852</p>
                        </div>
                    </div>
                    <div className="flex justify-evenly">
                        <div className="flex flex-col gap-1 items-center">
                            <IoCall />
                            <p className="font-semibold">Audio</p>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <IoVideocam />
                            <p className="font-semibold">Video</p>
                        </div>
                    </div>
                </div>

                {/* about */}
                <div className="gap-3 py-5 px-1 flex flex-col border-b">
                    <p className="text-sm">About</p>
                    <p>Hi there, I am using </p>
                </div>

                {/* media */}
                <div className="gap-3 py-5 px-1 flex flex-col border-b">
                    <div className="flex justify-between text-sm items-center cursor-pointer">
                        <p>Media, links and docs</p>
                        <p className="flex gap-2 items-center">201 <MdArrowForwardIos /> </p>
                    </div>
                    <div>Media files</div>
                </div>

                {/* Starred Messages */}
                <div className="py-5 px-1 flex flex-col border-b">
                    <div className="flex justify-between text-sm items-center cursor-pointer">
                        <p className="flex gap-3 items-center"><FaRegStar className="text-lg" /> Starred Messages</p>
                        <MdArrowForwardIos />
                    </div>
                </div>

                {/* Mute Notifications */}
                <div className="py-5 px-1 flex flex-col border-b">
                    <div className="flex justify-between text-sm items-center cursor-pointer">
                        <p className="flex gap-3 items-center"><FaRegBell className="text-lg" /> Mute Notifications</p>
                        <ToggleButton
                            value={value}
                            onToggle={handleToggle}
                        />
                    </div>
                </div>

                {/* group */}
                <div className="gap-5 py-5 px-1 flex flex-col border-b">
                    <p className="text-sm">1 group in common</p>
                    <div className="flex gap-3 items-center cursor-pointer w-fit ml-5">
                        <img src={Ellipse1} alt="" className="h-12 w-12 rounded-full" />
                        <div>
                            <p className="font-bold text-base">Hello javascript</p>
                            <p className="">anil, rahul, vimal</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center cursor-pointer w-fit ml-5">
                        <img src={Ellipse1} alt="" className="h-12 w-12 rounded-full" />
                        <div>
                            <p className="font-bold text-base">Hello javascript</p>
                            <p className="">anil, rahul, vimal</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center cursor-pointer w-fit ml-5">
                        <img src={Ellipse1} alt="" className="h-12 w-12 rounded-full" />
                        <div>
                            <p className="font-bold text-base">Hello javascript</p>
                            <p className="">anil, rahul, vimal</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t h-20 flex items-center justify-around">
                <button className="flex items-center gap-2 w-24 h-9 justify-center font-semibold bg-red-500 text-white hover:bg-white hover:border border-red-500 hover:text-red-500 cursor-pointer duration-300"><MdBlock /> Block</button>
                <button className="flex items-center gap-2 w-24 h-9 justify-center font-semibold bg-red-500 text-white hover:bg-white hover:border border-red-500 hover:text-red-500 cursor-pointer duration-300"><MdDeleteOutline /> Delete</button>
            </div>
        </div>
    )
}

export default ContactInfo