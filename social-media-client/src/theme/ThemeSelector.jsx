import React, { useState, useEffect } from 'react';

const ThemeSelector = ({ setTheme }) => {
    const themes = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'light', 'dark', 'system'];
    const [systemTheme, setSystemTheme] = useState('light');
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const handleSystemThemeChange = (e) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        const systemThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeMatcher.addEventListener('change', handleSystemThemeChange);
        handleSystemThemeChange(systemThemeMatcher);

        return () => {
            systemThemeMatcher.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme || systemTheme);
    }, [systemTheme, setTheme]);


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
            console.log(localStorage.getItem('theme') , selectedTheme)
    };


    return (
        <div className="flex space-x-4">
            {themes.map((theme) => (
                <button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`px-4 py-2 rounded focus:outline-none ${activeTheme === theme ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-black'
                        }`}
                >
                    {theme}
                </button>
            ))}
        </div>
    );
};

export default ThemeSelector;
