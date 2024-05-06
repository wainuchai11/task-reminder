import { CardType, Option } from "./type";

export const Options: Option[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "todo",
    label: "To Do",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "delayed",
    label: "Delayed",
  },
];

export const TodoData: CardType[] = [
  {
    id: "1",
    title: "Task 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2021-09-01",
    status: "todo",
    isChecked: false,
  },
  {
    id: "2",
    title: "Task 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2021-09-01",
    status: "todo",
    isChecked: false,
  },
  {
    id: "3",
    title: "Task 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2021-09-01",
    status: "done",
    isChecked: true,
  },
  {
    id: "4",
    title: "Task 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2021-09-01",
    status: "delayed",
    isChecked: false,
  },
];
