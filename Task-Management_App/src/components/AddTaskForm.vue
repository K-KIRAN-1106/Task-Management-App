<template>
  <div>
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <div>
        <label for="text">Name</label>
        <v-text-field label="Name" v-model="task.name" required></v-text-field>
      </div>
      <div>
        <label for="text">Description</label>
        <v-textarea clearable label="Description" v-model="task.description"></v-textarea>
      </div>
      <div>
        <label for="text">Completion Status</label>
        <div class="completion-status">
          <v-checkbox label="Completed" v-model="task.completed"></v-checkbox>
        </div>
      </div>
      <div>
        <label for="date">Deadline</label>
        <input type="date" class="date" v-model="task.deadline" required>
      </div>
      <v-btn type="submit" class="add-btn">Submit</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        name: '',
        description: '',
        completed: false,
        deadline: new Date().toISOString().split('T')[0] // Set deadline to current date in "yyyy-MM-dd" format
      }
    };
  },
  methods: {
    formatDeadline() {
      // Format the deadline to "yyyy-MM-dd" format
      return this.task.deadline ? new Date(this.task.deadline).toISOString().split('T')[0] : '';
    },
    async addTask() {
  try {
    this.task.deadline = this.formatDeadline(); // Format the deadline before submitting
    const response = await fetch('https://task-management-app-4e69c-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.task)
    });
    if (response.ok) {
      console.log('Task added successfully');
      // Reset the task object to clear input fields
      this.task = {
        name: '',
        description: '',
        completed: false,
        deadline: new Date().toISOString().split('T')[0]
      };
    } else {
      console.error('Error adding task:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}
  }
};
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: rgb(255, 255, 255);
  color: #11005c;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  color: #11005c;
}

h2 {
  font-size: 3rem;
  margin: 1rem 0;
  text-align: center;
  font-family: monospace;
  color: #11005c;
  border-color: #11005c;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
  color: #11005c;
  border-color: #11005c;
}

select {
  width: auto;
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  text-align: center;
  border: 1px solid #11005c;
  background-color: #11005c;
  color: #ffffff;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>