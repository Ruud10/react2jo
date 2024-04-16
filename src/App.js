import './App.css';
import {Routes,Route} from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import FestivalPage from './pages/DetailPages/FestivalPage/FestivalPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import CampingPage from './pages/DetailPages/CampingPage/CampingPage';

function App() {
    return (
       <>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/camping/:id" element={<CampingPage />} />
            <Route path="/festival/:id" element={<FestivalPage />} />
        </Routes>
       </>
    );
}

export default App;
