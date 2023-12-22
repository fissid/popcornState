// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [out, setOut] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function callConvertor() {
        try {
          const res = await fetch(`https://api.frankfurter.app/latest?amount=${inputValue}&from=${from}&to=${to}`, { signal: controller.signal });
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          setOut(data.rates[to]);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        }
      }

      if (from === to) return setOut(inputValue);
      callConvertor();

      return function () {
        console.log("return");
        controller.abort();
      };
    },
    [inputValue, from, to]
  );

  return (
    <div style={{ fontSize: "50px" }}>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD" disabled={to === "USD" && true}>
          USD
        </option>
        <option value="EUR" disabled={to === "EUR" && true}>
          EUR
        </option>
        <option value="CAD" disabled={to === "CAD" && true}>
          CAD
        </option>
        <option value="INR" disabled={to === "INR" && true}>
          INR
        </option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD" disabled={from === "USD" && true}>
          USD
        </option>
        <option value="EUR" disabled={from === "ERU" && true}>
          EUR
        </option>
        <option value="CAD" disabled={from === "CAD" && true}>
          CAD
        </option>
        <option value="INR" disabled={from === "INR" && true}>
          INR
        </option>
      </select>
      <p>
        {out} {to}
      </p>
    </div>
  );
}
