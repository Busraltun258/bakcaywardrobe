import { App as AntApp, ConfigProvider } from 'antd'
import trTR from 'antd/locale/tr_TR'
import 'dayjs/locale/tr'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './styles/global.css'
import { darkTheme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={darkTheme} locale={trTR}>
      <AntApp>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>,
)
