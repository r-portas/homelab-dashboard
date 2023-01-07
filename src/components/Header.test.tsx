import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders a heading", () => {
    render(<Header />);

    expect(screen.getByText("App Template")).toBeInTheDocument();
  });
});
