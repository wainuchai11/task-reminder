import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../../type";
import { v4 as uuidv4 } from "uuid";

const initialState: CardType[] = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<CardType>) => {
      const currentDate = new Date();
      state.push({
        ...action.payload,
        id: uuidv4(),
        isChecked: false,
        status:
          new Date(action.payload.date) < currentDate ? "delayed" : "todo",
      });
      localStorage.setItem("taskList", JSON.stringify(state));

      // Log activity
      const log = `Task added: ${action.payload.id} : ${action.payload.title} - ${currentDate}`;
      const logEntry = { children: log };
      const activityLogString: string | null =
        localStorage.getItem("activityLog");
      let activityLog: { children: string }[] = [];
      if (activityLogString) {
        activityLog = JSON.parse(activityLogString);
      }
      activityLog.push(logEntry);
      localStorage.setItem("activityLog", JSON.stringify(activityLog));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const newState = state.filter((task) => task.id !== action.payload);
      let currentDate = new Date();
      localStorage.setItem("taskList", JSON.stringify(newState));

      // Log activity
      const log = `Task deleted: ${action.payload} - ${currentDate}`;
      const logEntry = { children: log };
      const activityLogString: string | null =
        localStorage.getItem("activityLog");
      let activityLog: { children: string }[] = [];
      if (activityLogString) {
        activityLog = JSON.parse(activityLogString);
      }
      activityLog.push(logEntry);
      localStorage.setItem("activityLog", JSON.stringify(activityLog));

      // Return new state
      return newState;
    },
    checkTask: (state, action: PayloadAction<string>) => {
      let taskList = localStorage.getItem("taskList");
      let currentDate = new Date();
      if (taskList) {
        state = JSON.parse(taskList);
        const taskIndex = state.findIndex((task) => task.id === action.payload);
        state[taskIndex].isChecked = !state[taskIndex].isChecked;
        state[taskIndex].status = state[taskIndex].isChecked
          ? "done"
          : new Date(state[taskIndex].date) < new Date()
          ? "delayed"
          : "todo";
        localStorage.setItem("taskList", JSON.stringify(state));

        // Log activity
        const log = `Task checked: ${action.payload} : ${state[taskIndex].title} to ${state[taskIndex].status} - ${currentDate}`;
        const logEntry = { children: log };
        const activityLogString: string | null =
          localStorage.getItem("activityLog");
        let activityLog: { children: string }[] = [];
        if (activityLogString) {
          activityLog = JSON.parse(activityLogString);
        }
        activityLog.push(logEntry);
        localStorage.setItem("activityLog", JSON.stringify(activityLog));

        return state;
      }
    },
    filterTaskStatus: (state, action: PayloadAction<string>) => {
      let taskList = localStorage.getItem("taskList");
      if (taskList) {
        state = JSON.parse(taskList);
        if (action.payload === "all") {
          return state;
        }
        return state.filter((task) => task.status === action.payload);
      }
    },
    autoUpdateDelayedTask: (state) => {
      if (state.length === 0) return state;
      let taskList = localStorage.getItem("taskList");
      let processedTasks: string[] = [];
      let currentDate = new Date();
      if (taskList) {
        state = JSON.parse(taskList);
        state.map((task) => {
          if (new Date(task.date) < new Date() && task.status !== "done") {
            task.status = "delayed";
            processedTasks.push(task.id);
          }
        });
        localStorage.setItem("taskList", JSON.stringify(state));

        // Log activity
        const log = `Task auto updated: ${processedTasks} to delayed - ${currentDate}`;
        const logEntry = { children: log };
        const activityLogString: string | null =
          localStorage.getItem("activityLog");
        let activityLog: { children: string }[] = [];
        if (activityLogString) {
          activityLog = JSON.parse(activityLogString);
        }
        activityLog.push(logEntry);
        localStorage.setItem("activityLog", JSON.stringify(activityLog));

        // Return new state
        return state;
      }
    },
    getTaskList: (state) => {
      const taskList = localStorage.getItem("taskList");
      if (taskList) {
        return JSON.parse(taskList);
      }
      return state;
    },
  },
});

export const {
  addTask,
  deleteTask,
  checkTask,
  filterTaskStatus,
  autoUpdateDelayedTask,
  getTaskList,
} = taskSlice.actions;
export default taskSlice.reducer;
