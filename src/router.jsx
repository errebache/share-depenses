import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import App from "./App";
import { rootLoader } from "./components/loaders/rootLoader";
import AuthGuard from "./components/common/guard/AuthGuard";
import RedirectIfAuthenticated from "./components/common/guard/RedirectIfAuthenticated";


const Homepage = lazy(() => import("./pages/homepage/Homepege"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profil = lazy(() => import("./pages/profil/Profil"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const CheckEmail = lazy(() => import("./pages/auth/CheckEmail"));
const ValidateEmail = lazy(() => import("./pages/auth/ValidateEmail"));
const ResetEmail = lazy(() => import("./pages/auth/ResetEmail"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Lists = lazy(() => import('./pages/dashboard/lists/Lists'));
const AddList = lazy(() => import("./pages/dashboard/lists/_components/AddList"));
const Activity = lazy(() => import('./pages/dashboard/activity/Activity'));
const Groups = lazy(() => import("./pages/dashboard/groups/Groups"));
const Currency = lazy(() => import("./pages/dashboard/currency/Currency"));
const Notification = lazy(() => import("./pages/dashboard/notification/Notifications"));
const Expense = lazy(() => import("./pages/dashboard/expense/Expense"));
const ListExpense = lazy(() => import("./pages/dashboard/expense/_components/ListExpense"));
const Balance = lazy(() => import("./pages/dashboard/expense/_components/balance/Balance"));
const AddExpense = lazy( ()=> import("./pages/dashboard/expense/_components/transaction/AddExpense"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      { index: true, element: <Homepage /> },
      { path: "login", element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> },
      { path: "register", element: <RedirectIfAuthenticated><Register /></RedirectIfAuthenticated> },
      { path: "reset-password/:userId/:token", element: <ForgotPassword /> },
      { path: "forgot-password", element: <ResetEmail /> },
      { path: "check-email", element: <CheckEmail /> },
      { path: "validate-email/:userId?/:email?", element: <ValidateEmail /> },
      {
        path: "lists",
        element: <Dashboard />,
        children: [
          { index: true, element: <Lists />, title: 'lists'},
          { path:'addlist', element: <AddList /> , title: 'Ajouter'},
          { 
            path:'expense', 
            element: <Expense /> , 
            title: 'expense', 
            children: [
              {index:true,element:<ListExpense/> , title:'Liste d\'expenses'},
              {path: 'balance', element: <Balance /> , title: 'Balance'}
            ]
          },
          {path: 'addexpense', element: <AddExpense /> , title: 'Add transaction'},
          { path: "activity", element: <Activity /> , title: 'activity'},
          { path: "profil/:userId?/:email?", element: <Profil />, title: 'profil'},
          { path: "groups", element: <Groups />, title: 'groups' },
          { path: "notification", element: <Notification />, title: 'notification' },
          { path: "currency", element: <Currency />, title: 'currency' },
        ],
      },
    ],
  },
]);

export default router;
