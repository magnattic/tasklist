import { MockedProvider, MockedResponse, wait } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import React from "react";
import { Appollo, EXCHANGE_RATES } from "./Apollo";

test("shows the children when the checkbox is checked", async () => {
  const currency = "USD";
  const rate = 1.73;

  const mocks: MockedResponse[] = [
    {
      request: { query: EXCHANGE_RATES },
      result: { data: { rates: [{ currency, rate }] } }
    }
  ];

  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Appollo />
    </MockedProvider>
  );

  expect(await findByText(`${currency}: ${rate}`));
});
