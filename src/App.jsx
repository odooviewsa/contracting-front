import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contracts from "./pages/contracts/Contracts";
import Layout from "./pages/layout";
import Projects from "./pages/projects/Projects";
import AddContracts from "./pages/contracts/AddContracts";
import FirstMainForm from "./pages/contracts/firstMainForm/FirstMainForm";
import BOQ from "./pages/contracts/BOQ/BOQ";
import Deduction from "./pages/contracts/deduction/Deduction";
import Addition from "./pages/contracts/addition/Addition";
import Summary from "./pages/contracts/summary/Summary";
import EditSingleContract from "./pages/contracts/EditSingleContract";
import { ContextProviderBOQ } from "./context/BOQContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import ProtectedAuth from "./protectedRouted/ProtectedAuth";
import Register from "./pages/register/Register";
import RegisterComplete from "./pages/register/RegisterComplete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { axiosInstance } from "./axios/axios";
import { setUser } from "./redux/features/userSlice";
import { logout } from "./utils/logout";
import Partners from "./pages/partners/Partners";
import AddProjectForm from "./pages/projects/AddProjectForm";
import ProjectDetails from "./pages/projects/ProjectDetails";
import AddUsersTanet from "./pages/userTanet/AddUsersTanet";
import UpdateProject from "./pages/projects/UpdateProject";
import WorkConfirmation from "./pages/WorkConfirmation/firstWorkConfirmation/WorkConfirmation";
import EditSingleConfirmation from "./pages/WorkConfirmation/firstWorkConfirmation/EditSingleConfirmation";
import AddConfirmation from "./pages/WorkConfirmation/addWorkConfirmation/AddConfirmation";
import ConfirmationForm from "./pages/WorkConfirmation/confirmationForm/ConfirmationForm";
import DetailsConfirmation from "./pages/WorkConfirmation/DetailsConfirmation/DetailsConfirmation";
import DeductionConfirmation from "./pages/WorkConfirmation/DeductionConfirmation/DeductionConfirmation";
import AdditionConfirmation from "./pages/WorkConfirmation/AdditionConfirmation/AdditionConfirmation";
import SummaryWorkConfirmation from "./pages/WorkConfirmation/Summary/SummaryWorkConfirmation";
import BoqTemplate from "./pages/contracts/BoqTemplate/BoqTemplate";
import BoqItem from "./pages/contracts/BoqTemplate/BoqItem";
import EstimatorPage from "./pages/estimator/EstimatorPage";
import TableEstimator from "./pages/estimator/TableEstimator";
import MaterialRequest from "./pages/materialrequest/MaterialRequest";
import ProductsManagement from "./pages/elements/products/ProductsManagement";
import UserTanetPage from "./pages/userTanet/UserTanetPage";
import MaterialRequestLayout from "./pages/materialrequest/MaterialRequestLayout";
import MaterialRequestList from "./pages/materialrequest/MaterialRequestList";
import "./i18n.js";
import { useTranslation } from "react-i18next";

function App() {
  // Multi Language
  const { i18n } = useTranslation();
  
  useEffect(() => {
    window.document.dir = i18n.dir();
    
    const languageChangeHandler = () => {
      window.document.dir = i18n.dir();
    };

    i18n.on('languageChanged', languageChangeHandler);

    return () => {
      i18n.off('languageChanged', languageChangeHandler);
    };
  }, [i18n, i18n.language]);
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await axiosInstance.get("/api/auth/checkToken");
        if (response?.data?.message === "token is valid") {
          const informUser = localStorage.getItem("inform_user");
          if (informUser) {
            dispatch(setUser(JSON.parse(informUser)));
          } else {
            await logout(dispatch);
          }
        }
      } catch {
        localStorage.removeItem("inform_user");
      }
    }
    if (user?.state === "idle") {
      checkToken();
    }
  }, [dispatch, user, user?.state]);

  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedAuth requireAuth={false}>
          <Login />
        </ProtectedAuth>
      ),
    },
    {
      path: "register",
      element: (
        <ProtectedAuth requireAuth={false}>
          <Register />
        </ProtectedAuth>
      ),
    },
    {
      path: "register_complete",
      element: (
        <ProtectedAuth requireAuth={false}>
          <RegisterComplete />
        </ProtectedAuth>
      ),
    },
    {
      path: "",
      element: (
        <ProtectedAuth requireAuth={true}>
          <Layout />
        </ProtectedAuth>
      ),
      children: [
        {
          path: `:companyName/projects`,
          element: <Projects />,
        },
        {
          path: `:companyName/projects/addproject`,
          element: <AddProjectForm />,
        },
        {
          path: `:companyName/projects/updateproject/:id`,
          element: <UpdateProject />,
        },
        {
          path: `:companyName/projects/projectdetails/:id`,
          element: <ProjectDetails />,
        },
        {
          path: `:companyName/contracts`,
          element: <Contracts />,
        },
        {
          path: `:companyName/boqTemplate`,
          element: <BoqTemplate />,
        },
        {
          path: `:companyName/boqTemplate/:id`,
          element: <BoqItem />,
        },
        {
          path: `:companyName/contracts/:contractId/edit`,
          element: <EditSingleContract />,
        },
        {
          path: `:companyName/contracts/addContract`,
          element: <AddContracts />,
          children: [
            {
              path: "",
              element: <FirstMainForm />,
            },
            {
              path: "BOQ/:id",
              element: <BOQ />,
            },
            {
              path: "deduction/:id",
              element: <Deduction />,
            },
            {
              path: "addition/:id",
              element: <Addition />,
            },
            {
              path: "summary/:id",
              element: <Summary />,
            },
          ],
        },
        {
          path: `:companyName/partners`,
          element: <Partners />,
        },
        {
          path: `:companyName/users`,
          element: <UserTanetPage />,
        },
        {
          path: `:companyName/setting`,
          element: <AddUsersTanet />,
        },

        {
          path: `:companyName/workconfirm`,
          element: <WorkConfirmation />,
        },

        {
          path: `:companyName/workconfirm/addConfirmation`,
          element: <AddConfirmation />,
          children: [
            {
              path: "",
              element: <ConfirmationForm />,
            },
            {
              path: `:workconfirm/edit`,
              element: <EditSingleConfirmation />,
            },
            {
              path: "Details/:workId/:contractId",
              element: <DetailsConfirmation />,
            },
            {
              path: "deduction/:id/:contractId",
              element: <DeductionConfirmation />,
            },
            {
              path: "addition/:id/:contractId",
              element: <AdditionConfirmation />,
            },
            {
              path: "addition/:id/:contractId",
              element: <AdditionConfirmation />,
            },
            {
              path: "summary/:id/:contractId",
              element: <SummaryWorkConfirmation />,
            },
          ],
        },
        {
          path: `:companyName/estimation`,
          element: <TableEstimator />,
        },
        {
          path: `:companyName/estimation/:id`,
          element: <EstimatorPage />,
        },
        {
          path: ":companyName/materials",
          element: <MaterialRequestLayout />,
          children: [
            {
              index: true,
              element: <MaterialRequestList />,
            },
            {
              path: "create",
              element: <MaterialRequest />,
            },
          ],
        },
        {
          path: ":companyName/productsManagemet",
          element: <ProductsManagement />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <ContextProviderBOQ>
          <RouterProvider router={route}></RouterProvider>
        </ContextProviderBOQ>
      </QueryClientProvider>
    </>
  );
}

export default App;
