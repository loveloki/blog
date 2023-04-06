import { useLoaderData } from 'react-router-dom'
import { marked } from 'marked'
import './Post.css'

function Post() {
  const text = useLoaderData() as string

  return <article dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
}

export default Post
