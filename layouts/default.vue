<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/" class="title-homepage">高雄大學學生校外住宿管理系統</NuxtLink>
        <NuxtLink to="/about" class="title-btn">About</NuxtLink>
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
}
nav a.router-link-active {
  font-weight: bold;
}
header {
  background-color: #35495e;
  color: white;
  padding: 10px 0;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.title-homepage {
  font-size: 2.5em;
}

.title-btn {
  font-size: 1.5em;
  float: right;
  margin-right: 20px;
}
</style>
