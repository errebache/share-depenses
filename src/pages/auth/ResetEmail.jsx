import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { forgotPassword } from "../../services/apis/users";
import { useDispatch } from "react-redux";
import { alertActions } from "../../_store";
import Loading from "../../components/loaders/loading";

function ResetEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signin, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (data) => {
    dispatch(alertActions.clear());
    setIsLoading(true);
    try {
      clearErrors();
      const email = data.email;
      await forgotPassword(email).then(() => {
        navigate('/check-email');
        dispatch(
          alertActions.success({
            message: "Registration successful",
            showAfterRedirect: true,
          })
        );
      });
    } catch (error) {
      setError("generic", { type: "generic", error });
      dispatch(alertActions.error(error.message));
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      {user ? (
        <Navigate to="/profil" />
      ) : (
        <section className="section-box">
          <div className="container">
            <div className="position-relative overflow-hidden radial-gradient d-flex align-items-center justify-content-center pt-120 pb-120">
              <div className="d-flex align-items-center justify-content-center w-100">
                <div className="row justify-content-center w-100">
                  <div className="col-md-8 col-lg-6 col-xl-6">
                    <div className="card mb-0">
                      <div className="card-body">
                        <a className="text-nowrap logo-img text-center d-block py-3 w-100">
                          {/* <img src="../assets/images/logos/dark-logo.svg" width="180" alt=""> */}
                        </a>
                        <h3 className="text-center py-5">Forgot Password</h3>
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <form onSubmit={submit}>
                          <div className="mb-4">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              {...register("email")}
                            />
                            {errors.email && (
                                <p className="form-error">
                                  <i class="form-error bi bi-exclamation-circle m-2"></i>
                                  {errors.email.message}
                                </p>
                              )}
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            {/* <a className="text-primary fw-bold">
                            Forgot Password ?
                          </a> */}
                          </div>
                          {errors.generic && (
                            <div className="mb-10">
                              <p className="form-error">
                                {errors.generic.message}
                              </p>
                            </div>
                          )}
                          <button
                            disabled={isSubmitting}
                            className="btn btn-default w-100 py-8 fs-4 mb-4 rounded-2"
                          >
                            Send
                          </button>
                          <div className="d-flex align-items-center justify-content-center">
                            <p className="fs-4 mb-0 fw-bold">ShareSpend</p>
                            <Link
                              to="/login"
                              className="text-purple fw-bold ms-2"
                            >
                              Login
                            </Link>
                          </div>
                        </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ResetEmail;
