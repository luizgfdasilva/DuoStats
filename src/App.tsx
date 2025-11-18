import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>

      <div style={{ margin: '20px 0' }}>
        <button onClick={() => changeLanguage('en')} style={{ margin: '0 5px' }}>
          English
        </button>
        <button onClick={() => changeLanguage('es')} style={{ margin: '0 5px' }}>
          Español
        </button>
        <button onClick={() => changeLanguage('pt')} style={{ margin: '0 5px' }}>
          Português
        </button>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t('counter.button', { count })}
        </button>
        <p>
          {t('counter.instruction')}
        </p>
      </div>
      <p className="read-the-docs">
        {t('footer')}
      </p>
    </>
  )
}

export default App
