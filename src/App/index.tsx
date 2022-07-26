import useFontsReady from '@hooks/useFontsReady'
import List from './List/List'
import './index.css'
import MarkDown from './MarkDown'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './Header'

function App() {
  const isFontsReady = useFontsReady()
  const location = useLocation()

  return (
    <main className="App">
      {isFontsReady ? (
        <>
          <aside>
            <List />
          </aside>
          <article>
            {location.pathname === '/' && <MarkDown />}
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route
                  path="article/:id"
                  element={
                    <>
                      <Header />
                      <MarkDown />
                    </>
                  }
                />
                <Route path="*" element={<p>404!</p>} />
              </Route>
            </Routes>
          </article>
        </>
      ) : (
        <div className="font-loading">
          加载字体中
          <x-loading-dot />
        </div>
      )}
    </main>
  )
}

export default App
