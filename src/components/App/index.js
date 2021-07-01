import Header from '../Header'
import List from '../List'
import './index.css'
import { useState } from 'react'
import Article from '../Article'

function App() {
  const [article, setArticle] = useState(null)

  function handleClickTitle(item) {
    setArticle(item)
  }

  return (
    <div className="h-screen flex flex-col">
      <Header className="h-16" />
      <main className="flex-1 max-w-7xl m-auto">{article ? <Article /> : <List handleClickTitle={handleClickTitle} />}</main>
    </div>
  )
}

export default App
