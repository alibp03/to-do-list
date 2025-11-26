import AddTask from "./AddTask";
import Search from "./Search";

function Action() {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-5 mb-10">
      <Search />

      <AddTask />
    </div>
  );
}

export default Action;
