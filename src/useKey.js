import { useEffect } from "react";

export function useKey(key, action) {
  //effect to listen to global keypress on the document
  useEffect(
    function () {
      //common method that will be used in useEffect and cleanup
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      //cleanup function for useEffect
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
