import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'

// Post Template Paths
// ================================================
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'articles'))

  const paths = files.map(file => ({
    params: {
      slug: file.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

// Post Template Props
// ================================================
export async function getStaticProps(context) {
  const slug = context.params.slug

  const postsDirectory = path.join(process.cwd(), 'articles')
  const filePath = path.join(postsDirectory, slug + '.md')
  const fileContents = fs.readFileSync(filePath, 'utf-8')

  return {
    props: {
      post: fileContents
    }
  }
}

// Post Template Component
// ================================================
const postTemplate = ({post}) => {
  const {data: frontMatter, content} = matter(post)

  return (
    <article>
      <h1>{frontMatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: marked(content)}} />
    </article>
    
  )
}

export default postTemplate