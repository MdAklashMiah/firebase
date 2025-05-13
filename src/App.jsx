import React, { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
} from "firebase/database";
import { useNavigate } from "react-router";

const App = () => {
  const [task, setTask] = useState("");
  const [taskError, setTaskError] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getDatabase();
  const navigate = useNavigate();

  const handleTask = (e) => {
    setTask(e.target.value);
  };
  // Create Data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      setTaskError("Task is Required");
    } else {
      setTaskError("");
      const db = getDatabase();
      set(push(ref(db, "todolist/")), {
        name: task,
      })
        .then(() => {
          setTask("");
          console.log("Data send successfull");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Read Data
  function fetchTodolist() {
    const todolistRef = ref(db, "todolist/");
    onValue(todolistRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
        setLoading(false);
      });
      setTasklist(arr);
    });
  }

  useEffect(() => {
    fetchTodolist();
  }, []);

  const handleDelete = (id) => {
    remove(ref(db, "todolist/" + id));
    console.log("deleted", id);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <section className="h-screen bg-cyan-600">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h1 className="text-3xl border-b-4 pb-2 text-center font-semibold mb-5">CRUD Operations</h1>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2 relative">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Enter Your Task
                </label>
                <input
                  onChange={handleTask}
                  type="text"
                  name="name"
                  id="name"
                  value={task}
                  className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border ${
                    taskError ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 p-2.5 text-sm text-gray-900`}
                  placeholder="Enter Your Task"
                  required=""
                />
                {taskError && (
                  <MdErrorOutline className="absolute top-1/2 right-4 text-2xl text-red-500" />
                )}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-gray-900 bg-gray-50 border border-gray-300  rounded-lg "
            >
              Add Task
            </button>
          </form>

          <div className="max-w-2xl mx-auto border border-gray-300 bg-gray-50 rounded-xl mt-5 p-5">
            {loading ? (
              <div
                role="status"
                className="p-4 rounded-sm shadow-sm animate-pulse "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200" />
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-12" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200" />
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-12" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200" />
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-12" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200" />
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-12" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200" />
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-12" />
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <ul>
                {tasklist.map((item, i) => (
                  <li className="flex items-center justify-between font-medium border-b-4 border border-gray-200 p-2">
                    <span className="w-1/2">
                      {i + 1}. {item.name}{" "}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      type="button"
                      className="text-white bg-red-500 hover:bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 "
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(item.id)}
                      type="button"
                      className="text-white bg-blue-500 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 "
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
