import { useLoaderData } from 'react-router-dom'
import Markdown from '@/components/Markdown/Markdown'
import './Post.css'

function Post() {
  const text = useLoaderData() as string

  return <article className='post-body'>
    <Markdown text={text} />
  </article>
}

export default Post
