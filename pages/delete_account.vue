<template>
    <div class="delete-account-container">
      <h1>刪除帳號</h1>
      <div v-if="loading">Loading users...</div>
      <div v-else>
        <ul>
          <li v-for="user in users" :key="user.id">
            <strong>Name:</strong> {{ user.name }} <br />
            <strong>Email:</strong> {{ user.email }}
            <el-button type="danger" @click="deleteUser(user.id)">Delete</el-button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  const users = ref([]);
  const loading = ref(true);
  const router = useRouter();
  const user = useState("user");
  const params = {
    adminId: user.value.id
  };
  console.log(params)
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
      const data = await response.json();
      users.value = data;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const deleteUser = async (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
  
        users.value = users.value.filter((user) => user.id !== userId);
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };
  
  onMounted(fetchUsers);
  </script>
  
  <style scoped>
  .delete-account-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .el-button {
    margin-left: 1rem;
  }
  </style>
  