<template>
  <div>
    <header>
      <!-- 可以在這裡添加導航條或其他全局內容 -->
      <nav>
        <NuxtLink to="/">Homeee</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
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
  color: #42b983;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
