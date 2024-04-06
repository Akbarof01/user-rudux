// TaskList.js
import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../redux/actions";

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const handleUpdate = (taskId, updatedTask) => {
    updateTask(taskId, updatedTask);
    setEditingTaskId(null);
  };

  const handleEdit = (taskId, taskName) => {
    setEditingTaskId(taskId);
    setEditedTaskName(taskName);
  };

  const handleInputChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskName("");
  };

  return (
    <div className="w-[60vw]">
      <h2 className="text-4xl p-6 font-semibold text-yellow-200 pl-[300px] pt-[50px] pb-[50px]">Users</h2>
      <ul className="text-2xl p-6 border-solid border-2 border-indigo-300 rounded-lg divide-y">
        {tasks.map((task, index) => (
          <li key={task.id} className="flex gap-4">
            {editingTaskId === task.id ? (
              <>
                <input
                  className="input"
                  type="text"
                  value={editedTaskName}
                  onChange={handleInputChange}
                />
                <button
                  className="btn"
                  onClick={() =>
                    handleUpdate(task.id, { name: editedTaskName })
                  }
                >
                  Save
                </button>
                <button className="btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {index + 1}
                <div className="flex justify-between w-full">
                  {task.name}
                  <div className="flex gap-4">
                    <button
                      className="btn bg-red-500 text-[white]"
                      onClick={() => handleDelete(task.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2.5rem" viewBox="0 0 24 24"><path fill="white" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"/></svg>
                    </button>
                    <button
                      className="btn bg-cyan-600 text-[white]"
                      onClick={() => handleEdit(task.id, task.name)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 24 24"><path fill="white" d="M5 18h4.24a1 1 0 0 0 .71-.29l6.92-6.93L19.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71V17a1 1 0 0 0 1 1m9.76-13.59l2.83 2.83l-1.42 1.42l-2.83-2.83ZM6 13.17l5.93-5.93l2.83 2.83L8.83 16H6ZM21 20H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"/></svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  deleteTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
