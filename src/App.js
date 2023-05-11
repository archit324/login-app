import './App.css';
import {
  Outlet
} from "react-router-dom";
import HeaderComponent from './components/header';

function App() {
  //wrapper
  return (
    <div className="App">
      <HeaderComponent ></HeaderComponent>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
