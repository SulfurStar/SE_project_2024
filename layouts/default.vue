<template>
  <div>
    <header>
      <nav>
        <div class="title-main">
          <NuxtLink to="/" class="title-homepage">高雄大學學生校外住宿管理系統</NuxtLink>
        </div>
        <div class="title-side">
          <NuxtLink to="/post" class="link-btn btn">Post</NuxtLink>
          <NuxtLink to="/advertisement" class="link-btn btn">AD</NuxtLink>
          <NuxtLink to="/visitation" class="link-btn btn">Visitation</NuxtLink>
          <NuxtLink to="/about" class="link-btn btn">About</NuxtLink>
        </div>
        <div class="title-login">
          <NuxtLink to="/login" class="login-btn btn">Login</NuxtLink>
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>


<script setup>
// 在這裡可以添加佈局級別的腳本設置
</script>

<style scoped>
/* 在這裡可以添加佈局級別的樣式 */

nav a { 
  margin: 0 10px;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-main{
  flex:1
}
.title-side{
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.title-login{
  display: inline-flex;
  align-items: center;
}
/* nav a.router-link-active {
  font-weight: bold;
} */
header {
  width: auto;
  background-color: #000000;
  color: white;
  padding: 10px 0;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.title-homepage {
  font-size: 2.5em;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem; 
  border-radius: 0.375rem; 
  background-color: #1f2937; 
  color: white;
  text-decoration: none;
}

.btn:hover {
  background-color: #374151; 
}

.btn:focus {
  outline: none; 
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 0 4px #6b7280; 
}

.link-btn {
  font-size: 1.5em;
  float: right;
  margin-right: 20px;
}
.login-btn {
  font-size: 1.5em;
  float: right;
  margin-right: 20px;
  background-color: #ffffff; 
  color: black;
}
</style>
