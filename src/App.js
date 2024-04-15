import './App.css';
import {Routes,Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import FestivalPage from './Pages/DetailPages/FestivalPage/FestivalPage';
import MainPage from './Pages/MainPage/MainPage';
import MyPage from './Pages/MyPage/MyPage';
import CampingPage from './Pages/DetailPages/CampingPage/CampingPage';

function App() {
    return (
       <>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/camping/:id" element={<CampingPage />} />
            <Route path="/festival/:id" element={<FestivalPage />} />
        </Routes>
       </>
    );
}

export default App;
