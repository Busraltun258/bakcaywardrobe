import { App as AntApp, ConfigProvider } from 'antd'
import trTR from 'antd/locale/tr_TR'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import React from 'react'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('tr')
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
