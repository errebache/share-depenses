import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Balance from "./balance/Balance";
import Transactions from "./transaction/Transactions";

function ListExpense({ expenses }) {
  const [activeTab, setActiveTab] = useState("transaction");
  const { idList } = useParams();

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className="section-box">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-12 mx-auto d-flex">
            <ul
              className="nav nav-pills d-flex justify-content-center text-center mx-auto mtb-15"
              id="pills-tab"
              role="tablist"
            >
              {/* Transaction Tab */}
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "transaction" ? "active" : ""
                  }`}
                  id="pills-home-tab"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "transaction"}
                  onClick={() => handleSetActiveTab("transaction")}
                >
                  Transactions
                </button>
              </li>
              {/* Balance Tab */}
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "balance" ? "active" : ""
                  }`}
                  id="pills-profile-tab"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "balance"}
                  onClick={() => handleSetActiveTab("balance")}
                >
                  Balance
                </button>
              </li>
              {/* Regleent Tab */}
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "reglement" ? "active" : ""
                  }`}
                  id="pills-contact-tab"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "reglement"}
                  onClick={() => handleSetActiveTab("reglement")}
                >
                  Reglement
                </button>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-sm-6">
              <NavLink to={`/lists/${idList}/addexpense`} className="btn btn-primary mt-2">
               <i className="bi bi-plus-circle mx-2"></i> Ajouter une dépense
            </NavLink>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="tab-content mt-30" id="pills-tabContent">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-8 col-12">
              <div
                className={`tab-pane fade ${
                  activeTab === "transaction" ? "show active" : ""
                }`}
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {expenses.map((expense, index) => (
                  <Transactions key={index} expense={expense} />
                ))}
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "balance" ? "show active" : ""
                }`}
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <Balance />
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "reglement" ? "show active" : ""
                }`}
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                Content for Contact
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListExpense;
