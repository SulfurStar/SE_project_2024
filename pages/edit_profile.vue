<template>
  <div class="edit-profile-container">
    <h1>Edit Profile</h1>
    <form @submit.prevent="updateProfile">
      <div v-for="(value, key) in user" :key="key">
        <div v-if="!excludeKeys.includes(key)">
          <label :for="key">{{ key }}</label>
          <input :id="key" v-model="user[key]" />
        </div>
      </div>
      <button type="submit">確認修改</button>
    </form>
  </div>
</template>
<script setup>
const user = useState("user");
const router = useRouter();
const excludeKeys = ["avatar", "exists", "role"];

if (user.value.role === "STUDENT") {
  excludeKeys.push("name");
  excludeKeys.push("email");
}

const updateProfile = async () => {
  try {
    const response = await fetch("/api/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.value),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();

    console.log("Profile updated successfully:", data);

    router.push("/profile"); // 更新完成后跳转回个人资料页面
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
</script>
<style scoped>
.edit-profile-container {
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

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
}

input {
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  margin-top: 2rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
