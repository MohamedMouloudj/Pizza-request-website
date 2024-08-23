import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "../ui/Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-cols-[1fr] grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="my-10 flex w-screen justify-center justify-self-center overflow-auto px-6 sm:px-24">
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
