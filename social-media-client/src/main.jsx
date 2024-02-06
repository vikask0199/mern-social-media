// import {store} from "./App/store"
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ScrollToTop from './constants/ScrollToTop.jsx'
import { Provider } from 'react-redux';
import { store } from "./app/store.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
)
