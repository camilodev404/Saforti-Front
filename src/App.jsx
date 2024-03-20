import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { Login } from "./Pages/Login";
import './style.css';

export const App = () => {

    return (
        <>
            <Navbar/>
            <Login/>
            <Footer/>
        </>
    );

}