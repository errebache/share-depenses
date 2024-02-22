function FeatureList() {
  return (
    <section className="section-box">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-7">
            <h2 className="section-title mt-50 mb-20">Key features</h2>
            <p className="text-md-lh28 color-black-5">
              Find the type of work you need, clearly defined and ready to
              start. Work begins as soon as you purchase and provide
              requirements.
            </p>
          </div>
        </div>
        <div className="row mt-60">
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-md-30">
            <div
              className="card-none-bd hover-up wow animate__animated animate__fadeInUp"
              data-wow-delay=".0s"
            >
              <div className="block-image">
                <figure>
                  <img
                    alt="jobhub"
                    src="assets/imgs/page/services/ready-project.svg"
                  />
                </figure>
              </div>
              <div className="card-info-bottom">
                <h3>
                  <span className="count">15</span>00+
                </h3>
                <strong>Ready perfect jobs</strong>
                <p className="text-mutted">A place to think and track ideas</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-md-30">
            <div
              className="card-none-bd hover-up wow animate__animated animate__fadeInUp"
              data-wow-delay=".1s"
            >
              <div className="block-image">
                <figure>
                  <img
                    alt="jobhub"
                    src="assets/imgs/page/services/candidate-call.svg"
                  />
                </figure>
              </div>
              <div className="card-info-bottom">
                <h3>
                  <span className="count">8</span>00K
                </h3>
                <strong>Candidate calls</strong>
                <p className="text-mutted">A place to think and track ideas</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-md-30">
            <div
              className="card-none-bd hover-up wow animate__animated animate__fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="block-image">
                <figure>
                  <img
                    alt="jobhub"
                    src="assets/imgs/page/services/job-posted.svg"
                  />
                </figure>
              </div>
              <div className="card-info-bottom">
                <h3>
                  <span className="count">12</span>00
                </h3>
                <strong>Jobs posted</strong>
                <p className="text-mutted">A place to think and track ideas</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <div
              className="card-none-bd hover-up wow animate__animated animate__fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="block-image">
                <figure>
                  <img
                    alt="jobhub"
                    src="assets/imgs/page/services/complete-jobs.svg"
                  />
                </figure>
              </div>
              <div className="card-info-bottom">
                <h3>
                  <span className="count">6</span>00K
                </h3>
                <strong>Complete Jobs</strong>
                <p className="text-mutted">A place to think and track ideas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureList;
