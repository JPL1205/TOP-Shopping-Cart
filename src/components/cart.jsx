import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import styles from "./cart.module.css";

export default function Cart({ show, closedCart }) {
  const { data, handleCheckOut } = useCart();

  useEffect(() => {
    const total = data.reduce((total, d) => total + Number(d.price) * d.q, 0);
    setTotal(total);
  }, [data]);

  const [total, setTotal] = useState(0);

  return (
    <div className={`${styles.cart} ${show ? styles.show : ""}`}>
      {/* <div className={`${styles.cart}`}> */}
      <div className="flex justify-between py-2 text-black font-semibold text-xl ">
        <h1 className="text-lg tracking-normal">Shopping Cart</h1>
        <button onClick={closedCart}>x</button>
      </div>
      {data.length > 0 ? (
        data.map((d) => {
          return (
            <Item
              key={d.id}
              title={d.title}
              price={d.price}
              url={d.url}
              id={d.id}
            />
          );
        })
      ) : (
        <h1 className={styles.item}>Your Cart is Currently Empty</h1>
      )}
      {data.length > 0 && (
        <Addition total={total} handleCheckOut={handleCheckOut} />
      )}
    </div>
  );
}

function Item({ id, title, price, url }) {
  const { handleRemove, handleIncDec, data } = useCart();

  const q = data.filter((d) => d.id === id)[0].q;

  const [quantity, setQuantity] = useState(q);

  function removeFromCart() {
    handleRemove(id);
  }

  function handleSelection(e) {
    const target = e.target.innerHTML;
    if ((target === "-") & (quantity > 0)) {
      setQuantity(quantity - 1);
      handleIncDec(id, target);
      console.log(data);
    } else if (target === "+") {
      setQuantity(quantity + 1);
      handleIncDec(id, target);
    }
  }

  return (
    <div className="flex gap-2 py-3">
      <div>
        <img src={url} alt="" className="w-24 h-24" />
      </div>
      <div className="flex flex-col justify-between py-2">
        <h1 className="tracking-normal font-light">{title}</h1>
        <div className="flex gap-1">
          <div className="flex">
            <button className={styles.btn} onClick={handleSelection}>
              -
            </button>
            <h1 className={styles.quantity}>{quantity}</h1>
            <button className={styles.btn} onClick={handleSelection}>
              +
            </button>
          </div>
          <button className={styles.remove} onClick={removeFromCart}>
            REMOVE
          </button>
        </div>
      </div>
      <h1 className="ml-auto">${price}</h1>
    </div>
  );
}

function Addition({ total, handleCheckOut }) {
  return (
    <div className="mt-10">
      <h1 className="text-sm mb-1 tracking-wide">
        Add gift message to packing slip
      </h1>
      <textarea
        name=""
        id=""
        cols="30"
        rows="4"
        className={styles.textarea}></textarea>
      <div className="text-end font-semibold text-slate-500">
        <h1>SUBTOTAL</h1>
        <h1>${total}.00</h1>
      </div>
      <h1 className="text-slate-500 mt-5 text-xs">
        Taxes and shipping calculated at checkout
      </h1>
      <button className={styles.checkout} onClick={handleCheckOut}>
        CHECK OUT
      </button>
    </div>
  );
}
