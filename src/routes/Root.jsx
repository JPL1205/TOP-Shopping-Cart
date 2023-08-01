import Navbar from "../components/Navbar";
import styles from "./Root.module.css";
import { Link, Outlet } from "react-router-dom";
import ItemLists from "../components/Items";
import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import Cart from "../components/cart";
import { useCart } from "../components/CartProvider";
import Footer from "../components/Footer";
import heroImage from "../assets/hero-img.jpeg";

export default function Root() {
  const [showCart, setShowCart] = useState(false);
  const { items } = useCart();

  const shop = useMatch("/shop");
  const about = useMatch("/about");

  function openCart() {
    showCart ? setShowCart(false) : setShowCart(true);
  }

  return (
    <div>
      <div>
        <Navbar openCart={openCart} />
        {!shop && !about ? (
          <div className="mt-20">
            <section className={styles.fullViewport}>
              <div
                className={styles.background}
                style={{ backgroundImage: `url(${heroImage})` }}></div>
              <div className={styles.content}>
                <h3 className="text-3xl z-10">AVAILABLE NOW:</h3>
                <h1 className="text-4xl font-bold pt-3 pb-8 z-10">
                  A SHOP FULL OF USED
                </h1>
                <Link to="shop">
                  <button className={styles.btn}>SHOP NOW</button>
                </Link>
              </div>
            </section>
            <section className="text-center py-2">
              <h1 className="py-5 text-2xl">All Products</h1>
              <ItemLists data={items} />
              <button className={styles.view}>
                <Link to="shop">VIEW ALL</Link>
              </button>
            </section>
          </div>
        ) : null}

        <Outlet />
      </div>
      <Cart show={showCart} closedCart={openCart} />
      <Footer />
    </div>
  );
}
