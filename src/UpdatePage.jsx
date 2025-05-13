import { ref, update, getDatabase } from "firebase/database";
import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useParams, useNavigate } from "react-router";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const db = getDatabase();
  const [updateTask, setUpdateTask] = useState("");
  const [taskError, setTaskError] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!updateTask) {
      setTaskError("task is required");
    } else {
      update(ref(db, `todolist/${id}`), {
        name: updateTask,
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
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
                Update Your Task
              </label>
              <input
                onChange={(e) => setUpdateTask(e.target.value)}
                type="text"
                name="name"
                id="name"
                className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border ${
                    taskError ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 p-2.5 text-sm text-gray-900`}
                placeholder="Enter Your Task"
                required=""
              />

              {taskError &&
                <MdErrorOutline className="absolute top-1/2 right-4 text-2xl text-red-500" />
              }
            </div>
          </div>
          <button
            onClick={handleUpdate}
            type="submit"
            className="text-black bg-green-400 hover:bg-green-500 border mt-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Update Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdatePage;
