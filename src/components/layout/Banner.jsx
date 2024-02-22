import img1 from "../../assets/imgs/page/homepage3/banner-sm1.png"
import img2 from "../../assets/imgs/page/homepage3/banner-sm2.png"
import img3 from "../../assets/imgs/page/homepage3/banner-sm3.png"
import img from "../../assets/imgs/page/homepage3/compo_en.png"

function Banner() {
    return (
        <section className="section-box">
            <div className="banner-hero banner-homepage-3">
                <div className="banner-inner">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="block-banner">
                                <span className="text-small-primary text-small-primary--disk text-uppercase  wow animate__animated animate__fadeInUp">Share Spend</span>
                                <h1 className="heading-banner wow animate__animated animate__fadeInUp">Organize expenses with your colleagues.</h1>
                                <div className="banner-description mt-30 wow animate__animated animate__fadeInUp">
                                Organize expenses with your colleagues</div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="banner-imgs">
                                <img src={img} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;