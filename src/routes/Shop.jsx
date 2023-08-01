import { useCart } from "../components/CartProvider";
import ItemLists from "../components/Items";
import styles from "./Shop.module.css";
import { useEffect, useState } from "react";

export default function Shop() {
  const [expandPrice, setExpandPrice] = useState(false);
  const [expandCat, setExpandCat] = useState(false);
  const [item, setItem] = useState(null);
  const [selectCat, setSelectCat] = useState(null);

  const { items, category } = useCart();

  useEffect(() => {
    setSelectCat(items);
    setItem(items);
  }, [items]);

  function handleExpandPrice() {
    expandPrice ? setExpandPrice(false) : setExpandPrice(true);
  }

  function handleExpandCat() {
    expandCat ? setExpandCat(false) : setExpandCat(true);
  }

  function refineCat(e) {
    if (e.target.className === "cat") {
      const cat = e.target.innerHTML;
      if (cat === "all") {
        setSelectCat(item);
      } else {
        const refined = item.filter((s) => s.category === cat);
        setSelectCat(refined);
      }
    } else {
      if (e.target.innerHTML === "all") {
        setSelectCat(item);
      } else {
        const price = e.target.innerHTML;
        const range = price.split(" ");
        const l = Number(range[0].replace("$", ""));
        const u = Number(range[2].replace("$", ""));
        const refined = item.filter(
          (s) => l <= Number(s.price) && Number(s.price) <= u
        );
        setSelectCat(refined);
      }
    }
  }

  return (
    <div className="mt-28 text-center px-5">
      <h1 className="text-center py-5 font-bold text-2xl">ALL PRODUCTS</h1>
      <p className="tracking-tight text-gray-500 mb-5">
        <i>
          Sale product is available online only - the inventory and prices here
          are not available at our brick-and-mortar locations.
        </i>
      </p>
      <div className="flex">
        <div className={styles.sideGroup}>
          <h1 className={styles.refine}>REFINE BY:</h1>
          <ul className="text-sm">
            <li className={styles.list}>
              <button
                className="flex justify-between w-full"
                onClick={handleExpandPrice}>
                <div>PRICE</div>
                <div>+</div>
              </button>
              {expandPrice && (
                <div className="flex flex-col mt-2">
                  <button className={styles.price} onClick={refineCat}>
                    <u>all</u>
                  </button>
                  <button className={styles.price} onClick={refineCat}>
                    <u>$0 to $50</u>
                  </button>
                  <button className={styles.price} onClick={refineCat}>
                    <u>$50 to $100</u>
                  </button>
                  <button className={styles.price} onClick={refineCat}>
                    <u>$100 and $150</u>
                  </button>
                  <button className={styles.price} onClick={refineCat}>
                    <u>$150 and 200</u>
                  </button>
                  <button className={styles.price} onClick={refineCat}>
                    <u>$200 and $500</u>
                  </button>
                  <button className={styles.price} onClick={refineCat}>
                    <u>$500 and $2000</u>
                  </button>
                </div>
              )}
            </li>
            <li className={styles.list}>
              <button
                className="flex justify-between w-full mb-2"
                onClick={handleExpandCat}>
                <div>CATEGORY</div>
                <div>+</div>
              </button>
              {expandCat && (
                <div className="flex flex-col">
                  <button className={styles.price} onClick={refineCat}>
                    <u className="cat">all</u>
                  </button>
                  {category.map((c) => (
                    <button
                      className={styles.price}
                      key={c}
                      onClick={refineCat}>
                      <u className="cat">{c}</u>
                    </button>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
        <ItemLists data={selectCat} show={30} view={true} />
      </div>
    </div>
  );
}

// function Tag
