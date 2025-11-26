import { useTasks } from "../contexts/TasksContext";
import ToDoItem from "./ToDoItem";

function ToDoList() {
  const { allTasks } = useTasks();

  return (
    <section className="flex flex-col gap-6">
      {allTasks.map((task) => (
        <ToDoItem task={task} key={task.id} />
      ))}
    </section>
  );
}

export default ToDoList;
