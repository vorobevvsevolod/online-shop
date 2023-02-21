import { Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/homePage";
import React from "react";
import CabinetPage from "./components/pages/cabinetPage";
import DostavkaPage from "./components/pages/DostavkaPage";
import ContactsPage from "./components/pages/ContactsPage";


const Router = () => {
    return (
            <Routes>
                <Route path="/" element={ <HomePage />} />
                <Route path="/cabinet" element={ <CabinetPage />} />
                <Route path="/dostavka" element={ <DostavkaPage /> } />
                <Route path="/contacts" element={ <ContactsPage/> } />
            </Routes>
    );
};

export default Router;