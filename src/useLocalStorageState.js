import { useState, useEffect } from "react";

//custom hook to store watched movie in to local storage
//initialState : When nothing is stored in the storage
//key : key for storage
export function useLocalStorageState(initialState, key) {
  //Pass the function that initlizes
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
