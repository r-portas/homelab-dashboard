import { render, screen } from "@testing-library/react";
import SystemOverview from "./SystemOverview";
import { useSystemOverview } from "../prometheus";

jest.mock("../prometheus");

(useSystemOverview as jest.Mock).mockReturnValue({
  data: {
    cpu: 10.5,
    memory: 5.1,
    rootFilesystem: 8,
    media: 1,
    apps: 2,
    uptime: 600,
  },
});

describe("SystemOverview", () => {
  test("displays the fields", () => {
    render(<SystemOverview />);

    expect(screen.getByText("System Overview")).toBeInTheDocument();

    expect(screen.getByText("CPU Usage")).toBeInTheDocument();
    expect(screen.getByText("10.5%")).toBeInTheDocument();

    expect(screen.getByText("Memory Usage")).toBeInTheDocument();
    expect(screen.getByText("5.1%")).toBeInTheDocument();

    expect(screen.getByText("Root Filesystem")).toBeInTheDocument();
    expect(screen.getByText("8%")).toBeInTheDocument();

    expect(screen.getByText("Media Filesystem")).toBeInTheDocument();
    expect(screen.getByText("1%")).toBeInTheDocument();

    expect(screen.getByText("Apps Filesystem")).toBeInTheDocument();
    expect(screen.getByText("2%")).toBeInTheDocument();

    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("10 minutes")).toBeInTheDocument();
  });
});
