import { createBrowserRouter } from 'react-router-dom'
import Blog from './Blog'
import Post from './Blog/Post'
import Snippet from './Blog/Snippet/Snippet';
import FontChecker from './tools/FontChecker';

const router = createBrowserRouter([
  {
    path: '/tools',
    element: <FontChecker />,
  },
  {
    path: '/',
    element: <Blog />,
    children: [
      {
        path: 'posts/:id',
        element: <Post />,
        loader: async ({ params }) => {
          const text = await (await fetch(`/posts/${params.id}.md`)).text()

          return text
        },
      },
      {
        path: 'snippets/:id',
        element: <Snippet />,
        loader: async ({ params }) => {
          const text = await (await fetch(`/snippets/${params.id}.md`)).text()

          return text
        },
      },
    ],
  },
  {
      path: '/posts',
      element: <Blog />,
  },
  {
    path: '/snippets',
    element: <Blog />,
}
])

export default router
