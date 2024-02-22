import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertActions } from "../../_store";
import Loading from "../../components/loaders/loading";
import { signup } from "../../services/apis/auth";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Too short")
      .max(50, "Too long"),
    email: yup.string().required("Email is required").email("Invalid Email"),
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
    name: "",
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
      await signup(credentials).then(() => {
        navigate("/login");
        dispatch(
          alertActions.success({
            message: "Registration successful",
            showAfterRedirect: true,
          })
        );
      });
    } catch (error) {
      dispatch(alertActions.error(error.message));
      setError("generic", { type: "generic",error });
    } finally {
      setIsLoading(false);
    }
  });
  return (
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
                    <h3 className="text-center">Register</h3>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <form onSubmit={submit}>
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            {...register("name")}
                          />
                          {errors.name && (
                            <p className="form-error">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="form-error">{errors.email.message}</p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Password</label>
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
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="btn btn-default w-100 py-8 fs-4 mb-4 rounded-2"
                        >
                          Sign Up
                        </button>
                        <div className="d-flex align-items-center justify-content-center">
                          <p className="fs-4 mb-0 fw-bold">
                            Already have an Account?
                          </p>
                          <Link
                            className="text-purple fw-bold ms-2"
                            to="/login"
                          >
                            Sign In
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
  );
}

export default Register;
