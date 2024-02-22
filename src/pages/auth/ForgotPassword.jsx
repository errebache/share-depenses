import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useParams, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { resetPasswordAPI } from "../../services/apis/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertActions } from "../../_store";
import Loading from "../../components/loaders/loading";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
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

  const submit = handleSubmit(async (data) => {
    dispatch(alertActions.clear());
    setIsLoading(true);
    try {
      clearErrors();
      const password = data.password;
      await resetPasswordAPI(password, userId, token).then(() => {
        navigate("/login");
        dispatch(
          alertActions.success({
            message: "Registration successful",
            showAfterRedirect: true,
          })
        );
      });
    } catch (error) {
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
        <Navigate to="/lists/profil" />
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
                              <label className="form-label">New Password</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                {...register("password")}
                              />
                              {errors.password && (
                                <p className="form-error">
                                  {errors.password.message}
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
                              Update Password
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

export default ForgotPassword;
