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
        {to === "USD" ? (
          <option value="USD" disabled>
            USD
          </option>
        ) : (
          <option value="USD">USD</option>
        )}
        {to === "EUR" ? (
          <option value="EUR" disabled>
            EUR
          </option>
        ) : (
          <option value="EUR">EUR</option>
        )}
        {to === "CAD" ? (
          <option value="CAD" disabled>
            CAD
          </option>
        ) : (
          <option value="CAD">CAD</option>
        )}
        {to === "INR" ? (
          <option value="INR" disabled>
            INR
          </option>
        ) : (
          <option value="INR">INR</option>
        )}
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {from === "USD" ? (
          <option value="USD" disabled>
            USD
          </option>
        ) : (
          <option value="USD">USD</option>
        )}
        {from === "EUR" ? (
          <option value="EUR" disabled>
            EUR
          </option>
        ) : (
          <option value="EUR">EUR</option>
        )}
        {from === "CAD" ? (
          <option value="CAD" disabled>
            CAD
          </option>
        ) : (
          <option value="CAD">CAD</option>
        )}
        {from === "INR" ? (
          <option value="INR" disabled>
            INR
          </option>
        ) : (
          <option value="INR">INR</option>
        )}
      </select>
      <p>{out}</p>
    </div>
  );
}
