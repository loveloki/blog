import useWebContainer from '@/hooks/useWebContainer'
import { useEffect, useState } from 'react'
import Style from './WebContainer.module.css'

const WebContainer = () => {
  const [tip, setTip] = useState('isLoading WebContainer')
  const container = useWebContainer()

  useEffect(() => {
    if (container) {
      setTip('WebContainer Loaded!')
    }
  }, [container])

  return (
    <main className={Style['web-container']}>
      <textarea placeholder={tip} className={Style.textarea} />
      <div className={Style.preview}>
        <iframe className={Style.iframe} sandbox="" />
      </div>
    </main>
  )
}

export default WebContainer
