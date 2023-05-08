import { useLoaderData } from 'react-router-dom'
import { marked } from 'marked'
import './Post.css'

marked.use({
  mangle: false,
  headerIds: false,
});

function Post() {
  const text = useLoaderData() as string

  return <article className='post-body' dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
}

export default Post
