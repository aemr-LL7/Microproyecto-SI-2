import React from "react";
import { GeneralNavBar } from "./GeneralNavBar";
import { Outlet } from "react-router-dom";

export const RouterLayout: React.FC<object> = () => {
    return (
        <>
        <GeneralNavBar />
        <Outlet/>
        </>
    );
}