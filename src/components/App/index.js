import Header from '../Header'
import List from '../List'
import './index.css'

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header className="h-16" />
      <main className="flex-1 max-w-7xl">
        <List />
      </main>
    </div>
  )
}

export default App
