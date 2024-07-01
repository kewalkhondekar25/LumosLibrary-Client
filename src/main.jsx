import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <main className='bg-[#10141B] text-white'>
    <Provider store={store}>
      <App />
    </Provider>
  </main>,
)
