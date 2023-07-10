import { Outlet, useParams } from 'react-router-dom'
import usePosts from '@hooks/usePosts'
import useIsHome from '@hooks/useIsHome'
import List from './List'
import './Blog.css'
import { useState } from 'react'
import useList, { ListItemType } from '@/hooks/useList'
import Header from './Header'

function App() {
  const [type, setType] = useState<ListItemType>('posts')
  const isHome = useIsHome()
  const posts = useList(type)
  const param = useParams()
  const activeItem = posts.find(({ id }) => id === param.id)

  return (
    <div id="blog">
      <Header type={type} setType={setType} activeId={activeItem?.id} />
      <main>
        {isHome ? (
          <List type={type} isHome={isHome} activeId={activeItem?.id} />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

export default App
