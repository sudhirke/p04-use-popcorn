import React, { useState } from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
//import App from "./App";

import StarRating from "./StarRating";

// Consumer component that uses StarRating and outputs the value
function TestComponent() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating maxRating={10} color="purple" onSetRating={setMovieRating} />
      <p>This was rated {movieRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={"XXXX"} size={24} />
    <StarRating maxRating={10} color="red" size={24} defaultRating={3} />
    <TestComponent />
  </React.StrictMode>
);
