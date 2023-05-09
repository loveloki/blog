import { marked } from 'marked'
import { useLoaderData } from 'react-router-dom'

marked.use({
  mangle: false,
  headerIds: false,
})

function Snippet() {
  const text = useLoaderData() as string || 'not this snippet!'

  return (
    <article
      className="post-body"
      dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
    />
  )
}

export default Snippet
