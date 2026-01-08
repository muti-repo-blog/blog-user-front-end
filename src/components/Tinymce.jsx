import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from './AuthContext';
import '../css/tinymce.css';

export default function Tinymce(props) {
  const { user } = useAuth()
  const [error, setError] = useState("")
  const editorRef = useRef(null);
  async function postComment(props) {

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${props.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        commentContent: editorRef.current.getContent(),
        authorId: user.id
      }),
    });

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Posting comment failed")
      return;
    }

    editorRef.current.setContent("");
    props.setReloadComments(prev => !prev);
    setError('')
    return
  }

  function checkIfValid() {
    if (!editorRef.current.getContent()) {
      setError("Comment can not be empty!")
      return 
    }

    postComment(props)
  }

  return (
    <>
      {error && <p style={{ color: "red" }} className="error">{error}</p>}
      <Editor
        apiKey="gts2oa67hjdy18b02u251x4jqv1ptatqfky56qyg7vx0u2j5"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          placeholder: 'Your Comment Here...',
          height: '20vh',
          menubar: false,
          plugins:
            "advlist autolink lists link image charmap preview anchor " +
            "searchreplace visualblocks code fullscreen " +
            "insertdatetime media table help wordcount",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 16px; background-color: #C4BFB5; color: #2F362F; }"
        }}
      />
      <button className='tinymceSubmitButton' onClick={() => checkIfValid()}>Comment</button>
    </>

  );
}