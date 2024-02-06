import Home from "../components/home/Home"
import ThemeSelector from "../theme/ThemeSelector"


const HomePage = ({ setTheme }) => {
  return (
    <>
      <div className="h-screen px-6">
        <div className="absolute top-4">
          <ThemeSelector setTheme={setTheme} />
        </div>
        <div className="h-screen">
          <Home />
        </div>
      </div>
    </>
  )
}

export default HomePage