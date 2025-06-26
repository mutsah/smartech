import { Route, Routes } from 'react-router-dom';

import { ShopContextProvider } from './context/ShopContext';
import { UserLayout } from './_root/user/UserLayout';
import { Home } from './_root/user/pages/Home';
import { Shop } from './_root/user/pages/Shop';
import { Contact } from './_root/user/pages/Contact';
import { AboutUs } from './_root/user/pages/AboutUs';
import { ViewProduct } from './_root/user/pages/ViewProduct';
import { Cart } from './_root/user/pages/Cart';
import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { AuthProvider } from './context/AuthContext';
import PasswordResetForm from './_auth/forms/PasswordResetForm';
import ResetForm from './_auth/forms/ResetForm';
import SellerDashboard from './_root/admin/pages/SellerDashboard';
import OrderSuccess from './_root/user/pages/OrderSuccess';
import OrderPaymentUpdate from './_root/user/pages/OrderPaymentUpdate';
import UserOrders from './_root/user/pages/UserOrders';

function App() {
  return (
    <>
      <AuthProvider>
        <ShopContextProvider>
          <Routes>
            <Route element={<AuthLayout></AuthLayout>}>
              <Route path="sign-in" element={<SignInForm></SignInForm>}></Route>
              <Route path="sign-up" element={<SignUpForm></SignUpForm>}></Route>
              <Route
                path="password-reset"
                element={<PasswordResetForm></PasswordResetForm>}
              ></Route>
              <Route path="reset/:reference/:email" element={<ResetForm></ResetForm>}></Route>
            </Route>

            <Route path="dashboard" element={<SellerDashboard></SellerDashboard>}></Route>

            <Route element={<UserLayout></UserLayout>}>
              <Route index element={<Home></Home>}></Route>
              <Route path="shop" element={<Shop></Shop>}></Route>
              <Route path="contact" element={<Contact></Contact>}></Route>
              <Route path="about" element={<AboutUs></AboutUs>}></Route>
              <Route path="product/:id" element={<ViewProduct></ViewProduct>}></Route>
              <Route path="cart" element={<Cart></Cart>}></Route>
              <Route path="/order-success" element={<OrderSuccess></OrderSuccess>}></Route>
              <Route
                path="/order-update/:id"
                element={<OrderPaymentUpdate></OrderPaymentUpdate>}
              ></Route>
              <Route path="/orders" element={<UserOrders></UserOrders>}></Route>
            </Route>
          </Routes>
        </ShopContextProvider>
      </AuthProvider>
    </>
  );
}
export default App;
