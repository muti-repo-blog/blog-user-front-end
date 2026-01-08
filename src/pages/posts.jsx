import { useEffect, useState } from "react";
import Header from "../components/header";
import { Link } from "react-router";
import "../css/post.css"
import { showFirstPartOfPost, postTooLong } from "../components/postHelpers";


const Posts = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);

    fetch(`${import.meta.env.VITE_BASE_URL}/posts?page=${page}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Fetch failed");
        return response.json();
      })
      .then((response) => {
        setData(response)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))

  }, [page]);


  return (
    <>
      <Header
        links={[
          { id: 1, text: "Home", href: "/" },
        ]}
      />
      {loading && <h1>Loading...</h1>}
      <div className="featuredPosts">
        {data && !loading && data.posts.map(post => (
          <Link to={`/posts/${post.id}`} tabIndex={0} className="featuredPost" key={post.id}>
            <h2>{post.title}</h2>
            <p>
              {showFirstPartOfPost(100, post.content)}
              {postTooLong(100, post.content) &&
                <>
                ...<span className="morePost">more</span>
                </>
              }
            </p>
          </Link>
        ))}
      </div>
      {data &&
        <div className="paganation">
          <button className="pageArrowButton" tabIndex={0} disabled={page === 1} onClick={() => setPage(page - 1)}>
            <img className="pageArrow" src="/assets/arrow-left.svg" alt="back one page" />
          </button>
          <div className="currentPage">Page {page} of {data.totalPages}</div>
          <button className="pageArrowButton" tabIndex={0} disabled={page === data.totalPages} onClick={() => setPage(page + 1)}>
            <img className="pageArrow" src="/assets/arrow-right.svg" alt="forwards one page" />
          </button>
        </div>}
    </>
  );

};

export default Posts;
