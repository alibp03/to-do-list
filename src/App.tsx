import Action from "./components/Actions";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import TasksProvider from "./contexts/TasksContext";

function App() {
  return (
    <TasksProvider>
      <div className=" max-w-300 h-screen mx-auto mt-28 flex gap-12 flex-col">
        <Header />

        <main>
          <Action />

          <ToDoList />
        </main>

        {/* <Modal /> */}
      </div>
    </TasksProvider>
  );
}

export default App;
