import { AuthContext } from "../../context";
import profil from "../../assets/imgs/avatar/ava_1.png";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LanguageSelector from "../../components/common/_components/LanguageSelector";

function Profil() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('mouhcine.errebache@gmail.com');
  const [password, setPassword] = useState('initial password');

  // Example `onChange` handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
      user ? (
        <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card profile-header text-center mb-30">
              <div className="card-body">
                <div className="profile-circle card-img">
                    <img src={profil} alt="" />
                </div>
                <h5 className="card-title mt-2">{user.name}</h5>
                <a href="#" className="btn btn-border btn-sm">Edit</a>
              </div>
            </div>
    
            <div className="card mb-30">
              <div className="card-body">
                <h5 className="card-title">Payment methods</h5>
                <a href="#" className="btn btn-border btn-sm mr-25">Connect bank account</a>
                <a href="#" className="btn btn-border btn-sm">Connect with PayPal</a>
              </div>
            </div>
    
            <div className="card mb-30">
              <div className="card-body">
                <h5 className="card-title">Preferred language</h5>
                <select className="form-select" value="French" onChange={(e) => setSelectedLanguage(e.target.value)}>
                  <option value="English">English</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>
    
            <div className="card mb-30">
              <div className="card-body">
                <h5 className="card-title">Log in</h5>
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email address"
                    value={user.email}
                    onChange={handleEmailChange} // Add this `onChange` handler
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={user.password}
                    onChange={handlePasswordChange} // Add this `onChange` handler
                  />
                <a href="#" className="btn btn-link btn-sm">Edit</a>
              </div>
            </div>

            <div className="card mb-30">
              <LanguageSelector />
            </div>
    
            <div className="card mb-30">
              <div className="card-body">
                <h5 className="card-title">Email notifications</h5>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label">
                    Receive product updates
                  </label>
                </div>
              </div>
            </div>
    
            <div className="gap-2">
              <button className="btn btn-danger btn-sm" type="button">Log out</button>
            </div>
    
          </div>
        </div>
      </div>
      ): (
        <Navigate to="/login" />
      )
  );
}

export default Profil;
