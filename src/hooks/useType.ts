import { useLocation } from 'react-router-dom'
import { ListItemType } from './useList'

const useType = () => {
  const pathname = useLocation().pathname

  if (pathname === '/') {
    return 'posts'
  }

  const secondPath = pathname.split('/')[1]
  let result: ListItemType

  switch (secondPath) {
    case 'posts':
      result = 'posts'
      break
    case 'snippets':
      result = 'snippets'
      break
    default:
      result = 'posts';
      console.warn('不存在的类型，返回主页')
  }

  return result
}

export default useType
