import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "./HomePage";

describe("HomePage component", () => {
  test("renders list of students", async () => {
    render(<HomePage />);
    const listItemElements = await screen.findAllByRole("listitem", 1500);
    expect(listItemElements).toHaveLength(25);
  });

  test("renders button to show grades", async () => {
    render(<HomePage />);
    const buttonElements = await screen.findAllByRole("button");
    expect(buttonElements).not.toHaveLength(0);
  });

  test("plus button shows grades when clicked", async () => {
    render(<HomePage />);
    const buttonShowGrades = await screen.findAllByRole("button");
    userEvent.click(buttonShowGrades[0]);
    expect(screen.getByTestId("1")).toBeInTheDocument();
  });
});
