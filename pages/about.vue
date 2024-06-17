<script lang="ts" setup>
const teamMembers = [
  { name: "劉川愷", github: "https://github.com/SulfurStar" },
  { name: "鍾秉翰", github: "https://github.com/binhan0713" },
  { name: "蘇柏諺", github: "https://github.com/yayyaysu" },
  { name: "王世華", github: "https://github.com/forgefkcode" },
  { name: "白柔心", github: "https://github.com/a5514" },
  { name: "游若薰", github: "" },
];
</script>

<template>
  <div class="team-container mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold text-center mb-6">開發團隊</h1>
    <el-table :data="teamMembers" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column label="GitHub">
        <template #default="scope">
          <a
            :href="scope.row.github"
            target="_blank"
            class="text-blue-500 github-link"
          >
            {{ scope.row.github }}
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.team-container {
  max-width: 600px;
}

.github-link {
  color: #042178; /* 深藍色 */
  font-weight: 500;
  text-decoration: none; /* 移除底線 */
  transition: color 0.3s ease;
}

.github-link:hover {
  color: #2563eb; /* 更亮的藍色 */
  text-decoration: none; /* 懸停時也不顯示底線 */
}
</style>
