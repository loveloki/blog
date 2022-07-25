import { useEffect, useState } from 'react'
import { useRemark } from 'react-remark'
import { useParams } from 'react-router-dom'
import articles from '@/article'

const ExampleComponent = () => {
  const [text, setText] = useState('')
  const [reactContent, setMarkdownSource] = useRemark()
  const { id } = useParams()

  useEffect(() => {
    if (articles.has(id)) {
      setText(articles.get(id))
    } else {
      setText('404!')
    }
  }, [id])

  useEffect(() => {
    setMarkdownSource(text)
  }, [text])

  return reactContent
}

export default ExampleComponent
