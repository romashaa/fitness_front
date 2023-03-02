import React, {Component, useEffect} from 'react';
import './App.css';
import './components/FitnessApp.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import PrivateRoute from "./PrivateRoute";
import WelcomeComponent from "./components/WelcomeComponent";
import MyProfileComponent from "./components/MyProfileComponent";
import RationComponent from "./components/RationComponent";
import LogoutComponent from "./components/LogoutComponent";
import ErrorComponent from "./components/ErrorComponent";
import FooterComponent from "./components/FooterComponent";
import {useLocalState} from "./util/useLocalStorage";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route path='/register' element={<RegisterComponent/>}/>
                    <Route path='/welcome/:username' element={
                        <PrivateRoute>
                            <WelcomeComponent/>
                        </PrivateRoute>
                    }/>
                    <Route path='/myProfile/:username' element={
                        <PrivateRoute>
                            <MyProfileComponent/>
                        </PrivateRoute>
                    }/>
                    <Route path='/ration' element={
                        <PrivateRoute>
                            <RationComponent/>
                        </PrivateRoute>
                    }/>
                    <Route path='/logout' element={
                        <PrivateRoute>
                            <LogoutComponent/>
                        </PrivateRoute>
                    }/>
                    <Route path='*' element={<ErrorComponent/>}/>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </div>
    );
}
export default App;