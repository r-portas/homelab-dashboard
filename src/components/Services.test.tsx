import { render, screen } from "@testing-library/react";
import Services from "./Services";
import { useUiServices, Service } from "../consul";

jest.mock("../consul");
jest.mock("next/router", () => require("next-router-mock"));

const mockData: Service[] = [
  {
    name: "Test service",
    tags: ["ui"],
    icon: "fa-test",
    url: "localhost:2000",
    address: "localhost",
    port: 2000,
    healthy: true,
    checks: [],
  },
];

(useUiServices as jest.Mock).mockReturnValue({
  data: mockData,
});

describe("Services", () => {
  test("displays the fields", () => {
    render(<Services />);

    expect(screen.getByText("Test service")).toBeInTheDocument();

    expect(screen.getByText("Visit")).toBeInTheDocument();
  });
});
