import { createBrowserRouter } from 'react-router-dom'
import Blog from './Blog'
import Post from './Blog/Post'
import Snippet from './Blog/Snippet/Snippet';

const router = createBrowserRouter([
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
    ],
  },
  {
    path: '/snippets/:id',
    element: <Snippet />,
    loader: async ({ params }) => {
      const text = await (await fetch(`/snippets/${params.id}.md`)).text()

      return text
    },
  },
])

export default router
