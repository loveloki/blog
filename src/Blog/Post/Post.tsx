import { marked } from 'marked'
import { useEffect, useState } from 'react'
import './Post.css'

const basePath = '/posts/'

function Post({ name }: { name: string }) {
  const [text, setText] = useState('')

  useEffect(() => {
    fetch(`${basePath}${name}.md`)
      .then((res) => res.text())
      .then((txt) => {
        setText(txt)
      })
      .catch((e) => {
        console.warn(e)
        setText('404')
      })
  }, [name])

  return <article dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />
}

export default Post
