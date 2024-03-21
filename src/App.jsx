import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { SafortiRoutes } from "./Routes/SafortiRoutes";
import './style.css';

export const App = () => {

    return (
        <>
            <Navbar/>
            <SafortiRoutes/>
            <Footer/>
        </>
    );

}