<template>
  <div class="profile-container">
    <h1>User Profile</h1>
    <div v-if="user">
      <img :src="user.avatar" alt="User Avatar" class="avatar" />
      <ul>
        <div v-for="(value, key) in user" :key="key">
          <div v-if="!excludeData.includes(key)">
            <label :for="key">{{ key }}</label>
            <input
              readonly
              class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
              :value="formatValue(value)"
            />
          </div>
        </div>
      </ul>

      <!-- Edit Profile Button -->
      <el-button type="primary" @click="goToEditProfile"
        >編輯個人資料</el-button
      >
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script setup>
const user = useState("user");
const router = useRouter();
const excludeData = ["avatar", "exists", "id"];

const goToEditProfile = () => {
  router.push("/edit_profile");
};

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return "N/A";
  }
  return String(value);
};

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

p {
  margin: 0.5rem 0;
}

h2 {
  margin-top: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 30%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>
