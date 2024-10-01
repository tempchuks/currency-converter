import "./styles.css";
import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);
  useEffect(
    function () {
      try {
        async function call() {
          setError(false);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );
          if (amount === 0) return;
          if (!Number(amount)) return;
          const data = await res.json();
          if (!data) return;
          console.log(data);
          if (data.message === "not found") {
            setResult("cannot convert same currency");
            setError(true);
            return;
          }
          const rest = await data?.rates[toCur];
          setResult(rest);
        }
        call();
      } catch (error) {
        setResult(error.message);
      }
    },
    [fromCur, toCur, amount]
  );

  return (
    <div className="App">
      <div>
        <input
          type="Number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
        <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>{error ? `${result}` : `${result} ${toCur}`}</p>
      </div>
    </div>
  );
}
