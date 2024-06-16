<template>
  <div class="visitation-check-container">
    <h1 class="text-2xl font-bold text-center mb-6">訪視紀錄</h1>
    <div v-if="loading" class="text-center text-gray-500">
      正在加載訪視紀錄...
    </div>
    <div v-else>
      <ul>
        <li
          v-for="record in records"
          :key="record.id"
          class="mb-4 p-4 bg-white shadow-md rounded-lg"
        >
          <div class="mb-2">
            <strong class="text-xl font-semibold">學生:</strong>
            {{ record.studentName }} <br />
            <strong class="text-xl font-semibold">導師:</strong>
            {{ record.teacherName }} <br />
            <strong class="text-xl font-semibold">創建時間:</strong>
            {{ record.date_create }} <br />
            <strong class="text-xl font-semibold">更新時間:</strong>
            {{ record.date_update }} <br />
          </div>

          <h2 class="text-xl font-semibold mb-2 mt-4">導師意見</h2>
          <table class="info-table w-full border-collapse mb-4">
            <tbody>
              <tr
                v-for="(value, key) in parseInfoString(record.info_teacher)"
                :key="key"
                class="border-b"
              >
                <td class="key-column font-medium p-2 bg-gray-100">
                  {{ key }}
                </td>
                <td class="value-column p-2">
                  <template v-if="isBoolean(value)">
                    <template v-if="value === 'true' || value === '是'">
                      <el-icon><Check /></el-icon>
                    </template>
                    <template v-else>
                      <el-icon><Close /></el-icon>
                    </template>
                  </template>
                  <template v-else>{{ value }}</template>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 class="text-xl font-semibold mb-2">學生反饋</h2>
          <table class="info-table w-full border-collapse mb-4">
            <tbody>
              <tr
                v-for="(value, key) in parseInfoString(record.info_student)"
                :key="key"
                class="border-b"
              >
                <td class="key-column font-medium p-2 bg-gray-100">
                  {{ key }}
                </td>
                <td class="value-column p-2">
                  <template v-if="isBoolean(value)">
                    <template v-if="value === 'true' || value === '是'">
                      <el-icon><Check /></el-icon>
                    </template>
                    <template v-else>
                      <el-icon><Close /></el-icon>
                    </template>
                  </template>
                  <template v-else>{{ value }}</template>
                </td>
              </tr>
            </tbody>
          </table>

          <el-button type="danger" @click="deleteRecord(record.id)"
            >刪除</el-button
          >
        </li>
      </ul>
      <el-button type="primary" class="mx-auto block" @click="goBack"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { Check, Close } from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-message.css";

const records = ref([]);
const loading = ref(true);
const router = useRouter();
const route = useRoute();

const fetchRecords = async () => {
  try {
    const response = await fetch(
      `/api/visitation/getVisitationRecords?teacherId=${route.params.id}`
    );
    const data = await response.json();

    // Fetch student and teacher names
    for (const record of data) {
      const studentResponse = await fetch(
        `/api/get-user-name-by-id/${record.studentId}`
      );
      const studentData = await studentResponse.json();
      record.studentName = studentData.name;
      console.log(record.studentName);

      const teacherResponse = await fetch(
        `/api/get-user-name-by-id/${record.teacherId}`
      );
      const teacherData = await teacherResponse.json();
      record.teacherName = teacherData.name;
      console.log(record.teacherName);
    }

    records.value = data;
  } catch (error) {
    console.error("Error fetching visitation records:", error);
  } finally {
    loading.value = false;
  }
};

const deleteRecord = async (recordId) => {
  try {
    const response = await fetch(
      `/api/visitation/deleteVisitationRecord/${recordId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete record");
    }

    records.value = records.value.filter((record) => record.id !== recordId);

    ElMessage({
      message: "刪除成功",
      type: "success",
    });
  } catch (error) {
    console.error("Error deleting record:", error);
    ElMessage({
      message: "刪除失敗",
      type: "error",
    });
  }
};

const goBack = () => {
  router.push("/visitation");
};

const parseInfoString = (infoString) => {
  const regex = /([^:]+):([^:]*)(?=\s|$)/g;
  const entries = [];
  let match;
  while ((match = regex.exec(infoString)) !== null) {
    entries.push([match[1].trim(), match[2].trim()]);
  }
  return Object.fromEntries(entries);
};

const isBoolean = (value) => {
  return (
    value === "true" || value === "false" || value === "是" || value === "否"
  );
};

onMounted(fetchRecords);
</script>

<style scoped>
.visitation-check-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-table .key-column {
  width: 60%;
}

.info-table .value-column {
  width: 40%;
}

.el-button {
  margin-left: 1rem;
}
</style>
