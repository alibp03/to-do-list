import { useState } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { useTasks } from "../contexts/TasksContext";
import type { Task } from "../types/task";
import Button from "../ui/Button";
import ValidationError from "../ui/ValidationError";
import Modal from "./Modal";

function TaskOperation({ task }: { task: Task }) {
  const {
    title: prevTitle,
    description: prevDescription,
    createdAt,
    id,
  } = task;
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useTasks();
  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);
  const [formErrors, setFormErrors] = useState({
    title: { message: "" },
    description: { message: "" },
  });
  function handleDelete() {
    dispatch({ type: "deleteItem", payload: task });
  }

  function handleToggle() {
    setFormErrors({
      title: { message: "" },
      description: { message: "" },
    });

    setIsOpen((prev) => !prev);
  }

  function handleEdit() {
    if (!title) {
      setFormErrors((prev) => ({
        ...prev,
        title: { message: "fild is required" },
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        title: { message: "" },
      }));
    }

    if (!description) {
      setFormErrors((prev) => ({
        ...prev,
        description: { message: "fild is required" },
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        description: { message: "" },
      }));
    }

    if (!description || !title) return null;

    const newTask = { title, description, createdAt, id };
    dispatch({ type: "editItem", payload: newTask });
    handleToggle();
  }

  return (
    <div className="flex gap-5">
      <button
        onClick={handleToggle}
        className="flex items-center gap-3 text-2xl font-bold cursor-pointer px-6 py-3 transition rounded-xl hover:bg-gray-200"
      >
        <span>
          <GoPencil />
        </span>
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="flex items-center gap-3 text-2xl font-bold text-rose-600 cursor-pointer px-6 transition py-3 rounded-xl hover:bg-rose-100"
      >
        <span>
          <GoTrash />
        </span>
        Delete
      </button>

      <Modal isOpen={isOpen} onClose={handleToggle}>
        <Modal.Header>
          <h2 className="text-3xl ">Edit Task</h2>

          <h3 className="text-xl tracking-wide text-gray-500">
            Make changes to your task here.
          </h3>
        </Modal.Header>

        <Modal.Body>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label
                htmlFor="title-input"
                className="text-2xl font-semibold tracking-wider"
              >
                Title
              </label>

              <ValidationError error={formErrors?.title?.message} />
            </div>
            <input
              type="text"
              name="title"
              id="title-input"
              defaultValue={prevTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="focus:ring-3 focus:ring-gray-400 transition placeholder:text-2xl text-2xl w-full h-full placeholder:font-medium placeholder:tracking-wide  bg-gray-200 px-6 py-3 rounded-xl placeholder:text-gray-500 outline-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label
                htmlFor="description-input"
                className="text-2xl font-semibold "
              >
                Description
              </label>

              <ValidationError error={formErrors?.description?.message} />
            </div>
            <textarea
              id="description-input"
              name="description"
              defaultValue={prevDescription}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              className="focus:ring-3 focus:ring-gray-400 transition placeholder:text-2xl text-2xl w-full h-full placeholder:font-medium placeholder:tracking-wide  bg-gray-200 px-6 py-3 rounded-xl placeholder:text-gray-500 outline-0"
            />
          </div>

          <div className="self-end space-x-4">
            <Button onClick={handleToggle} variant="cancel">
              Cancel
            </Button>

            <Button onClick={handleEdit}>Save Changes</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TaskOperation;
