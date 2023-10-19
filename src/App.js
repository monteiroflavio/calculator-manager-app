import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import { Route, Routes } from 'react-router';
import CalculatorManager from './pages/CalculatorManager';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Login /> }></Route>
      <Route path="manager" element={ <CalculatorManager /> }></Route>
    </Routes>
  );
}

export default App;
