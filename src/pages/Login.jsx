import Header from "../components/header";
import "../css/form.css"
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router";
import Form from "../components/Form";

const FormLogic = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Login failed")
      return;
    }

    await login(data.token);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Form
        isLoginForm={true}
        handleSubmit={handleSubmit}
        error={error}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername} />
    </>
  )
}

const Login = () => {
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

export default Login;
