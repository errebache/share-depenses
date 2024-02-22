import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useLocation } from "react-router-dom";
import Homepage from "./pages/homepage/Homepege";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import AuthProvider from "./components/providers/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./_store";
import { Alert } from "./components/common/_components/Alert";
import Loading from "./components/loaders/loading";

function App() {
  return (
    <Provider store={store}>
      <Alert />
      <AuthProvider>
        <Header />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </Provider>
  );
}

export default App;
