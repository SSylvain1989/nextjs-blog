import Link from 'next/link'

export default function Post({post}) {
  return (
    <div>
      <Link href="/">
        <a>Go Home</a>
      </Link>
      <h2>{post.Title}</h2>
    </div>
  )
}

// tell next.js how many pages there arguments
// res for responses
export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/posts')
  const posts = await res.json();

  const paths = posts.map((post) =>({
    params: { slug: post.Slug},
  }))

  return {
    // what next expects to : 
    // paths: [
    //   { params : { slug: post.Slug}}
    // ],
    paths, // paths here is the result of loop under in const paths
    fallback: true, // false will force nextjs to rebuild the entire project , true nextJs will rebuild only the changing file
  }

}
// for each individual page : get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params; // params witch is the data from url , like :id
  console.log('c mon slug :'+ slug);
  const res = await fetch(`http://localhost:1337/posts?Slug=${slug}`);
  console.log('réponse sereveur :'+res);
  const data = await res.json();
  console.log('c ma data de mon serveur '+data);
  const post = data[0];
  console.log('c ma data de mon serveur[0] '+data[0]);


  return{
    props: {post}, // now post variable is available in props of Post function
  }

}