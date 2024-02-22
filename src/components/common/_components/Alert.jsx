import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { alertActions } from "../../../_store";

export { Alert };

function Alert() {
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useSelector((x) => x.alert.value);

  useEffect(() => {
    // clear alert on location change
    dispatch(alertActions.clear());
  }, [location]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(alertActions.clear());
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  if (!alert) return null;

  return (
    <div className="container">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xl-6">
          <div className="m-3">
            <div className={`alert alert-dismissible ${alert.type}`}>
              {alert.message}
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(alertActions.clear())}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
