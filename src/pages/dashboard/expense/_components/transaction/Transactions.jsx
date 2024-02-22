import profil from "../../../../../assets/imgs/avatar/ava_1.png";

function Transactions() {
    return (
        <div className="row">
        <div className="col-lg-12 col-md-12 col-12 mx-auto">
          <div className="content-page">
            <div className="job-list-list">
              <div className="list-recent-jobs">
                <div className="card-job hover-up wow animate__animated animate__fadeIn">
                  <div className="card-job-top">
                    <div className="card-job-top--image">
                      <figure>
                        <img src={profil} />
                      </figure>
                    </div>
                    <div className="card-job-top--info">
                      <div className="row">
                        <div className="col-lg-5">
                          <h6 className="card-job-top--info-heading">
                            <a href="job-single.html">Voyage</a>
                          </h6>
                          <span className="card-job-top--location">
                            <i className="fi-rr-marker"></i> Paid by
                            you
                          </span>
                        </div>
                        <div className="col-lg-7 text-lg-end">
                          <span className="text-md font-bold ">
                            70 €
                          </span>
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
    )
}

export default Transactions;