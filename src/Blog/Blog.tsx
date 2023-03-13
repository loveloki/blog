import Post from './Post'
import './Blog.css'
import usePosts from '../hooks/usePosts'

function App() {
  const posts = usePosts()

  return (
    <div id="Blog">
      <header>a simple blog</header>
      <main>
        文章列表
        {posts.length &&
          posts.map(({ name }) => {
            return <Post key={name} name={name} />
          })}
      </main>
      <aside>其他信息，放在侧边 比如阅读书籍，个人信息</aside>
    </div>
  )
}

export default App
