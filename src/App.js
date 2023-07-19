import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Public/>}/>
                <Route path="login" element={<Login/>}/>

                <Router path="dash" element={<DashLayout/>}>
                    <Route index element={<Welcome/>}/>
                </Router>
            </Route>
        </Routes>
    );
}

export default App;
