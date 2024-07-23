import { useContext } from "react";
import { AuthContext } from "../../../context";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { deleteList } from "../../../services/apis/lists";
import profil from "../../../assets/imgs/avatar/ava_1.png";
import profil2 from "../../../assets/imgs/avatar/ava_3.png";
import StickySection from "../../../components/common/_components/StickySection";

function Lists() {
  const { user, lists, handleDeleteList } = useContext(AuthContext);
  const navigate = useNavigate();

  function linkTransaction(_id) {
    navigate(`/lists/${_id}`);
  }

  function removelist(listId) {
    handleDeleteList(listId);
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
          {lists.map((item, index) => (
            <div
              className="row"
              key={item._id}
              onClick={() => linkTransaction(item._id)}
            >
              <div className="col-lg-8 col-md-12 col-12 mx-auto">
                <div className="content-page">
                  <div className="job-list-list">
                    <div className="list-recent-jobs">
                      <div className="card-job">
                        <div className="card-job-top">
                          <div className="card-job-top--image">
                            <figure>
                              <img src={item.image.original} />
                            </figure>
                          </div>
                          <div className="card-job-top--info">
                            <div className="row">
                              <div className="col-lg-5">
                                <h6 className="card-job-top--info-heading">
                                  <span>{item.name}</span>
                                </h6>
                                <span className="card-job-top--location">
                                  <i className="fi-rr-marker"></i> my balance
                                </span>
                                <span className="card-job-top--company">
                                  10 €
                                </span>
                              </div>
                              <div className="col-lg-7 text-lg-end">
                                <button
                                  className="btn btn-small background-red mr-5"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removelist(item._id);
                                  }}
                                >
                                  <i className="bi bi-x-lg"></i>
                                </button>
                                <button className="btn btn-small background-blue-light mr-5">
                                  <i className="bi bi-person-fill-add"></i>
                                </button>
                                <button className="btn btn-small background-6 disc-btn">
                                  <i className="bi bi-currency-exchange"></i>
                                </button>
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
          ))}
          <StickySection offset={5}>
            <div className="row">
              <div className="col-md-12 text-center">
                <NavLink to="/lists/addlist" className="btn btn-primary my-2 mx-3">
                  <i className="bi bi-plus-circle mx-2"></i>
                  Ajouter une liste
                  {console.log(lists)}
                </NavLink>
              </div>
            </div>
          </StickySection>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Lists;
