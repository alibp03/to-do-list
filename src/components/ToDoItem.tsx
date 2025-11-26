import type { Task } from "../types/task";
import TaskOperation from "./TaskOperation";

function ToDoItem({ task }: { task: Task }) {
  const { title, description, createdAt } = task;
  const time = new Date(createdAt);

  return (
    <article className="flex flex-col w-ful gap-3 px-7 py-9 border border-gray-200 rounded-xl hover:shadow-lg transition">
      <div className="flex justify-between">
        <h2 className="text-3xl ">{title}</h2>

        <TaskOperation task={task} />
      </div>

      <p className="mb-2.5 text-2xl text-gray-600 max-h-40 overflow-y-auto">
        {description}
      </p>

      <time
        dateTime={time.toLocaleDateString()}
        className="text-2xl text-gray-400"
      >
        {`${time.toLocaleString("en-US", {
          month: "short",
        })} ${time.getDate()}, ${time.getFullYear()}`}
      </time>
    </article>
  );
}

export default ToDoItem;
