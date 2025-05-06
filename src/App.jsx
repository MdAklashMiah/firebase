import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { getDatabase, push, ref, set } from "firebase/database";

const App = () => {
  const [task, setTask]= useState('')
  const [taskError, setTaskError] = useState('')

  const handleTask =(e)=>{
    setTask(e.target.value)
  }

const handleSubmit =(e)=>{
  e.preventDefault()
  if(!task){
    setTaskError("Task is Required")
  } else {
    setTaskError("");
    const db = getDatabase();
    set(push(ref(db, "todolist/")), {
      name: task
    }).then(()=>{
      console.log("Data send successfull")
    }).catch((err)=>{
      console.log(err)
    })
  }
}

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2 relative">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Enter Your Task
              </label>
              <input onChange={handleTask}
                type="text"
                name="name"
                id="name"
                className={`focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border ${taskError ? "border-red-500" : "border-gray-300"} bg-gray-50 p-2.5 text-sm text-gray-900`}
                placeholder="Enter Your Task"
                required=""
              />
              {taskError && (
                <MdErrorOutline className="absolute top-1/2 right-4 text-2xl text-red-500" />
              )}
            </div>
          </div>
          <button onClick={handleSubmit}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-gray-900 bg-gray-50 border border-gray-300  rounded-lg "
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
};

export default App;
