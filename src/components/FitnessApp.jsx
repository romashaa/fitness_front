import React, {useState} from 'react';
import {BrowserRouter, Link, Route, Routes, Navigate} from "react-router-dom";
import './FitnessApp.css'
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, {useAuth} from './security/AuthContex.js'
import RationComponent from "./RationComponent";
import MyProfileComponent from "./MyProfileComponent";

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/"/>
}

const FitnessApp = () => {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/myProfile/:username' element={
                            <AuthenticatedRoute>
                                <MyProfileComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/ration' element={
                            <AuthenticatedRoute>
                                <RationComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='*' element={<ErrorComponent/>}/>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>

        </div>
    );
};




export default FitnessApp;