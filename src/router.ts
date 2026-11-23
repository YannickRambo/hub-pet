import { createHashRouter } from "react-router";
import Login from "./pages/Login/Login.page";
import Layout from "./pages/Layout/Layout.page";
import Dashboard from "./pages/Dashboard/Dashboard.page";
import RegisterNewClient from "./pages/RegisterNewClient/RegisterNewClient.page";
import RegisterNewService from "./pages/RegisterNewService/RegisterNewService.page";
import RegisterMedicalRecord from "./pages/RegisterMedicalRecord/RegisterMedicalRecord.page";
import Inventory from "./pages/Inventory/Inventory.page";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.page";
import ConsultClients from "./pages/ConsultClients/ConsultClients.page";
import RegisterNewSale from "./pages/RegisterNewSale/RegisterNewSale.page";
import Sales from "./pages/Sales/Sales.page";
import Schedule from "./pages/Schedule/Schedule.page";
import RegisterNewUser from "./pages/RegisterNewUser/RegisterNewUser.page";

export const router = createHashRouter([
  {
    path: "/",
    index: true,
    Component: Login,
  },
  {
    path: "forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/hub-pet",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/hub-pet/clientes/novo",
        Component: RegisterNewClient,
      },
      {
        path: "clientes/consultar",
        Component: ConsultClients,
      },
      {
        path: "/hub-pet/agendamento",
        Component: RegisterNewService,
      },
      {
        path: "/hub-pet/agenda",
        Component: Schedule,
      },
      {
        path: "/hub-pet/prontuario",
        Component: RegisterMedicalRecord,
      },
      {
        path: "/hub-pet/estoque",
        Component: Inventory,
      },
      {
        path: "/hub-pet/vendas/nova",
        Component: RegisterNewSale
      },
      {
        path: "/hub-pet/vendas",
        Component: Sales
      },
      {
        path: "/hub-pet/usuarios/novo",
        Component: RegisterNewUser
      }
    ],
  },
]);
