import './App.css';
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import MainPage from './Pages/MainPage/MainPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import MyPage from './Pages/MyPage/MyPage';
import FestivalPage from './Pages/FestivalPage/FestivalPage';
import FestivalDetailPage from './Pages/FestivalDetailPage/FestivalDetailPage';
import CampingPage from './Pages/CampingPage/CampingPage';
import CampingDetailPage from './Pages/CampingDetailPage/CampingDetailPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import SearchedPage from './Pages/SearchedPage/SearchedPage';

function App() {
    const [LoginTrue, setLoginTrue] = useState(false);


    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="auth">
                        <Route path="login" element={<LoginPage setLoginTrue={setLoginTrue} />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="myPage" element={<MyPage />} />
                    </Route>
                    <Route path="camping">
                        <Route index element={<CampingPage />} />
                        <Route path=":id" element={<CampingDetailPage />} />
                    </Route>
                    <Route path="festival">
                        <Route index element={<FestivalPage />} />
                        <Route path=":id" element={<FestivalDetailPage />} />
                    </Route>
                    <Route path="search" element={<SearchedPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
