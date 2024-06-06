import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders todo app", () => {
  render(<App />);
  const linkElement = screen.getByText(/todos/i);
  expect(linkElement).toBeInTheDocument();
});

test("can add and complete tasks", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.click(screen.getByText("Add"));

  expect(screen.getByText("Test Task")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("checkbox"));
  expect(screen.getByRole("checkbox")).toBeChecked();
});

test("can delete tasks", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.change(input, { target: { value: "Task to Delete" } });
  fireEvent.click(screen.getByText("Add"));

  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);

  expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
});

test("can filter tasks", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.change(input, { target: { value: "Active Task" } });
  fireEvent.click(screen.getByText("Add"));

  fireEvent.change(input, { target: { value: "Completed Task" } });
  fireEvent.click(screen.getByText("Add"));

  const checkboxes = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxes[1]);

  fireEvent.click(screen.getByText("Active"));
  expect(screen.getByText("Active Task")).toBeInTheDocument();
  expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Completed"));
  expect(screen.queryByText("Active Task")).not.toBeInTheDocument();
  expect(screen.getByText("Completed Task")).toBeInTheDocument();

  fireEvent.click(screen.getByText("All"));
  expect(screen.getByText("Active Task")).toBeInTheDocument();
  expect(screen.getByText("Completed Task")).toBeInTheDocument();
});

test("can clear completed tasks", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.change(input, { target: { value: "Task to Complete" } });
  fireEvent.click(screen.getByText("Add"));

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  fireEvent.click(screen.getByText("Clear completed"));
  expect(screen.queryByText("Task to Complete")).not.toBeInTheDocument();
});

test("saves and loads tasks from local storage", () => {
  const tasks = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
  ];
  localStorage.setItem("tasks", JSON.stringify(tasks));

  render(<App />);

  expect(screen.getByText("Task 1")).toBeInTheDocument();
  expect(screen.getByText("Task 2")).toBeInTheDocument();

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes[0]).not.toBeChecked();
  expect(checkboxes[1]).toBeChecked();
});
