import profil from "../../../assets/imgs/avatar/ava_1.png";
import start_1 from "../../../assets/imgs/avatar/ava_1.png";
import start_2 from "../../../assets/imgs/avatar/ava_1.png";
import start_3 from "../../../assets/imgs/avatar/ava_1.png";
import start_4 from "../../../assets/imgs/avatar/ava_1.png";
import start_5 from "../../../assets/imgs/avatar/ava_1.png";
import start_6 from "../../../assets/imgs/avatar/ava_1.png";
import Transactions from "../expense/_components/Transactions";

function Activity() {


  return (
   <>
      <section className="section-box">
      <div className="box-head-single box-head-single-candidate">
        <div className="container">
          <div className="heading-image-rd online">
            <a href="#">
              <figure>
                <img src={profil} />
              </figure>
            </a>
          </div>
          <div className="heading-main-info mb-20">
            <h4>Voyage</h4>
            <div className="head-info-profile">
              <div className="rate-reviews-small">
                <span>
                  <img src={start_1} />
                </span>
                <span>
                  <img src={start_2} />
                </span>
                <span>
                  <img src={start_3} />
                </span>
                <span>
                  <img src={start_4} />
                </span>
                <span>
                  <img src={start_5} />
                </span>
                <span>
                  <img src={start_6} />
                </span>
              </div>
              <span className="text-small mr-20">
                <i className="fi-rr-marker text-mutted"></i> Chicago, US
              </span>
            </div>
            <div className="row align-items-end">
              <div className="col-lg-6">
                <button className="btn btn-default">
                  <i className="bi bi-gear mr-5"></i>edit lists
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="divider"></div>
    <Transactions />
   </>
  );
}

export default Activity;
