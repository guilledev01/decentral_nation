import { useEffect, useState } from "react";

export default function useStorage() {
  const [storage, setStorage] = useState({
    id: undefined,
  });
  useEffect(() => {
    readLocalStorage();
  }, []);

  const readLocalStorage = () => {
    const id = window.localStorage.getItem("id");

    setStorage({
      id,
    });
  };
  return { localStorage: { storage, readLocalStorage } };
}
