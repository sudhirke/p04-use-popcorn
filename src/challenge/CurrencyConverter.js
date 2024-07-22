import { useEffect, useState } from "react";

//'https://api.frankfurter.app/latest?amount=100&from=USD&to=INR'

export default function CurrencyConverter() {
  //States for this componenet
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //effect functions
  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);

        const result = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );

        const data = await result.json();
        console.log(data);
        setConverted(data.rates[toCurrency]);

        setIsLoading(false);
      }

      if (fromCurrency === toCurrency) return setConverted(amount);

      convert();
    },
    [amount, fromCurrency, toCurrency]
  );

  //User interface for the componenet
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.validationMessage))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
        <option value="AED">AED</option>
        <option value="EUR">EUR</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
        <option value="AED">AED</option>
        <option value="EUR">EUR</option>
      </select>

      <p>{converted}</p>
    </div>
  );
}
