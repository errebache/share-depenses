import { useContext } from "react";
import { AuthContext } from "../../../context";
import { Navigate } from "react-router-dom";

function Currency() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <div className="Currency">
          <h1>Currency</h1>
        </div>
      ) : (
        <Navigate to={"login"} />
      )}
    </>
  );
}

export default Currency;
