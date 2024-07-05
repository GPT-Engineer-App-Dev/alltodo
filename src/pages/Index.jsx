import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setEditingTask(id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingTask(null);
    setEditingText("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">TodoMaster</h1>
      <div className="flex mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow mr-2"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between mb-2 p-2 border rounded"
          >
            <div className="flex items-center">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleComplete(task.id)}
                className="mr-2"
              />
              {editingTask === task.id ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="mr-2"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.text}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {editingTask === task.id ? (
                <Button onClick={() => saveTask(task.id)}>Save</Button>
              ) : (
                <Button variant="outline" onClick={() => editTask(task.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button variant="outline" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;