import { PrimeraFila } from "./PrimeraFila";
import { SegundaFila } from "./SegundaFila";

export const Navbar = () => {
    return (
        <div className="nav-bar">
            <PrimeraFila/>
            <SegundaFila/>
        </div>
    );
}