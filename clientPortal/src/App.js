import logo from './logo.svg';
import './App.css';
import IGD from './views/IGD';
import INPATIENT from './views/INPATIENT';
import PHARMACY from './views/PHARMACY';
import LAB from './views/LAB';
import POLY from './views/POLY';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<IGD />}></Route>
        <Route path='/inp' element={<INPATIENT />}></Route>
        <Route path='/ph' element={<PHARMACY/>}></Route>
        <Route path='/lab' element={<LAB/>}></Route>
        <Route path='/poly' element={<POLY/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
