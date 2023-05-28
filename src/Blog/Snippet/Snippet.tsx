import Markdown from '@/components/Markdown/Markdown'
import { useLoaderData } from 'react-router-dom'

function Snippet() {
  const text = useLoaderData() as string || 'not this snippet!'

  return (
    <article
      className="post-body"
    >
      <Markdown text={text} />
    </article>
  )
}

export default Snippet
