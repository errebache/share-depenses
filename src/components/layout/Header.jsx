import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context";
import Loading from "../loaders/loading";
import profil from "../../assets/imgs/avatar/ava_1.png";

function Header() {
  const { user, signout, initializing } = useContext(AuthContext);
  return (
    <header className="header sticky-bar">
      <div className="container">
        <div className="main-header">
          <div className="header-logo">
            {user ? (
              <NavLink to="/lists">Trip Spend</NavLink>
            ) : (
              <NavLink to="/">Trip Spend</NavLink>
            )}
          </div>
          <div className="header-nav">
            <nav className="nav-main-menu d-none d-xl-block">
              <ul className="main-menu">
                {user ? (
                  <>
                    <div className="user-account">
                      <NavLink to={`/lists/profil/${user._id}`}>
                        <img src={profil} alt="jobhub" />
                      </NavLink>
                      <div className="content">
                        <h6 className="user-name">
                          {user.name}, <span className="text-brand">AliThemes</span>
                        </h6>
                        <p className="font-xs text-muted">
                          2 notifications
                        </p>
                      </div>
                    </div>
                    <li>
                      <NavLink to="/login">
                        <button
                          onClick={() => signout()}
                          className="btn btn-danger"
                        >
                          Logout
                        </button>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to="/register">
                        <button className="btn btn-default">
                          Create account
                        </button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">
                        <button className="btn-border">Login</button>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
