<!-- 這頁還要再稍微改一下 -->
<template>
    <div class="edit_profile-container">
      <h1>修改資料</h1>
      <div v-if="user">
        <img :src="user.avatar" alt="User Avatar" class="avatar" />
        <p><strong>Email:</strong> 
        <input v-model="email" type="email" />
        </p>
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
  
        <!-- Edit Profile Button -->
        <Button @click="EditProfile">確認修改</Button>
      </div>
      <div v-else>
        <p>Loading user data...</p>
      </div>
    </div>
  </template>
  
  <script setup>

  const user = useState("user");
  const router = useRouter();
//   設定input框初始值
  const email = ref(user.value ? user.value.email : '');

  const { data } = useAsyncData('fetchUser', async () => {
  return user.value;
  });

  watch(data, (newData) => {
    if (newData) {
        email.value = newData.email;
    }
  });

  const EditProfile = async () => {
  try {
    const response = await fetch('/api/updateEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.value.id,
        newEmail: email.value,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error updating profile');
    }

    console.log('Profile updated successfully:', data);
    router.push('/profile');
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};


  </script>
  
  <style scoped>
  .edit_profile-container {
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
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
  }
  input {
    width: 60%;
    padding: 0.3rem;
    border: 1px solid #f3f3f3;
    border-radius: 4px;
    background-color: #f7f1e2;
    margin-top: 0.5rem;   
  }
  </style>
  