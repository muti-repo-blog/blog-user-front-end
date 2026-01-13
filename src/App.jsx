import "./css/globle.css"
import Header from "./components/header"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import "./css/post.css"
import { getTextPreview, isTooLong } from "./components/postHelpers"

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL)
      .then((response) => response.json())
      .then((response) => setData(response.posts))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, []);

  return (
    <>
      <Header
        links={[
          { id: 1, text: "Posts", href: "/posts" },
        ]}
      />

      <div className="outline">
        <h2>Welcome to <em>Project: Blog</em></h2>
        <img className="outlineImg" src="/assets/blog.jpg" alt="" />
      </div>

      <h3>Featured Posts</h3>
      {loading && <h1>Loading...</h1>}

      <div className="featuredPosts">
        {data.map(post => (
          <Link to={`/posts/${post.id}`} tabIndex={0} className="featuredPost" key={`post-${post.id}`}>
            <h2>{post.title}</h2>
            <div className="postPreview">
              {getTextPreview(post.content, 100)}
              {isTooLong(post.content, 100) && (
                <>...<span className="morePost">more</span></>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default App;
