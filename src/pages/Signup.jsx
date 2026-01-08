import Header from "../components/header";
import "../css/form.css"
import { useState } from "react";
import { Navigate } from "react-router";
import Form from "../components/Form";

const FormLogic = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (confirmPassword !== password) {
      setError("Passwords do not match!")
      setConfirmPassword("")
      setPassword("")
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json()

    if (data.error === "Username already in use!") {
      setError(data.error)
      setUsername("")
      return;
    }

    if (!res.ok) {
      setError(data.error || "Signup failed")
      return;
    }

    console.log(data.msg)
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Form
        isLoginForm={false}
        handleSubmit={handleSubmit}
        error={error}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </>
  )
}

const Signup = () => {
  return (
    <>
      <Header
        links={[
          { id: 1, text: "Home", href: "/" },
        ]}
      />
      <FormLogic />
    </>
  );
};

export default Signup;
