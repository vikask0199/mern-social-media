import Typewriter from 'typewriter-effect';

const TypewriterComponent = () => {
    return (
        <Typewriter
            onInit={(typewriter) => {
                typewriter
                    .pauseFor(1000)
                    .typeString(
                        `<span class="font-bold tracking-widest text-4xl mb-2">Discover the heartbeat of connection. Share life's moments, ignite conversations, and build lasting friendships. And </span>`
                    )
                    .pauseFor(300)
                    .deleteChars(4)
                    .typeString('<span class="text-5xl mb-2 font-bold text-green-600">Your social sanctuary awaits—where stories unfold, and communities thrive. </span>')
                    .typeString('<span class="text-4xl mb-2 font-bold text-red-600"> Join us today!</span>')
                    .pauseFor(1000)
                    .start();
            }}
        />
    );
};

export default TypewriterComponent;
