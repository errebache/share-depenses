import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { useDispatch } from "react-redux";
import { alertActions } from "../../_store";
import Loading from "../../components/loaders/loading";

function Login() {
  const dispatch = useDispatch();
  const { signin, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/lists" } };


  const validationSchema = yup.object({
    email: yup.string().required("Email is required").email("Invalid Email"),
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
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

  const submit = handleSubmit(async (credentials) => {
    dispatch(alertActions.clear());
    setIsLoading(true);
    try {
      clearErrors();
      console.log(credentials);
      await signin(credentials);
    } catch (error) {
      console.log('%c Error','font-size:20px;color:red', error);
      dispatch(
        alertActions.error({ message: error.message, showAfterRedirect: true })
      );
      setError("generic", { type: "generic", error });
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
                        <h3 className="text-center">Login</h3>
                        {isLoading ? (
                          <Loading />
                        ) : (
                          <form onSubmit={submit}>
                            <div className="mb-3">
                              <label className="form-label">Username</label>
                              <input
                                type="email"
                                className={`form-control ${
                                  errors.email ? "input-error" : ""
                                }`}
                                name="email"
                                {...register("email")}
                              />
                              {errors.email && (
                                  <p className="form-error">
                                    <i className="form-error bi bi-exclamation-circle m-2"></i>
                                    {errors.email.message}
                                  </p>
                              )}
                            </div>
                            <div className="mb-4">
                              <label className="form-label">Password</label>
                              <input
                                type="password"
                                className={`form-control ${
                                  errors.password ? "input-error" : ""
                                }`}
                                name="password"
                                {...register("password")}
                              />
                              {errors.password && (
                                <p className="form-error">
                                  <i class="form-error bi bi-exclamation-circle m-2"></i>
                                  {errors.password.message}
                                </p>
                              )}
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                              <div className="form-check">
                                <input
                                  className="form-check-input primary"
                                  type="checkbox"
                                  value=""
                                />
                                <label className="form-check-label text-dark">
                                  Remeber this Device
                                </label>
                              </div>
                              <Link
                                to="/forgot-password"
                                className="text-purple fw-bold"
                              >
                                Forgot Password ?
                              </Link>
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
                              Sign In
                            </button>
                            <div className="d-flex align-items-center justify-content-center">
                              <p className="fs-4 mb-0 fw-bold">ShareSpend</p>
                              <Link
                                to="/register"
                                className="text-purple fw-bold ms-2"
                              >
                                Create an account
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

export default Login;
