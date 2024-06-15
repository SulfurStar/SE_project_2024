<template>
    <div class="edit-account-container">
      <h1>Edit Account</h1>
      <div v-if="loading">Loading users...</div>
      <div v-else>
        <ul>
          <li v-for="user in users" :key="user.id">
            <strong>Name:</strong> {{ user.name }} <br />
            <strong>Email:</strong> {{ user.email }}
            <el-button type="primary" @click="editUser(user.id)">Edit</el-button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  const user = useState("user");
  const users = ref([]);
  const loading = ref(true);
  const router = useRouter();
  const params = {
    adminId: user.value.id
  };
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
  
    const editUser = (userId) => {
        router.push(`/edit_user/${userId}`);
    };
  
  onMounted(fetchUsers);
  </script>
  
  <style scoped>
  .edit-account-container {
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
  