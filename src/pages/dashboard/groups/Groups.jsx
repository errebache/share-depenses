import { useContext } from "react";
import { AuthContext } from "../../../context";
import { Navigate } from "react-router-dom";

function Groups() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <div className="Groups">
          <h1>Groups</h1>
        </div>
      ) : (
        <Navigate to={"login"} />
      )}
    </>
  );
}

export default Groups;
