import { Outlet, useParams } from 'react-router-dom'
import usePosts, { Post } from '@hooks/usePosts'
import useIsHome from '@hooks/useIsHome'
import List from './List'
import './Blog.css'

function App() {
  const theme = 'ayu-light'
  const isHome = useIsHome()
  const posts = usePosts()
  const param = useParams()
  const activePost = posts.find(({ id }) => id === param.id)

  return (
    <div id="Blog" data-theme={theme}>
      <header>{activePost?.title || 'a simple blog'}</header>
      <main>
        <List isHome={isHome} activeId={activePost?.id} />
        <Outlet />
      </main>
      <aside>其他信息，放在侧边 比如阅读书籍，个人信息</aside>
    </div>
  )
}

export default App
