import { useState } from 'react';
import { FaAffiliatetheme } from "react-icons/fa";
import { MdDarkMode, MdOutlineComputer, MdOutlineLightMode } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";



const ThemeSelector = ({ setTheme }) => {
    const themes = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'light', 'dark', 'system'];
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem('theme') || 'system');

    const handleThemeChange = (selectedTheme) => {
        if (selectedTheme === 'system') {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = prefersDarkMode ? 'dark' : 'light';
            localStorage.removeItem('theme');
            setTheme(systemTheme);
            setActiveTheme('system');
        } else {
            localStorage.setItem('theme', selectedTheme);
            setTheme(selectedTheme);
            setActiveTheme(selectedTheme);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggleIcons = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex items-center rounded-sm p-1 theme-border">
            <button onClick={toggleIcons} className="outline-none h-10 w-10 flex items-center justify-center" >
                {isOpen ? (
                    <span className="text-lg"><TfiClose /></span>
                ) : (
                    <span className="text-lg"><RiMenu2Line /></span>
                )}
            </button>

            {isOpen && (
                <div className="flex transition-all duration-300">
                    {themes.map((theme) => (
                        <button
                            key={theme}
                            onClick={() => handleThemeChange(theme)}
                            className={`h-10 w-10 flex items-center justify-center rounded-sm focus:outline-none ${activeTheme === theme ? 'bg-cyan-500 text-white' : ''}`}
                        >
                            {theme === 'theme1' ? <FaAffiliatetheme /> : theme === 'theme2' ? <FaAffiliatetheme /> : theme === 'theme3' ? <FaAffiliatetheme /> : theme === 'theme4' ? <MdDarkMode /> : theme === 'theme5' ? <FaAffiliatetheme /> : theme === 'light' ? <MdOutlineLightMode /> : theme === 'dark' ? <MdDarkMode /> : <MdOutlineComputer />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
