import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// client side ( CSR ) 
// posts come from server side and return by getStaticProps
export default function Home({posts}) {

  return (
    <div>
      {/*loop over the post and show them*/}
      {posts.map((post) => (
        <Link href={`/${post.Slug}`} key={post.id}>
        <a>
          {/* we get the title for each post of array Posts */}
          <h2>{post.Title}</h2>
          <div>{post.User.username}</div>
        </a>
        </Link>
      ))}
    </div>
  )
}


// server side ( SSR ) - get a static page , a pre-render page
export async function getStaticProps() {
  // get posts from our api
  const res = await fetch ('http://localhost:1337/posts');
  // we save posts data in posts const
  const posts = await res.json();
  // getStaticPropos return to the client SIDE the data posts
  return {
    props: {posts},
  }

}
