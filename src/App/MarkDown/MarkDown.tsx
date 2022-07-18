import { useEffect } from 'react'
import { useRemark } from 'react-remark'
import mk from '@/article/test.md?raw'

const ExampleComponent = () => {
  const [reactContent, setMarkdownSource] = useRemark()

  useEffect(() => {
    setMarkdownSource(mk)
  }, [])

  return reactContent
}

export default ExampleComponent
