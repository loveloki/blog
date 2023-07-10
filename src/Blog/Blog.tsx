import { Outlet, useParams } from 'react-router-dom'
import useType from '@/hooks/useType'
import useList from '@/hooks/useList'
import Header from './Header'
import List from './List'
import './Blog.css'

function App() {
  const type = useType()
  const items = useList(type)
  const param = useParams()
  const activeItem = items.find(({ id }) => id === param.id)

  return (
    <div id="blog">
      <Header type={type} activeId={activeItem?.id} />
      <main>
        {!activeItem?.id ? (
          <List type={type}  activeId={activeItem?.id} />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

export default App
