import './Blog.css'
import usePosts from '../hooks/usePosts'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div id="Blog">
      <header>a simple blog</header>
      <main>
        <List />
      </main>
      <aside>其他信息，放在侧边 比如阅读书籍，个人信息</aside>
    </div>
  )
}

function List() {
  const posts = usePosts()

  return (
    <ul>
      {posts.map(({ name, desc, tags }) => {
        return (
          <li className="list-item" key={name}>
            <header>
              <Link key={name} to={'/post/' + name}>
                {name}
              </Link>
            </header>
            <div>{desc}</div>
            <footer>{tags.map(Tag)}</footer>
          </li>
        )
      })}
    </ul>
  )
}

function Tag(text: string) {
  return <i className="tag">{text}</i>
}

export default App
