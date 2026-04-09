const defaultTasks = [
  { id: 1, title: '5-Minute Sit & Stay', desc: 'Practice in a low-distraction room.', completed: false },
  { id: 2, title: 'Loose Leash Walking', desc: 'Walk halfway down the block and back.', completed: false },
  { id: 3, title: 'Positive Reinforcement', desc: 'Give a high-value treat for eye contact.', completed: false }
];

// Fetch saved tasks from localStorage or load defaults
let tasks = JSON.parse(localStorage.getItem('pawpathTasks')) || defaultTasks;

const taskList = document.getElementById('taskList');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    // Build the inner HTML for the list item
    li.innerHTML = `
      <div class="task-checkbox"><i class="fa-solid fa-check"></i></div>
      <div class="task-content">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
    `;
    
    // Toggle completion status when tapped
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
      updateProgress();
    });
    
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('pawpathTasks', JSON.stringify(tasks));
}

// Progress Calculation Logic
function updateProgress() {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  
  const progressCircle = document.getElementById('progressCircle');
  const progressText = document.getElementById('progressText');
  
  // Update visually via CSS conic-gradient
  progressCircle.style.background = `conic-gradient(var(--accent-color) ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
  progressText.textContent = `${percentage}%`;
}

// SPA (Single Page App) View Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('data-target');
    
    // Deactivate all
    navItems.forEach(nav => nav.classList.remove('active'));
    views.forEach(view => view.classList.remove('active'));
    
    // Activate target
    item.classList.add('active');
    document.getElementById(targetId).classList.add('active');
  });
});

// Handle navigating back to the landing page
document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Initialize the app view
renderTasks();
updateProgress();
