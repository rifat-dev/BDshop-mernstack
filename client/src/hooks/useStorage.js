import { useState, useEffect } from "react";

const useStorage = (name) => {
  const [value, setValue] = useState([]);

  const setStore = (storeName, value) => {
    localStorage.setItem(storeName, JSON.stringify(value));
  };

  useEffect(() => {
    let value = localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : [];

    setValue(value);
  }, [name, store]);

  return [store, setStore];
};

export default useStorage;
