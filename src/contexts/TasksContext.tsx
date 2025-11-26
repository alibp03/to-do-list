import {
  createContext,
  useContext,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { Task } from "../types/task";

type TasksType = Task[];

type TasksContextType = {
  allTasks: TasksType;
  dispatch: React.Dispatch<{ type: string; payload: Task }>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const TasksContext = createContext<TasksContextType | null>(null);

const initialState: TasksType = [
  {
    title: "Complete project proposal",
    description: "Finish the Q4 project proposal and send it to the team",
    createdAt: new Date().getTime(),
    id: "1",
  },
  {
    title: "do homework",
    description: "kose nne naghandri",
    createdAt: new Date().getTime() + 10,
    id: "2",
  },
  {
    title: "mirkhan kiri",
    description: "baiad madresho begam",
    createdAt: new Date().getTime() + 20,
    id: "3",
  },
];

function reducer(state: TasksType, action: { type: string; payload: Task }) {
  switch (action.type) {
    case "addItem":
      return [...state, action.payload];
    case "deleteItem":
      return state.filter((task) => task.id !== action.payload.id);
    case "editItem": {
      const editedTitle = action.payload.title;
      const editedDescription = action.payload.description;
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: editedTitle, description: editedDescription }
          : task
      );
    }

    default:
      throw new Error("action type is unknown");
  }
}

export default function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState("");

  let allTasks = tasks;

  if (query)
    allTasks = tasks.filter((task) =>
      `${task.title.toLocaleLowerCase()} ${task.description.toLocaleLowerCase()}`.includes(
        query.toLocaleLowerCase()
      )
    );

  return (
    <TasksContext.Provider value={{ dispatch, allTasks, setQuery }}>
      {children}
    </TasksContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks was used outside TaskProvider");

  return context;
}

export { useTasks };
