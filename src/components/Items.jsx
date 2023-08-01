import { useState } from "react";
import styles from "./Items.module.css";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

const ItemLists = ({ data, show = 10, view = false, col = 5 }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-${col} flex-1`}>
      {data &&
        data.slice(0, show).map((d) => {
          const title = d.title;
          const price = d.price;
          const url = d.images[0];
          return (
            <Item
              key={d.id}
              id={d.id}
              title={title}
              price={price}
              url={url}
              view={view}
            />
          );
        })}
    </div>
  );
};

const Item = ({ id, title, price, url, view }) => {
  const [quantity, setQuantity] = useState(0);
  const { handleAddItemCart } = useCart();

  function handleAdd() {
    if (quantity > 0) {
      handleAddItemCart({
        id: id,
        title: title,
        url: url,
        price: price,
        q: quantity,
      });
    }
  }
  function handleInc() {
    setQuantity(quantity + 1);
  }

  function handleDec() {
    quantity > 0 && setQuantity(quantity - 1);
  }

  return (
    <Link className={styles.item}>
      <button key={id}>
        <div className="flex justify-center">
          <img src={url} alt="" className={styles.product} />
        </div>
        <h3 className="font-semibold tracking-normal text-lg mt-3">{title}</h3>

        {view ? (
          <div>
            <p className="text-xs mt-3">${price}</p>
            <div className="flex justify-center mt-5">
              <button onClick={handleDec} className={styles.q}>
                -
              </button>
              <div className={styles.q}>{quantity}</div>
              <button onClick={handleInc} className={styles.q}>
                +
              </button>
            </div>
            <button onClick={handleAdd} className={styles.btn}>
              ADD TO CART
            </button>
          </div>
        ) : (
          <></>
        )}
      </button>
    </Link>
  );
};

export default ItemLists;
