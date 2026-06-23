import { Task, TaskStatus } from './types';
import { addTask, filterByProperty } from './taskUtils';

// Local State for storing tasks
let tasksList: Task[] = [];

export const initTaskUI = () => {
  // Main Container element dhoondna ya banana
  const app = document.getElementById('app') || document.body;
  
  // HTML Structure create karna
  app.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; max-width: 500px;">
      <h2>DownLabs Task Module (Lab 2 Minimal UI)</h2>
      
      <div style="margin-bottom: 20px;">
        <input type="text" id="taskTitle" placeholder="Enter task title..." style="padding: 8px; margin-right: 10px; width: 200px;" />
        <select id="taskStatus" style="padding: 8px; margin-right: 10px;">
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button id="addBtn" style="padding: 8px 15px; cursor: pointer;">Add Task</button>
      </div>

      <ul id="listContainer"></ul>
    </div>
  `;

  const addBtn = document.getElementById('addBtn');
  const taskTitle = document.getElementById('taskTitle') as HTMLInputElement;
  const taskStatus = document.getElementById('taskStatus') as HTMLSelectElement;
  const listContainer = document.getElementById('listContainer');

  // List ko screen par render karne ka function
  const renderTasks = (tasksToRender: Task[]) => {
    if (!listContainer) return;
    listContainer.innerHTML = tasksToRender.map(task => `
      <li style="margin-bottom: 5px;">
        <strong>${task.title}</strong> - <span style="color: blue;">${task.status}</span>
      </li>
    `).join('');
  };

  // Button Click event
  addBtn?.addEventListener('click', () => {
    const title = taskTitle.value;
    const status = taskStatus.value as TaskStatus;

    const newTask: Task = {
      id: Math.random().toString(),
      title: title,
      description: 'Lab 2 Pure TS UI Task',
      status: status,
      priority: 'MEDIUM',
      createdAt: new Date()
    };

    // Hamara pure function call ho raha hai
    const response = addTask(tasksList, newTask);

    if (response.success && response.data) {
      tasksList = response.data;
      renderTasks(tasksList);
      taskTitle.value = ''; // Input clear
    } else if (response.error) {
      alert(response.error.message);
    }
  });
};