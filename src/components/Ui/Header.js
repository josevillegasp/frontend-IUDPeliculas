import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
   // Función para cerrar el menú
   const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar navbar-expand-md navbar-light bg-white shadow-sm navbar-custom">
      <div className="container-fluid d-flex justify-content-between align-items-center mx-5 px5">
        <h1 className="navbar-brand m-0"><NavLink className = "nav-link" to="/">PelisIUD</NavLink></h1>
        
        {/* Botón para menú responsive */}
        <button className="navbar-toggler border-0" type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`collapse navbar-collapse  ${isOpen ? "show bg-white shadow rounded p-3 mt-2 z-3" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="fw-bold" onClick={closeMenu} exact to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="fw-bold" onClick={closeMenu} to="/genero">
                Géneros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="fw-bold" onClick={closeMenu} to="/tipo">
                Tipo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="fw-bold" onClick={closeMenu} to="/director">
                Director
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="fw-bold" onClick={closeMenu}  to="/productora">
                Productora
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

