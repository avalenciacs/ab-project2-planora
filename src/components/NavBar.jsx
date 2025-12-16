import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar({ search, setSearch }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Planora logo" height="40" />
        </Link>

        {/* BOTÓN MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#planoraNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENIDO */}
        <div className="collapse navbar-collapse" id="planoraNavbar">

          {/* BUSCADOR CENTRADO (DESKTOP) */}
          <div className="mx-auto d-none d-lg-flex w-50 justify-content-center">
            <input
              type="text"
              className="form-control rounded-pill text-center"
              placeholder="Search by city (e.g. Malaga)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => {
                document
                  .getElementById("all-plans")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* LINKS + BUSCADOR MOBILE */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {/* BUSCADOR SOLO MOBILE */}
            <li className="nav-item d-lg-none mb-3">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Search by city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Plan
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
