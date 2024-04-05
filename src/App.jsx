import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { SafortiRoutes } from "./Routes/SafortiRoutes";
import { UserProvider } from "./context/UserProvider";
import './style.css';

export const App = () => {

    return (
        <>
            <UserProvider>
                <Navbar/>
                <SafortiRoutes/>
                <Footer/>
            </UserProvider>
        </>
    );

}