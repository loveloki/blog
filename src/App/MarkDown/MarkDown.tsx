import { useEffect, useState } from 'react'
import { useRemark } from 'react-remark'
import { useParams, useLocation } from 'react-router-dom'
import articles from '@/article'

const ExampleComponent = () => {
  const [text, setText] = useState('')
  const [reactContent, setMarkdownSource] = useRemark()
  const location = useLocation()
  const { id } = useParams()

  useEffect(() => {
    const isHome = location.pathname === '/'

    // todo 放在这里好像不太好
    if (isHome) {
      setText(articles.get('README'))

      return
    }

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
