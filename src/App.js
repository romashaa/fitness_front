import React, {Component, useContext, useEffect, useState} from 'react';
import './App.css';
import './components/FitnessApp.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import PrivateRoute from "./PrivateRoute";
import MyProfileComponent from "./components/MyProfileComponent";
import RationComponent from "./components/RationComponent";
import ErrorComponent from "./components/ErrorComponent";
import { Provider } from 'mobx-react';
import userStore from "./store/UserStore";
import {Context} from "./index";
import axios from "axios";

const App = () => {
    const {currentUserStore} = useContext(Context)
    useEffect(()=>{
        if(localStorage.getItem('currentUser')){
            axios.get(`myProfile/api/auth/userDto/${localStorage.getItem('currentUser')}`)
                .then(r =>{
                    const userFields = r.data;
                    currentUserStore.setCurrentUser(userFields);
                    currentUserStore.setIsAuth(true)

                })
        }
    },[])

    // useEffect(()=>{
    //         setIsLoggedIn(currentUserStore.isAuth)
    //
    // },[])
    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route path='/register' element={<RegisterComponent/>}/>
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
                    <Route path='*' element={<ErrorComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
}
export default App;