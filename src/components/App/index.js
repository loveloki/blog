import { Route, Switch } from 'react-router-dom'
import Article from '../Article'
import Header from '../Header'
import List from '../List'
import './index.css'

function App() {
  return (
    <div className="h-screen  max-w-3xl m-auto">
      <Header className="h-16 flex-shrink-0" />
      <main className="relative flex-1 px-9 pb-5">
        <Switch>
          <Route exact path={['/', '/home']}>
            <List />
          </Route>
          <Route path="/article">
            <Article />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
