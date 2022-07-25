import useFontsReady from '@hooks/useFontsReady'
import List from './List/List'
import './index.css'
import MarkDown from './MarkDown'
import { Outlet, Route, Routes } from 'react-router-dom'

function App() {
  const isFontsReady = useFontsReady()

  return (
    <main className="App">
      {isFontsReady ? (
        <>
          <aside>
            <List />
          </aside>
          <Routes>
            <Route
              path="/"
              element={
                <article>
                  <div>Xleine&#x27;s Blog</div>
                  <Outlet />
                </article>
              }
            >
              <Route
                path="article/:id"
                element={
                  <div style={{ height: '30%' }}>
                    <MarkDown />
                  </div>
                }
              />
              <Route path="*" element={<p>404!</p>} />
            </Route>
          </Routes>
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
