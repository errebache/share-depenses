import Banner from "../../components/layout/Banner";
import BenefitsCard from "../../components/layout/BenefitsCard";
import FeatureList from "../../components/layout/FeatureList";
import StepOne from "../../components/layout/StepOne";
import StepThree from "../../components/layout/StepThree";
import StepTwo from "../../components/layout/StepTwo";

function Homepage() {
    return (
        <div>
            <Banner />
            <BenefitsCard />
            <FeatureList />
            <StepOne />
            <StepTwo />
            <StepThree />
        </div>
    )
}

export default Homepage;