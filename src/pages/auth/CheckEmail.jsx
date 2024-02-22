import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

function CheckEmail() {
    const { user } = useContext(AuthContext)

    return (
        <>
        { user ? (
          <Navigate to="/profil" />
        )
         : 
        (
          <section className="section-box">
          <div className="container">
            <div className="position-relative overflow-hidden radial-gradient d-flex align-items-center justify-content-center pt-120 pb-120">
              <div className="d-flex align-items-center justify-content-center w-100">
                <div className="row justify-content-center w-100">
                  <div className="col-md-8 col-lg-6 col-xl-6">
                    <div className="card mb-0">
                      <div className="card-body text-center">
                        <h4 className="text-center mb-5">tu as presque terminé</h4>
                        <p className="text-center mn-5"> nous avons envoyé un mail a : </p>
                        <span></span>
                        <p className="mb-5">Vérifié ta boite de réception ou ton dossier de spam et clique sur le lien pour vérifier ton adresse e-mail</p>
                        <button className="btn btn-secondary">renvoyer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )
      }
      </>

    )
}

export default CheckEmail;