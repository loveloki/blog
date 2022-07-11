import useFontsReady from '@hooks/useFontsReady'
import List from './List/List'
import './index.css'

function App() {
  const isFontsReady = useFontsReady()

  return (
    <main className="App">
      {isFontsReady ? (
        <>
          <aside>
            <List />
          </aside>
          <article>Xleine&#x27;s Blog</article>
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
