import { Link } from "react-router";
import { useAuth } from "./AuthContext";
import "../css/header.css"

const Header = ({ links }) => {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header>
      <nav>
        <h1 className="logo"><em>Project: Blog</em></h1>
        <div className="links">
          {links.map(link => (
            <Link className="link" key={`link-${link.id}`} to={link.href}>
              {link.text}
            </Link>
          ))}

          {!isAuthenticated && (
            <Link to="/login" className="link">
              Log In
            </Link>
          )}

          {isAuthenticated && (
            <div className="logout link" onClick={() => logout()}>
              <span className="username">{user.username}</span>
              <img height="20px" src="/assets/logout.svg" alt="Log Out" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header