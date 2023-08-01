import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [numItem, setNumItem] = useState(0);
  const [data, setData] = useState([]);
  const [items, setItems] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setItems(data.products);
        const uniqueCat = [
          ...new Set(data.products.map((item) => item.category)),
        ];
        setCategory(uniqueCat);
      } catch (err) {
        console.log(err);
      }
    };

    dataFetch();
  }, []);

  function handleAddItemCart(item) {
    if (
      data.some((d) => {
        return d.id === item.id;
      })
    ) {
      console.log("true");
    } else {
      setData((prevData) => [...prevData, item]);
      setNumItem(numItem + 1);
    }
  }

  function handleIncDec(id, target) {
    let items = data.map((d) => {
      if ((d.id === id) & (target === "-")) {
        return { ...d, q: d.q - 1 };
      } else if ((d.id === id) & (target === "+")) {
        return { ...d, q: d.q + 1 };
      } else {
        return d;
      }
    });
    setData(items);
  }

  function handleRemove(id) {
    const filterData = data.filter((d) => d.id !== id);
    setData(filterData);
    setNumItem(numItem - 1);
  }

  function handleCheckOut() {
    alert("checkout Successfully");
    setData([]);
    setNumItem(0);
  }

  return (
    <CartContext.Provider
      value={{
        numItem,
        data,
        items,
        category,
        handleAddItemCart,
        handleRemove,
        handleIncDec,
        handleCheckOut,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
