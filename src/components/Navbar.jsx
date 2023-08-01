import { Link } from "react-router-dom";
import myLogo from "../assets/MYLOGO.png";
import Icon from "../assets/icon.png";
import { useState } from "react";
import { useCart } from "./CartProvider";

export default function Navbar({ openCart }) {
  const { numItem } = useCart();

  return (
    <div className="fixed left-0 right-0 z-50 top-0 font-semibold">
      <nav className="bg-slate-50 py-2 px-4 text-black">
        <ul className="flex gap-3 text-sm items-center">
          <li className="mr-auto">
            <Link to="/">
              <img src={Icon} alt="" className="w-10" />
            </Link>
          </li>
          <li>
            <Link to="about">ABOUT</Link>
          </li>
          <li>
            <button onClick={openCart}>CART ({numItem}) </button>
          </li>
        </ul>
      </nav>
      <nav className="text-white text-sm bg-black">
        <ul className="flex gap-5 justify-center">
          <li className="py-2 px-2 hover:bg-fuchsia-50 hover:text-black">
            <Link>NEW ARRIVAL</Link>
          </li>
          <li className="py-2 px-2 hover:bg-fuchsia-50 hover:text-black">
            <Link>BRANDS &#x27B7;</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
