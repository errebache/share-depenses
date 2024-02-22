import img from "../../assets/imgs/page/homepage3/travel.jpg";

function BenefitsCard() {
  return (
    <section className="section-box mt-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="box-image-findjob box-image-about ml-0">
              <figure>
                <img src={img} />
              </figure>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="box-info-job box-info-about pl-90">
              <span className="text-blue text-uppercase wow animate__animated animate__fadeInUp">
                About us
              </span>
              <h5 className="heading-36 mb-30 mt-10 wow animate__animated animate__fadeInUp">
                Simple
              </h5>
              <p className="text-md mb-10 wow animate__animated animate__fadeInUp">
                Just fill in the costs - and let the app do the maths for you.
              </p>
              <h5 className="heading-36 mt-30 mb-10 wow animate__animated animate__fadeInUp">
                Transparent
              </h5>
              <p className="text-md wow animate__animated animate__fadeInUp">
                thing is hidden. All logged expenses are visible to the group,
                and everyone can add their own.
              </p>
              <h5 className="heading-36 mt-30 mb-10 wow animate__animated animate__fadeInUp">
                Collaborative
              </h5>
              <p className="text-md wow animate__animated animate__fadeInUp">
                Tricount helps you share your lifestyle and brings you closer to
                friends, family and flatmates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsCard;
