import { useContext } from "react";
import { AuthContext } from "../../../context";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import profil from "../../../assets/imgs/avatar/ava_1.png";
import profil2 from "../../../assets/imgs/avatar/ava_3.png";

function Lists() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function linkTransactin() {
    navigate('/lists/expense');
  }
  return (
    <>
      {user ? (
        <>
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 mt-5">
              <h4 className="mb-15">Lists</h4>
            </div>
          </div>
          <div className="row" onClick={() => linkTransactin()}>
            <div className="col-lg-8 col-md-12 col-12 mx-auto">
              <div className="content-page">
                <div className="job-list-list">
                  <div className="list-recent-jobs">
                    <div className="card-job hover-up wow animate__animated animate__fadeIn">
                      <div className="card-job-top">
                        <div className="card-job-top--image">
                          <figure>
                            <img
                              src={profil}
                            />
                          </figure>
                        </div>
                        <div className="card-job-top--info">
                          <div className="row">
                            <div className="col-lg-5">
                              <h6 className="card-job-top--info-heading">
                                <a href="job-single.html">Voyage</a>
                              </h6>
                              <span className="card-job-top--location">
                                <i className="fi-rr-marker"></i> my balance
                              </span>
                              <span className="card-job-top--company">
                                10 €
                              </span>
                            </div>
                            <div className="col-lg-7 text-lg-end">
                              <a
                                href="job-grid-2.html"
                                className="btn btn-small background-blue-light mr-5"
                              >
                                <i className="bi bi-x-lg"></i>
                              </a>
                              <a
                                href="job-grid.html"
                                className="btn btn-small background-urgent btn-pink mr-5"
                              >
                                <i className="bi bi-person-fill-add"></i>
                              </a>
                              <a
                                href="job-grid.html"
                                className="btn btn-small background-6 disc-btn"
                              >
                                <i className="bi bi-currency-exchange"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12 mx-auto">
              <div className="content-page">
                <div className="job-list-list">
                  <div className="list-recent-jobs">
                    <div className="card-job hover-up wow animate__animated animate__fadeIn">
                      <div className="card-job-top">
                        <div className="card-job-top--image">
                        <figure>
                            <img
                              src={profil2}
                            />
                          </figure>
                        </div>
                        <div className="card-job-top--info">
                          <div className="row">
                            <div className="col-lg-5">
                              <h6 className="card-job-top--info-heading">
                                <a href="job-single.html">Foot</a>
                              </h6>
                              <span className="card-job-top--location">
                                <i className="fi-rr-marker"></i> my balance
                              </span>
                              <span className="card-job-top--company">
                                50 €
                              </span>
                            </div>
                            <div className="col-lg-7 text-lg-end">
                              <a
                                href="job-grid-2.html"
                                className="btn btn-small background-blue-light mr-5"
                              >
                                <i className="bi bi-x-lg"></i>
                              </a>
                              <a
                                href="job-grid.html"
                                className="btn btn-small background-urgent btn-pink mr-5"
                              >
                                <i className="bi bi-person-fill-add"></i>
                              </a>
                              <a
                                href="job-grid.html"
                                className="btn btn-small background-6 disc-btn"
                              >
                                <i className="bi bi-currency-exchange"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12 mx-auto">
                <NavLink to='/lists/addlist'
                  className="btn btn-primary my-5"
                >
                  <i className="bi bi-plus-circle mx-2"></i>
                  Ajouter une liste
                </NavLink>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Lists;
