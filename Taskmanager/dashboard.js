

const isLoggedIn = localStorage.getItem('isLoggedIn');

if (!isLoggedIn || isLoggedIn !== 'true') {
    alert('Please login first!');
    window.location.href = '../login/index.html';
}

const userName = localStorage.getItem('userName') || 'User';
const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

console.log('User logged in:', userName);



function updateUserProfile() {
    const firstLetter = userName.charAt(0).toUpperCase();
    
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.textContent = firstLetter;
    }
    
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    const userEmailElement = document.querySelector('.user-email');
    if (userEmailElement) {
        userEmailElement.textContent = userEmail;
    }
    
    console.log('User profile updated:', userName, userEmail);
}

function updateGreeting() {
    const greetingTitle = document.querySelector('.greeting-title');
    if (greetingTitle) {
        const hour = new Date().getHours();
        let greeting = 'Good evening';
        
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 18) {
            greeting = 'Good afternoon';
        }
        
        greetingTitle.textContent = `${greeting}, ${userName}!`;
    }
}



function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        console.log('User logged out');
        window.location.href = '../login/index.html';
    }
}

function setupLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
        console.log('Logout button initialized');
    }
}

//function to load content

function loadContent(section) {
  console.log('Loading section:', section);
  
  const allSections = document.querySelectorAll('.content-section');
  allSections.forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSection = document.getElementById(section);
  if (activeSection) {
    activeSection.classList.add('active');
    console.log('Section displayed:', section);
  } else {
    console.error('Section not found:', section);
  }

  updateActiveLink(section);
}

function updateActiveLink(section) {
  const allLinks = document.querySelectorAll('.nav-item');
  allLinks.forEach(link => {
    const linkText = link.querySelector('.nav-text');
    if (linkText && linkText.innerText.toLowerCase() === section) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
  }
}



let tasks = [];

function loadTasksFromStorage() {
  const storedTasks = localStorage.getItem('taskmaster_tasks');
  if (storedTasks) {
    try {
      tasks = JSON.parse(storedTasks);
      console.log('Tasks loaded:', tasks.length);
      renderTasks();
      updateTaskStats();
    } catch (e) {
      console.error('Error loading tasks:', e);
      tasks = [];
    }
  }
}

function saveTasksToStorage() {
  localStorage.setItem('taskmaster_tasks', JSON.stringify(tasks));
  console.log('Tasks saved:', tasks.length);
}

function openTaskModal() {
  const taskModal = document.getElementById('taskModal');
  if (taskModal) {
    taskModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened');
  } else {
    console.error('Task modal not found');
  }
}

function closeTaskModal() {
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');
  
  if (taskModal) {
    taskModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  if (taskForm) {
    taskForm.reset();
  }
  
  console.log('Modal closed');
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function createTask(title, description, priority, dueDate) {
  return {
    id: generateId(),
    title,
    description,
    priority,
    dueDate,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function addTask(e) {
  e.preventDefault();
  
  const titleInput = document.getElementById('taskTitle');
  const descriptionInput = document.getElementById('taskDescription');
  const priorityInput = document.getElementById('taskPriority');
  const dueDateInput = document.getElementById('taskDueDate');
  
  if (!titleInput) {
    console.error('Task form inputs not found');
    return;
  }
  
  const title = titleInput.value.trim();
  const description = descriptionInput ? descriptionInput.value.trim() : '';
  const priority = priorityInput ? priorityInput.value : 'medium';
  const dueDate = dueDateInput ? dueDateInput.value : '';
  
  if (!title) {
    alert('Please enter a task title');
    return;
  }
  
  const newTask = createTask(title, description, priority, dueDate);
  tasks.unshift(newTask);
  
  saveTasksToStorage();
  renderTasks();
  updateTaskStats();
  closeTaskModal();
  
  console.log('Task added:', newTask);
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks();
    updateTaskStats();
    console.log('Task toggled:', taskId, 'completed:', task.completed);
  }
}

function deleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
      saveTasksToStorage();
      renderTasks();
      updateTaskStats();
      console.log('Task deleted:', taskId);
    }
  }
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  const taskEmptyState = document.getElementById('taskEmptyState');
  
  if (!taskList) {
    console.error('taskList element not found');
    return;
  }
  
  console.log('Rendering tasks:', tasks.length);
  
  if (tasks.length === 0) {
    taskList.classList.remove('has-tasks');
    taskList.innerHTML = '';
    if (taskEmptyState) {
      taskEmptyState.style.display = 'flex';
    }
    return;
  }
  
  taskList.classList.add('has-tasks');
  if (taskEmptyState) {
    taskEmptyState.style.display = 'none';
  }
  
  taskList.innerHTML = tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
      <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTaskCompletion('${task.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13L9 17L19 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="task-details">
        <div class="task-title">${task.title}</div>
        <div class="task-meta">
          <span class="task-priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
          ${task.dueDate ? `<span>Due: ${formatDate(task.dueDate)}</span>` : ''}
        </div>
      </div>
      
      <div class="task-actions">
        <button class="task-action-btn delete" onclick="deleteTask('${task.id}')" title="Delete task">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  console.log('Tasks rendered successfully');
}

function updateTaskStats() {
  const activeTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;
  
  console.log('Updating stats - Active:', activeTasks, 'Completed:', completedTasks);
  
  const activeTasksValue = document.getElementById('active-tasks-value');
  const completedTasksValue = document.getElementById('completed-tasks-value');
  
  if (activeTasksValue) activeTasksValue.textContent = activeTasks;
  if (completedTasksValue) completedTasksValue.textContent = completedTasks;
  
  const dashboardActiveCount = document.getElementById('active-tasks-count');
  const dashboardCompletionRate = document.getElementById('completion-rate');
  
  if (dashboardActiveCount) {
    dashboardActiveCount.textContent = activeTasks;
    const statCaption = dashboardActiveCount.nextElementSibling;
    if (statCaption && statCaption.classList.contains('stat-caption')) {
      statCaption.textContent = `${completedTasks} completed`;
    }
  }
  
  if (dashboardCompletionRate) {
    const totalTasks = tasks.length;
    const rate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    dashboardCompletionRate.textContent = `${rate}%`;
  }
}

function showTaskList() {
  const container = document.getElementById('taskListContainer');
  if (container && !document.getElementById('taskList')) {
    location.reload();
  }
}

function showAISummary() {
  const container = document.getElementById('taskListContainer');
  if (container) {
    container.innerHTML = `
      <div class="task-empty-state" style="display: flex;">
        <div class="task-empty-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3V21H21" stroke="#a5b4fc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 16L12 11L16 15L21 10" stroke="#a5b4fc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="task-empty-title">AI Summary Coming Soon</p>
        <p class="task-empty-subtitle">Get intelligent insights about your tasks</p>
      </div>
    `;
  }
}

//initinlize dashboard

document.addEventListener('DOMContentLoaded', function() {
  console.log('=== TaskMaster Initializing ===');
  
  //upodate profile and greetings
  updateUserProfile();
  updateGreeting();
  setupLogoutButton();
  
 //this will load dashboard by default
  loadContent('dashboard');
  
  const collapseBtn = document.querySelector('.collapse-btn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', toggleSidebar);
    console.log('Collapse button initialized');
  }
  
 // This will setupo quick action cards
  const quickActionCards = document.querySelectorAll('.quick-action-card');
  if (quickActionCards.length > 0) {
    quickActionCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (index === 0) {
          loadContent('tasks');
        } else if (index === 1) {
          loadContent('expenses');
        } else if (index === 2) {
          loadContent('notes');
        }
      });
    });
    console.log('Quick action cards initialized:', quickActionCards.length);
  }
  
  // Setup task modal elements
  const addTaskBtn = document.getElementById('addTaskBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelTaskBtn = document.getElementById('cancelTaskBtn');
  const taskModalOverlay = document.getElementById('taskModalOverlay');
  const taskForm = document.getElementById('taskForm');
  
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', openTaskModal);
    console.log('Add task button initialized');
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeTaskModal);
  }
  
  if (cancelTaskBtn) {
    cancelTaskBtn.addEventListener('click', closeTaskModal);
  }
  
  if (taskModalOverlay) {
    taskModalOverlay.addEventListener('click', closeTaskModal);
  }
  
  if (taskForm) {
    taskForm.addEventListener('submit', addTask);
    console.log('Task form initialized');
  }
  
 
  const taskTabs = document.querySelectorAll('.task-tab');
  if (taskTabs.length > 0) {
    taskTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        taskTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const tabType = this.getAttribute('data-tab');
        if (tabType === 'ai-summary') {
          showAISummary();
        } else {
          showTaskList();
        }
      });
    });
    console.log('Task tabs initialized');
  }
  
 //This will load tasks from local storage
  loadTasksFromStorage();
  
//excape key
  document.addEventListener('keydown', function(e) {
    const taskModal = document.getElementById('taskModal');
    if (e.key === 'Escape' && taskModal && taskModal.classList.contains('active')) {
      closeTaskModal();
    }
  });
  
  console.log('=== TaskMaster Initialization Complete ===');
});