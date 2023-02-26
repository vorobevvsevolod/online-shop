import { Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import React from "react";
import CabinetPage from "./pages/cabinetPage";
import DostavkaPage from "./pages/DostavkaPage";
import ContactsPage from "./pages/ContactsPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import FullProductPage from "./pages/FullProductPage";
import ErrorPage from "./pages/ErrorPage";


const Router = () => {
    return (
            <Routes>
                <Route exact path="/" element={ <HomePage />} />
                <Route exact path="/cabinet" element={ <CabinetPage />} />
                <Route exact path="/dostavka" element={ <DostavkaPage /> } />
                <Route exact path="/contacts" element={ <ContactsPage/> } />
                <Route exact path="/login" element={ <LoginRegisterPage/> }/>
                <Route exact path="/product/:id" element={<FullProductPage /> }/>
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
    );
};

export default Router;