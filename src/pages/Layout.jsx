import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="layout-wrapper">
                <Navbar />
                <div className="layout-content">
                    <Outlet />
                </div>
                <Footer />               
            </div>
        </ScrollToTop>
    );
};