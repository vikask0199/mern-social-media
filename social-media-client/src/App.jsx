import { useEffect, useState } from 'react'
import ThemeSelector from "./theme/ThemeSelector"

function App() {
  const [theme, setTheme] = useState('theme1');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
      <nav>
        <ThemeSelector setTheme={setTheme} />
      </nav>
      <div className={`App theme-${theme}`}>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
