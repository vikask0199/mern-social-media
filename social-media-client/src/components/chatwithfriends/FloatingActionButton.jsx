import { IoIosContact } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import { IoImage } from "react-icons/io5";
import { IoCamera } from "react-icons/io5";
import "./FloatingActionButton.css";

const FloatingActionButton = ({ isDisplaying }) => {

    return (
        <div className={`popup-container ${isDisplaying ? 'open' : ''}`}>
            <div className="flex flex-col gap-2">
                <div className="text-2xl cursor-pointer p-2 border rounded-full bg-blue-700 text-white">
                    <IoIosContact />
                </div>
                <div className="text-2xl cursor-pointer p-2 border rounded-full bg-green-700 text-white">
                    <IoDocument />
                </div>
                <div className="text-2xl cursor-pointer p-2 border rounded-full bg-violet-700 text-white">
                    <IoImage />
                </div>
                <div className="text-2xl cursor-pointer p-2 border rounded-full bg-red-700 text-white">
                    <IoCamera />
                </div>
            </div>
        </div>
    );
}

export default FloatingActionButton;
