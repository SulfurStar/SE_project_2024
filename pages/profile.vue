<template>
  <div class="profile-container mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-6">個人檔案</h1>
    <div v-if="user">
      <img :src="user.avatar" alt="User Avatar" class="avatar mx-auto mb-4" />
      <ul>
        <div v-for="(value, key) in user" :key="key">
          <div v-if="!excludeData.includes(key)" class="mb-4">
            <label :for="key" class="block text-gray-700 font-medium mb-1">{{
              key
            }}</label>
            <input
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              :value="formatValue(value)"
            />
          </div>
        </div>
      </ul>

      <!-- Edit Profile Button -->
      <button
        type="button"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        @click="goToEditProfile"
      >
        編輯個人資料
      </button>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">Loading user data...</p>
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
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
