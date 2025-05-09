import React, { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Header from './Component/Header';
import Footer from "./Component/Footer";
import Home from "./pages/Home";

import Shop from "./pages/Shop/Shop";
import ShopDetail from "./pages/Shop/ShopDetail";

import ShopCart from "./pages/Shop/ShopCart";
import ShopCheckOut from "./pages/Shop/ShopCheckOut";
import SingleShop from "./pages/store/SingleShop";
import MyAccountOrder from "./pages/Accounts/MyAccountOrder";
import MyAccountSetting from "./pages/Accounts/MyAcconutSetting";
import MyAcconutNotification from "./pages/Accounts/MyAcconutNotification";
import MyAcconutPaymentMethod from "./pages/Accounts/MyAcconutPaymentMethod";
import MyAccountAddress from "./pages/Accounts/MyAccountAddress";
import MyAccountForgetPassword from "./pages/Accounts/MyAccountForgetPassword";
import MyAccountSignIn from "./pages/Accounts/MyAccountSignIn";
import MyAccountSignUp from "./pages/Accounts/MyAccountSignUp";
import PrivateRoute from './PrivateRoute';
import ErrorPage from "@src/pages/ErrorPage";
import GlobalResetContext from "@src/context/GlobalResetContext";

function App() {
    const { resetKey } = useContext(GlobalResetContext);

    return (
        <div>
            <Router>
                <Header />

                    <Routes key={resetKey}>
                        <Route path="/" element={<Home />} />
                        {/* Shop pages */}
                        <Route path="/Shop" element={<PrivateRoute><Shop /></PrivateRoute>} />
                        <Route path="/Shop/:id" element={<ShopDetail />} />

                        <Route path="/ShopCheckOut" element={<PrivateRoute><ShopCheckOut /></PrivateRoute>} />
                        <Route path="/ShopCart" element={<PrivateRoute><ShopCart /></PrivateRoute>} />
                        {/* Store pages */}
                        <Route path="/SingleShop" element={<PrivateRoute><SingleShop /></PrivateRoute>} />
                        {/* Accounts pages */}
                        <Route path="/MyAccountOrder" element={<PrivateRoute><MyAccountOrder /></PrivateRoute>} />
                        <Route path="/MyAccountSetting" element={<PrivateRoute><MyAccountSetting /></PrivateRoute>} />
                        <Route path="/MyAcconutNotification" element={<PrivateRoute><MyAcconutNotification /></PrivateRoute>} />
                        <Route path="/MyAcconutPaymentMethod" element={<PrivateRoute><MyAcconutPaymentMethod /></PrivateRoute>} />
                        <Route path="/MyAccountAddress" element={<PrivateRoute><MyAccountAddress /></PrivateRoute>} />
                        <Route path="/MyAccountForgetPassword" element={<MyAccountForgetPassword />} />
                        <Route path="/MyAccountSignIn" element={<MyAccountSignIn />} />
                        <Route path="/MyAccountSignUp" element={<MyAccountSignUp />} />
                        {/* About pages */}

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>

                <Footer />
            </Router>
        </div>
    )
}

export default App;