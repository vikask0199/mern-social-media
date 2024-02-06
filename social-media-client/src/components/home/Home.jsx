import Cards from "./Cards"
import TypewriterComponent from "./TypewriterComponent"
import watchTogather from "../../assets/img/watchtogather.png"
import starngerTalk from "../..//assets/img/starngerTalk.jpg"
import talkFriends from "../../assets/img/talkFriends.jpeg"

const Home = () => {
  return (
    <div className="flex h-full">
      <div className="h-full flex w-1/2 items-center">
        <TypewriterComponent />
      </div>
      <div className="w-1/2 flex items-center h-full justify-around">
        <div className="h-3/4 flex justify-around flex-col">
          <Cards img={watchTogather} content={'Watch Together'} link={'/'} />
          <Cards img={talkFriends} content={'Chat with friends'} link={'/chat-with-friends'} />
        </div>
        <div className="h-3/4 flex justify-around flex-col">
          <Cards img={starngerTalk} content={'Chat with Stranger'} link={'/'} />
          <Cards img={watchTogather} content={'Coming Soom'} link={'/'} />
        </div>
      </div>
    </div>
  )
}

export default Home