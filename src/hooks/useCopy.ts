type CopyContent = string | HTMLElement

function useCopy(content: CopyContent) {
  if (typeof content === 'string') {
    return copyText(content)
  } else {
    copyNode(content)
  }
}

function copyText(text: string) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text)
  }

  const node = document.createElement('pre')

  node.style.width = '1px'
  node.style.height = '1px'
  node.style.position = 'absolute'
  node.style.left = '-1px'
  node.textContent = text

  return copyNode(node)
}

function copyNode(node: HTMLElement) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(node.textContent || '')
  }

  const selection = getSelection()

  if (selection === null) {
    return Promise.reject(new Error())
  }

  selection.removeAllRanges()

  const range = document.createRange()

  range.selectNodeContents(node)
  selection.addRange(range)

  document.execCommand('copy')
  selection.removeAllRanges()

  return Promise.resolve()
}


export default useCopy
