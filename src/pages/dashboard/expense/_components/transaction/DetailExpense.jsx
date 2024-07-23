import { NavLink, useParams } from "react-router-dom";
import start_1 from "../../../../../assets/imgs/avatar/ava_1.png";
import { useFetchData } from "../../../../../hooks/useFetchData";
import { API_EXPENSES } from "../../../../../services/apis/apis";
import Loading from "../../../../../components/loaders/loading";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context";

function DetailExpense() {
  const { user } = useContext(AuthContext);
  const { idTransaction } = useParams();
  const { data, isLoading, error } = useFetchData(`${API_EXPENSES}/${idTransaction}`);


  return isLoading ? (
    <Loading />
  ) : (
    data.length &&
      data.map((item, index) => (
        <div className="container" key={item._id}>
          <div className="row justify-content-center">
            <div className="col-md-6  mt-5 mb-40">
              <h4 className="">{item.description}</h4>
              <p className="medium-heading mt-5">{item.amount} € </p>
            </div>
            <div className="col-md-3 text-end">
              <NavLink to="/lists/editexpense" className="btn btn-primary">
                <i className="bi bi-pencil-square mr-5"></i>edit
              </NavLink>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 ">
              <span className="paidby">Payé par <span className="text-brand">{item.paidBy.name}</span>
                  {user._id === item.paidBy._id && (
                    <div className="paidby-icon medium-heading">moi</div>
                  )}
              </span>
            </div>
            <div className="col-md-3 text-end">
              <span className="text-muted">08/03/2024</span>
            </div>
          </div>
          <div className="row mtb-20 justify-content-center">
            <div className="col-md-9">
              <div className="divider"></div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-9 mb-20">
              <h6 className="text-start">
                {item.splitAmong.length} participants
              </h6>
            </div>
            <div className="col-md-9">
              {item.splitAmong.map((user, index) => (
                <div key={index} className="row mb-20">
                  <div className="col-md-4">
                    <div className="post-meta">
                      <div className="author author-connected d-flex align-items-center mr-30">
                        <img
                          src={start_1}
                          alt=""
                          width={30}
                          className="mr-10"
                        />
                        <span>{user.userId.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <div className="date d-flex align-items-center">
                      <span className="small-heading">{user.amount} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))
  );
}

export default DetailExpense;
