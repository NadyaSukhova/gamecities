import './App.css';
import TheGame from './components/TheGame';
import WelcomePage from './components/WelcomePage';
import NoPage from './components/NoPage';
import WinPage from './components/WinPage';
import FailPage from './components/FailPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return ( 
  <div className='mt-4'>
  <BrowserRouter>
    <Routes>
      <Route
        path={"/game"}
        element={<TheGame/>}
      />
      <Route
        path={"/gamecities"}
        element={<WelcomePage/>}
      />
      <Route path="*" element={<NoPage />} />
      <Route path="/fail" search='?amount=amount&city=city&time=time' element={<FailPage />} />
      <Route path="/win" search='?amount=amount&city=city&time=time' element={<WinPage />} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
