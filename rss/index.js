/**
 * 生成 RSS
 */
import fs from 'fs'
// todo 整个目录由 build 生成？
// todo 路由为约定式

const blogs = [
  {
    id: 'build-LibreOffice',
    title: '构建LibreOffice',
    desc: '使用Visual Studio 2022构建LibreOffice7.5.0.1',
    tags: ['LibreOffice', '构建', '教程'],
    time: 1678723200000,
  },
]

/**
 * @param {string} title 标题
 * @param {string} link 链接
 * @param {string} description 描述
 * @param {number} pubDate 发布日期
 * todo 时间使用 git 读取
 */
// eslint-disable-next-line max-params
function getItemXML(title, link, description, pubDate) {
  const url = `/posts/${link}`
  const time = new Date(pubDate).toUTCString()

  return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <description>${description}</description>
      <pubDate>${time}</pubDate>
    </item>`
}

const list = blogs.map((blog) => {
  const { title, id, desc, time } = blog

  return getItemXML(title, id, desc, time)
})

const RSS = `<?xml version="1.0"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Xleine's Blog</title>
    <link>https://xleine.moe</link>
    <description>Xleine 的博客，可能会有也可能没有任何东西。</description>
    <language>zh-Hans</language>
    <lastBuildDate>Mon, 18 Sep 2023 14:50:25 GMT</lastBuildDate>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <managingEditor>xleine@qq.com (Xleine)</managingEditor>
    <webMaster>sally.ride@example.com (Sally Ride)</webMaster>
    <copyright>Copyright 2023 Xleine</copyright>
    <atom:link href="https://www.rssboard.org/files/sample-rss-2.xml" rel="self" type="application/rss+xml" />
    ${list.join('\n')}
  </channel>
</rss>`

fs.writeFileSync('dist/rss.xml', RSS)
