import { Suspense, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";
import Breadcrumbs from "../../components/common/_components/Breadcrumbs";
import Loading from "../../components/loaders/loading";
import DataProvider from "../../components/providers/DataProvider";


function Dashboard() {
  const { user } = useContext(AuthContext);

  return user ? (
    <main className="main">
      <Breadcrumbs />
      <DataProvider>
        <section className="section-box mt-20">
          <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
        </section>
      </DataProvider>
    </main>
  ) : (
    <Navigate to="/login" />
  );
}

export default Dashboard;
