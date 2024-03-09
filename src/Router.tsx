import React from "react";
import {Route, Routes} from 'react-router-dom';
import {Home} from "./Pages/Home/Home";
import {Login} from "./Pages/Login/Login";
import { RouterLayout } from "./common/RouterLayout";

export const AppRouter: React.FC<object> = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />

            <Route path='/' element={<RouterLayout/>}>    
                <Route path='/landing-page' element={<Home/>} />
            </Route>
            
        </Routes>
    );
}