<template>
  <div class="delete-account-container">
    <h1>刪除帳號</h1>
    <div v-if="loading">Loading users...</div>
    <div v-else>
      <el-checkbox v-model="isAllSelected" @change="toggleAll">
        全選
      </el-checkbox>
      <ul>
        <li v-for="user in users" :key="user.id">
          <el-checkbox v-model="selectedUsers" :label="user.id">
            <strong>Name:</strong> {{ user.name }} <br />
            <strong>Email:</strong> {{ user.email }}
          </el-checkbox>
        </li>
      </ul>
      <el-button
        type="danger"
        :disabled="selectedUsers.length === 0"
        @click="deleteSelectedUsers"
      >
        刪除所選
      </el-button>
    </div>
  </div>
</template>
<script setup>
const users = ref([]);
const loading = ref(true);
const selectedUsers = ref([]);
const isAllSelected = ref(false);
const router = useRouter();
const user = useState("user");
const params = ref({ adminId: "" });

watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      params.value.adminId = newUser.id;
    }
  },
  { immediate: true }
);

const fetchUsers = async () => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.value),
    });
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

const toggleAll = () => {
  if (isAllSelected.value) {
    selectedUsers.value = users.value.map((user) => user.id);
  } else {
    selectedUsers.value = [];
  }
};

watch(selectedUsers, (newSelected) => {
  if (newSelected.length === users.value.length) {
    isAllSelected.value = true;
  } else {
    isAllSelected.value = false;
  }
});

const deleteSelectedUsers = async () => {
  if (confirm("Are you sure you want to delete the selected users?")) {
    try {
      const promises = selectedUsers.value.map((userId) =>
        fetch(`/api/users/${userId}`, {
          method: "DELETE",
        })
      );

      const results = await Promise.all(promises);
      const success = results.every((response) => response.ok);

      if (!success) {
        throw new Error("Failed to delete some users");
      }

      users.value = users.value.filter(
        (user) => !selectedUsers.value.includes(user.id)
      );
      alert("Selected users deleted successfully");
      selectedUsers.value = [];
    } catch (error) {
      console.error("Error deleting users:", error);
      alert("Error deleting users");
    }
  }
};

onMounted(fetchUsers);
definePageMeta({
  middleware: ["auth", "admin"],
});
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
