import { WebContainer } from '@webcontainer/api'
import { useState } from 'react'

declare namespace window {
  let webContainer: WebContainer
  let webContainerPromise: Promise<WebContainer>
}

const useWebContainer = () => {
  const [container, setContainer] = useState<WebContainer>()

  if (window.webContainer) {
    return window.webContainer
  }

  if (!window.webContainerPromise) {
    window.webContainerPromise = WebContainer.boot()
  }

  window.webContainerPromise
    .then((p) => {
      setContainer(p)
      window.webContainer = p
    })
    .catch((e) => {
      console.error('加载失败！')
      console.error(e)
    })

  return container
}

export default useWebContainer
