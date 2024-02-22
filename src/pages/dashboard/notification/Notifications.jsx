import { useContext } from "react";
import { AuthContext } from "../../../context";
import { Navigate } from "react-router-dom";

function Notifications() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <div className="Notifications">
          <h1>Notifications</h1>
        </div>
      ) : (
        <Navigate to={"login"} />
      )}
    </>
  );
}

export default Notifications;
