import img from "../../assets/imgs/page/homepage3/screen_pay_en.png"

function StepThree() {
    return (
        <section className="section-box mt-90">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="box-image-findjob box-image-about ml-0">
                         <figure><img src={img} /></figure>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="box-info-job box-info-about pl-90">
                            <span className="text-blue text-uppercase">Step 3</span>
                            <h5 className="title-s title-b-red mb-20">Add your expenses </h5>
                            <p className="text-md mb-10">
                                Enter the type of expense you are logging in Tricount. It could be tickets, food, fuel, shopping, or anything else.
                            </p>
                            <p className="text-md mb-10">
                                Input the amount, and indicate who’s paying.
                            </p>
                            <p className="text-md mb-10">
                                Invite participants to the group so they can log their own expenses and review what others have added.
                            </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default StepThree;