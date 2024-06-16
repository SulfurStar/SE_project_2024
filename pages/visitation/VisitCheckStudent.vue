<template>
  <div class="visitation-check-container">
    <h1 class="text-2xl font-bold text-center mb-6">訪視紀錄</h1>
    <div v-if="loading" class="text-center text-gray-500">
      正在加載訪視紀錄...
    </div>
    <div v-else>
      <div v-if="record" class="inside">
        <h2 class="text-xl font-semibold mb-4">導師意見</h2>
        <table class="info-table w-full border-collapse mb-6">
          <tbody>
            <tr
              v-for="(value, key) in parsedInfoTeacher"
              :key="key"
              class="border-b"
            >
              <td class="key-column font-medium p-2 bg-gray-100">{{ key }}</td>
              <td class="value-column p-2">
                <template v-if="isBoolean(value)">
                  <el-icon v-if="value === 'true' || value === '是'">
                    <Check />
                  </el-icon>
                  <el-icon v-else>
                    <Close />
                  </el-icon>
                </template>
                <template v-else>{{ value }}</template>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-xl font-semibold mb-4">學生反饋</h2>
        <table class="info-table w-full border-collapse mb-6">
          <tbody>
            <tr
              v-for="(value, key) in parsedInfoStudent"
              :key="key"
              class="border-b"
            >
              <td class="key-column font-medium p-2 bg-gray-100">{{ key }}</td>
              <td class="value-column p-2">
                <template v-if="isBoolean(value)">
                  <el-icon v-if="value === 'true' || value === '是'">
                    <Check />
                  </el-icon>
                  <el-icon v-else>
                    <Close />
                  </el-icon>
                </template>
                <template v-else>{{ value }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-button type="primary" class="mx-auto block" @click="goBack"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script setup>
const record = ref(null);
const loading = ref(true);
const router = useRouter();
const route = useRoute();
const user = useState("user");
const userId = ref("");

watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      userId.value = newUser.id;
    }
  },
  { immediate: true }
);

const fetchRecords = async () => {
  try {
    const response = await fetch(
      `/api/visitation/getVisitationRecordsStudent?studentId=${userId.value}`
    );
    const data = await response.json();
    record.value = data;
  } catch (error) {
    console.error("Error fetching visitation records:", error);
  } finally {
    loading.value = false;
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

const parsedInfoTeacher = computed(() =>
  record.value ? parseInfoString(record.value.info_teacher) : {}
);
const parsedInfoStudent = computed(() =>
  record.value ? parseInfoString(record.value.info_student) : {}
);

onMounted(fetchRecords);
</script>

<style scoped>
.visitation-check-container {
  @apply max-w-2xl mx-auto p-8 border border-gray-300 rounded-lg shadow-lg;
}

.inside {
  @apply my-4;
}

.info-table .key-column {
  @apply w-3/5; /* 60% */
}

.info-table .value-column {
  @apply w-2/5; /* 40% */
}

.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}
</style>
