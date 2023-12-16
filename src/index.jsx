import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <App /> */}
    <StarRating maxStarts={10} />
    <StarRating maxStarts={5} color="#44873a" size={24} />
    <StarRating maxStarts={5} messages={["Terrrible", "Bad", "Okay", "Good", "Amazing"]} color="#b48a3a" size={50} />
    <StarRating maxStarts={5} messages={["Terrrible", "Bad", "Okay", "Good", "Amazing"]} color="#14ea3a" size={50} defaultRating={3} />
  </>
);
