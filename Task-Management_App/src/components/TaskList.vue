<template>
  <div>
    <v-btn @click="toggleView">{{ showCompleted ? 'View All' : 'View Completed' }}</v-btn>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Completion Status</th>
          <th>Deadline</th>
          <th>Delete Task</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td class="center-checkbox">
            <input type="checkbox"  class="check" v-model="task.completed" @change="updateCompletionStatus(task.id)">
          </td>
          <td>{{ task.deadline }}</td>
          <td>
            <v-btn @click="deleteTask(task.id)" class="delete">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const showCompleted = ref(false);
    const tasks = ref<{ id: string, name: string, description: string, completed: boolean, deadline: string }[]>([]);

    const fetchTasks = async () => {
      try {
        const response = await fetch('https://task-management-app-4e69c-default-rtdb.firebaseio.com/tasks.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        return data ? Object.keys(data).map(key => ({
          id: key,
          name: data[key].name,
          description: data[key].description,
          completed: data[key].completed,
          deadline: data[key].deadline
        })) : [];
      } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
      }
    };

    const fetchTasksData = async () => {
      tasks.value = await fetchTasks();
    };

    const deleteTask = async (taskId: string) => {
      try {
        const response = await fetch(`https://task-management-app-4e69c-default-rtdb.firebaseio.com/tasks/${taskId}.json`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        // Update tasks list after deletion
        await fetchTasksData();
        console.log('Task deleted successfully');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    const updateCompletionStatus = async (taskId: string) => {
      try {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
          const response = await fetch(`https://task-management-app-4e69c-default-rtdb.firebaseio.com/tasks/${taskId}.json`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: task.completed })
          });
          if (!response.ok) {
            throw new Error('Failed to update completion status');
          }
          console.log('Completion status updated successfully');
        }
      } catch (error) {
        console.error('Error updating completion status:', error);
      }
    };

    const filteredTasks = computed(() => {
      return showCompleted.value
        ? tasks.value.filter(task => task.completed)
        : tasks.value;
    });

    const toggleView = () => {
      showCompleted.value = !showCompleted.value;
    };

    onMounted(() => {
      fetchTasksData();
    });

    return { tasks, showCompleted, filteredTasks, toggleView, deleteTask, updateCompletionStatus };
  }
};
</script>

<style scoped>
table {
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-left: 50px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: #11005c;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

td {
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

td:hover {
  background-color: #f1f1f1;
}

tbody tr:nth-child(even) td {
  background-color: #f2f2f2;
}

tbody tr:hover td {
  background-color: #e9e9e9;
}

.center-checkbox {
  text-align: center;
}

.v-btn {
  margin-top: 10px;
  left:80%;
  background-color: #11005c;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: background-color 0.3s;
}

.v-btn:hover,
.v-btn:active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}

</style>
