import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useTasks } from "../contexts/TasksContext";
import Button from "../ui/Button";
import ValidationError from "../ui/ValidationError";
import Modal from "./Modal";

function AddTask() {
  const { dispatch } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: { message: "" },
    description: { message: "" },
  });

  function handleToggle() {
    setFormErrors({
      title: { message: "" },
      description: { message: "" },
    });

    setIsOpen((prev) => !prev);
  }

  function handleAddTask() {
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

    const newTask = {
      title,
      description,
      createdAt: new Date().getTime(),
      id: crypto.randomUUID(),
    };
    dispatch({ type: "addItem", payload: newTask });
    setTitle("");
    setDescription("");
    handleToggle();
  }

  return (
    <section>
      <button
        onClick={handleToggle}
        className="hover:bg-zinc-800 flex items-center gap-3 h-full rounded-2xl cursor-pointer font-semibold px-4 bg-black text-white text-2xl"
      >
        <span className="text-4xl">
          <GoPlus />
        </span>
        Add Task
      </button>

      <Modal isOpen={isOpen} onClose={handleToggle}>
        <Modal.Header>
          <h2 className="text-3xl ">Add New Task</h2>

          <h3 className="text-xl tracking-wide text-gray-500">
            Create a new task to add to your list.
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              className="focus:ring-3 focus:ring-gray-400 transition placeholder:text-2xl text-2xl w-full h-full placeholder:font-medium placeholder:tracking-wide  bg-gray-200 px-6 py-3 rounded-xl placeholder:text-gray-500 outline-0"
            />
          </div>

          <div className="self-end space-x-4">
            <Button onClick={handleToggle} variant="cancel">
              Cancel
            </Button>

            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default AddTask;
