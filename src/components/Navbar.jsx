import { NavLink, useLocation } from "react-router-dom";
function Navbar() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="flex justify-center">
      <div className="flex flex-row text-black justify-center px-1 py-1 rounded-xl gap-2 bg-gray-800 w-fit font-semibold">
        <NavLink
          to="/"
          className={`text-md bo rder px-6 py-1 rounded-lg ${
            location.pathname == "/"
              ? "bg-[var(--primary-color)]"
              : "bg-gray-800 text-white"
          }`}
        >
          {" "}
          Home{" "}
        </NavLink>
        <NavLink
          to="/pastes"
          className={`text-md bo rder px-6 py-1 rounded-lg ${
            location.pathname == "/pastes"
              ? "bg-[var(--primary-color)]"
              : "bg-gray-800 text-white"
          }`}
        >
          Pastes
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
