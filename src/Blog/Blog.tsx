import { Outlet, useParams } from 'react-router-dom'
import usePosts from '../hooks/usePosts'
import useIsHome from '../hooks/useIsHome'
import './Blog.css'
import List from './List'

function App() {
  const theme = 'ayu-light'

  return (
    <div id="Blog" data-theme={theme}>
      <Header />
      <main>
        <Content />
      </main>
      <aside>其他信息，放在侧边 比如阅读书籍，个人信息</aside>
    </div>
  )
}

function Header() {
  const isHome = useIsHome()
  const posts = usePosts()
  const param = useParams()

  const title = isHome
    ? 'a simple blog'
    : posts.find(({ id }) => id === param.id)?.title

  return <header>{title}</header>
}

function Content() {
  const isHome = useIsHome()

  return isHome ? <List /> : <Outlet />
}

export default App
