import { Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import React from "react";
import CabinetPage from "./pages/cabinetPage/cabinetPage";
import DostavkaPage from "./pages/DostavkaPage";
import ContactsPage from "./pages/ContactsPage";
import Index from "./pages/LoginPage";
import FullProductPage from "./pages/FullProductPage";
import ErrorPage from "./pages/ErrorPage";
import OrderPageProducts from "./pages/OrderPageProducts";
import OrderPage from "./pages/OrderPage";
import SuccessPage from "./pages/SuccessPage";
import RegisterPage from "./pages/RegisterPage";


const Router = () => {
    return (
            <Routes>
                <Route exact path="/" element={ <HomePage />} />
                <Route exact path="/cabinet" element={ <CabinetPage />} />
                <Route exact path="/dostavka" element={ <DostavkaPage /> } />
                <Route exact path="/contacts" element={ <ContactsPage/> } />
                <Route exact path="/login" element={ <Index/> }/>
                <Route exact path="/register" element={ <RegisterPage/> }/>
                <Route exact path="/product/:id" element={<FullProductPage /> }/>
                <Route exact path="/order/:id" element={<OrderPageProducts /> }/>
                <Route exact path="/order" element={<OrderPage /> }/>
                <Route exact path="/success/:id" element={<SuccessPage/> }/>
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
    );
};

export default Router;