import { useNavigate, useParams } from "react-router-dom";
import profil from "../../../../../assets/imgs/avatar/ava_1.png";

function Transactions({expense}) {
  const { idList } = useParams();
  const navigate = useNavigate();

  function detailExpense(_id) {
    console.log(idList);
    navigate(`/lists/${idList}/transactions/${_id}`);
  }  

  return (
    <div className="row" onClick={()=>detailExpense(expense._id)}>
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div className="content-page">
          <div className="job-list-list">
            <div className="list-recent-jobs">
              <div className="card-job">
                <div className="card-job-top">
                  <div className="card-job-top--image">
                    <figure>
                      <img src={expense.image} />
                    </figure>
                  </div>
                  <div className="card-job-top--info">
                    <div className="row">
                      <div className="col-lg-8">
                        <h6 className="card-job-top--info-heading">
                          <span>{expense.description}</span>
                        </h6>
                        <span className="card-job-top--location">
                          <i className="fi-rr-marker"></i> Paid by you
                        </span>
                      </div>
                      <div className="col-lg-4 text-lg-end">
                        <span className="text-md font-bold">{expense.amount} €</span>
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
  );
}

export default Transactions;
