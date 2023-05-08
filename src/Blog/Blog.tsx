import { Outlet, useParams } from 'react-router-dom'
import usePosts from '@hooks/usePosts'
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
        <aside>侧边栏，放置目录等辅助内容</aside>
      </main>
    </div>
  )
}

export default App
