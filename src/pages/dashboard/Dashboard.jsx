import { Suspense, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";
import Breadcrumbs from "../../components/common/_components/Breadcrumbs";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return user ? (
    <main className="main">
      <Breadcrumbs />
      <section className="section-box mt-20">
          <Suspense>
            <Outlet />
          </Suspense>
      </section>
    </main>
  ) : (
    <Navigate to="/login" />
  );
}

export default Dashboard;
