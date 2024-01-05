import { useState, useEffect } from "react";

export function useLocalStorageState(initial, key) {
  const [value, setValue] = useState(function () {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initial;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
