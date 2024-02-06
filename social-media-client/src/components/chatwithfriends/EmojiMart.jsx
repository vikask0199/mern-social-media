import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiMart = () => {

    const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    return (
        <Picker data={data} onEmojiSelect={console.log} theme={localStorage.getItem('theme') || getSystemTheme()} />
    )
}

export default EmojiMart