<template>
  <div class="profile-container">
    <h1>User Profile</h1>
    <div v-if="user">
      <img :src="user.avatar" alt="User Avatar" class="avatar" />
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>

      <!-- Add other user fields as needed -->
      <div v-if="user.posts && user.posts.length">
        <h2>Posts</h2>
        <ul>
          <li v-for="post in user.posts" :key="post.id">{{ post.title }}</li>
        </ul>
      </div>
      <!-- Add similar sections for comments, advertise, etc. -->
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script setup>
const user = useState("user");
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
</style>
