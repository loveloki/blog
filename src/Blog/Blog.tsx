import { Link, Outlet, useParams } from 'react-router-dom'
import usePosts from '../hooks/usePosts'
import useIsHome from '../hooks/useIsHome'
import './Blog.css'

function App() {
  return (
    <div id="Blog">
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

function List() {
  const posts = usePosts()

  return (
    <ul>
      {posts.map(({ id, title, desc, tags }) => {
        return (
          <li className="list-item" key={id}>
            <header>
              <Link to={'/posts/' + id}>{title}</Link>
            </header>
            <div>{desc}</div>
            <footer>
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </footer>
          </li>
        )
      })}
    </ul>
  )
}

function Tag({ text }: { text: string }) {
  return <i className="tag">{text}</i>
}

export default App
