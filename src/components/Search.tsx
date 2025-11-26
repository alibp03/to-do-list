import { GoSearch } from "react-icons/go";
import { useTasks } from "../contexts/TasksContext";

function Search() {
  const { setQuery } = useTasks();

  return (
    <section className="flex items-center  bg-gray-200  gap-5 px-6 py-3 rounded-2xl hover:ring-3 hover:ring-gray-400 transition ">
      <span>
        <GoSearch className=" text-gray-400 text-4xl" />
      </span>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks..."
        className="placeholder:text-2xl text-2xl w-full h-full placeholder:font-medium placeholder:text-gray-500 outline-0"
      />
    </section>
  );
}

export default Search;
