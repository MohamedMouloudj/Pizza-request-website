import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

// const Home = lazy(() => import("./ui/Home"));
import Home from "./ui/Home";
// const Menu = lazy(() => import("./features/menu/Menu"));
import Menu, { Loader as menuLoader } from "./features/menu/Menu";
// const Cart = lazy(() => import("./features/cart/Cart"));
import Cart from "./features/cart/Cart";
// const CreateOrder = lazy(() => import("./features/order/CreateOrder"));
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
// const Order = lazy(() => import("./features/order/Order"));
import Order, { orderLoader } from "./features/order/Order";
import Error from "./ui/Error";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
