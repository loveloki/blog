import useFontsReady from '@hooks/useFontsReady'
import List from './List/List'
import './index.css'
import useProcessor from './MarkDown'

function App() {
  const isFontsReady = useFontsReady()
  const mk = useProcessor()

  return (
    <main className="App">
      {isFontsReady ? (
        <>
          <aside>
            <List />
          </aside>
          <article>
            <div>Xleine&#x27;s Blog</div>
            <div style={{ height: '30%' }}>{mk}</div>
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
