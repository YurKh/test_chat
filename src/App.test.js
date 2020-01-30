import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

window.HTMLElement.prototype.scroll = function() {};

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Header/i);
  expect(linkElement).toBeInTheDocument();
});
