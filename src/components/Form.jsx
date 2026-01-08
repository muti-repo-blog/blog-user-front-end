import { useState } from "react";
import { Link } from "react-router";

const Form = (props) => {
  const [isLoginForm, setIsLoginForm] = useState(props.isLoginForm)

  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <legend>
          <h2>
            {isLoginForm ? "Log In" : "Sign Up"}
          </h2>

        </legend>

        {props.error && <p style={{ color: "red" }} className="error">{props.error}</p>}

        <div className="flexColumn">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={props.username}
            onChange={e => props.setUsername(e.target.value)}
          />
        </div>

        <div className="flexColumn">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={props.password}
            onChange={e => props.setPassword(e.target.value)}
          />
        </div>

        {/* Only on sign up form */}
        {!isLoginForm &&
          <div className="flexColumn">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={props.confirmPassword}
              onChange={e => props.setConfirmPassword(e.target.value)}
            />
          </div>
        }

        <div className="submitButtonBox">
          <button type="submit">{isLoginForm ? "Log In" : "Sign Up"}</button>
        </div>
      </form>
      <div className="noAccountBox">
        {isLoginForm ?
          <>
            <div>Don't have an account?</div>
            <Link className="noAccount" to="/signup">Sign Up here</Link>
          </> :
          <>
            <div>Already have an account?</div>
            <Link className="noAccount" to="/login">Log In here</Link>
          </>
        }
      </div>
    </>
  )
}

export default Form