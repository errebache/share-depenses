import { NavLink, useParams } from "react-router-dom";
import profil from "../../../assets/imgs/avatar/ava_1.png";
import start_1 from "../../../assets/imgs/avatar/ava_1.png";
import start_2 from "../../../assets/imgs/avatar/ava_1.png";
import start_3 from "../../../assets/imgs/avatar/ava_1.png";
import start_4 from "../../../assets/imgs/avatar/ava_1.png";
import start_5 from "../../../assets/imgs/avatar/ava_1.png";
import start_6 from "../../../assets/imgs/avatar/ava_1.png";
import ListExpense from "./_components/ListExpense";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import Loading from "../../../components/loaders/loading";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { API_LIST } from "../../../services/apis/apis";

function Expense() {
  const { idList } = useParams();
  const { data, isLoading, error } = useFetchData(`${API_LIST.BASE}/detail/${idList}`);

  return (
    <>
    {console.log(data)}
      {
          isLoading ? (
            <Loading />
          )
         :
         (
          data.length && Array.isArray(data) && data.map((item, index) => (
            <div key={item._id}>
              <section className="section-box">
                <div className="box-head-single box-head-single-candidate">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8 col-md-12 col-12 mx-auto">
                        <div className="heading-image-rd online">
                          <a>
                            <figure>
                              <img src={item.image.original} alt="list" />
                            </figure>
                          </a>
                        </div>
                        <div className="heading-main-info mb-20">
                          <h4>{item.name}</h4>
                          <div className="head-info-profile">
                            <div className="rate-reviews-small">
                              {/* Ajoutez vos images de notation ici */}
                            </div>
                            <span className="text-small mr-20">
                              <i className="fi-rr-marker text-mutted"></i> {item.description}
                            </span>
                          </div>
                          <div className="row align-items-end">
                            <div className="col-lg-6">
                              <NavLink to="/lists/editlist" className="btn btn-primary">
                                <i className="bi bi-pencil-square mr-5"></i>edit lists
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="divider"></div>
              
              <ListExpense expenses={data[0].expenses} />
            </div>
          ))
         )
        }
        {error && ErrorPage}
    </>
  );
}

export default Expense;
