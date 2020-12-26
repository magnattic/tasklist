import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import React from "react";

export const EXCHANGE_RATES = gql`
  {
    rates(currency: "EUR") {
      currency
      rate
    }
  }
`;

export const Appollo: React.FC = () => {
  const { loading, error, data } = useQuery<{
    rates: { currency: string; rate: number }[];
  }>(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data!.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ))}
    </>
  );
};
