import { useEffect, useState } from 'react'

export default function useFontsReady(): boolean {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => {
      setIsReady(true)
    })
  }, [])

  return isReady
}
