import Header from "../components/header";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Tinymce from "../components/Tinymce";
import DOMPurify from "dompurify";
import "../css/post.css"

const Post = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [postLoading, setPostLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const { id } = useParams();
  const [reloadComments, setReloadComments] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((response) => {
        setPost(response.post)
      })
      .catch((error) => console.error(error))
      .finally(() => setPostLoading(false))
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((response) => {
        setComments(response.postComments)
      })
      .catch((error) => console.error(error))
      .finally(() => setCommentsLoading(false))
  }, [reloadComments]);

  return (
    <>
      <Header
        links={[
          { id: 1, text: "Home", href: "/" },
          { id: 2, text: "Posts", href: "/posts" },
        ]}
      />
      {postLoading && <h1>Loading...</h1>}
      {post && !postLoading &&
        <>
          <div className="singlePost" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div >

          <div className="newComment">
            <Tinymce id={post.id} setReloadComments={setReloadComments} />
          </div>
        </>
      }

      {commentsLoading && <h1>Loading...</h1>}
      {comments && !commentsLoading && (
        <>

          <div className="commentTop">
            <h3>Comments</h3>
            <hr />
            {comments.length === 0 &&
            <p>No comments for this post yet</p>}
          </div>

          {comments.map(comment => (
            <div key={comment.id}>
              <div className="comment">
                <h3>@{comment.author.username}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.content, {
                      ALLOWED_TAGS: [
                        "b", "i", "em", "strong", "h1", "h2", "h3", "h4", "h5", "h6",
                        "p", "ul", "ol", "li", "a", "img", "blockquote", "code", "pre", "span", "div", "br"
                      ],
                      ALLOWED_ATTRS: [
                        "href", "src", "alt", "title", "style", "class", "target", "rel"
                      ],
                      ALLOW_DATA_ATTR: false, 
                      SAFE_FOR_TEMPLATES: true,
                      FORBID_TAGS: ['script', 'style'],
                      FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus']
                    })
                  }}
                />
              </div>
            </div>
          ))}
        </>
      )
      }

    </>
  );
};

export default Post;
