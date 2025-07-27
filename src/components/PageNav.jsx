import { NavLink } from "react-router-dom";
export default function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          {/* this NavLink will add a new class 'active' when any of the link is open or active while simple Link dosen't do that so that's we use NavLink insted of Link */}
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
}
