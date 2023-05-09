## 使用 bun 启动一个简单的静态文件服务器

```typescript
import { serve } from "bun";

const bashPath = import.meta.dir
const EntryHTMLFile = '/index.html'
const hostname = '0.0.0.0'
const port = 3000

const welcomeTip = `
starting server on ${port}

basePath is ${bashPath}
hostname is ${hostname}
entry HTML file is ${EntryHTMLFile}

this is a static file server by bun.js
`

console.log(welcomeTip)

serve({
  port,
  hostname,
  fetch(req) {
    const { pathname } = new URL(req.url)

    if (pathname === '/') {
      return new Response(Bun.file('./index.html'));
    }

    const path = bashPath + pathname;
    const stream = Bun.file(path)

    if (stream.size) {
      return new Response(stream);
    }

    return new Response(null, {
      status: 404,
      statusText: 'not found file',
    });
  },
});

```
