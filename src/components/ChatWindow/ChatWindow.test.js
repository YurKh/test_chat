import React from "react";
import { render, screen } from "@testing-library/react";

import ChatWindow from "./ChatWindow";

window.HTMLElement.prototype.scroll = function() {};

test("my first test", () => {
  expect(1).toEqual(1);
});

test("chat window should be in the document", () => {
  const { container } = render(<ChatWindow />);

  expect(container).toBeTruthy();
  expect(screen.getByTestId("chatWindow")).toBeInTheDocument();
});

test("chat window should contain header wrapper", () => {
  const { queryByTestId } = render(<ChatWindow />);

  expect(queryByTestId("chatHeader")).toBeInTheDocument();
});

test("chat window should contain messages wrapper", () => {
  const { queryByTestId } = render(<ChatWindow />);

  expect(queryByTestId("chatMessages")).toBeInTheDocument();
});

test("chat window should contain input wrapper", () => {
  const { queryByTestId } = render(<ChatWindow />);

  expect(queryByTestId("chatInput")).toBeInTheDocument();
});
