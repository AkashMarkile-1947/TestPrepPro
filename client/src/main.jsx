import React from 'react'
import {BrowserRouter, Router} from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import View from './View'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <View />
    </BrowserRouter>
  </React.StrictMode>,
)
