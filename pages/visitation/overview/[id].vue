<template>
  <div class="delete-account-container">
    <h1>選擇學生填寫訪視時間</h1>
    <div v-if="loading">加載學生中...</div>
    <div v-else>
      <div v-if="students">
        <ul>
          <li v-for="student in students" :key=student.id>
            <VisitationTitleCard :student="student" />
          </li>
        </ul>
      </div>
    </div> 
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import VisitationTitleCard from "~/components/VisitationTitleCard.vue";

const route = useRoute();
const router = useRouter();
const students = ref(null);
// const numberOfstudents = ref(null);
const loading = ref(true);
const currentPage = ref(1);

const user = useState('user');
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

currentPage.value = route.params.id || 1;

const handlePageChange = (page) => {
  router.push(`/visitation/overview/${page}`);
};

const params = {
  userId: userId.value,
};

// const params2 = {
//   userId: userId.value,
// };

onMounted(async () => {
  console.log("userId:", userId.value);
  const responseStudents = await fetch("/api/visitation/get-students-by-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (responseStudents.ok) {
    const responseData = await responseStudents.json();
    if (responseData.statusCode === 200) {
      students.value = responseData.body;
    } else {
      console.error("Failed to fetch posts:", responseData);
    }
  } else {
    console.error("Failed to fetch posts: HTTP status", responseStudents.status);
  }
  loading.value = false;

  // const responseNumberOfstudents = await fetch("/api/visitation/get-number-of-visits-table", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(params2),
  // });
  // numberOfstudents.value = await responseNumberOfstudents.json();
  // numberOfstudents.value = Math.ceil(numberOfstudents.value / 10);
  // console.log("numberOfPosts:", numberOfstudents.value);
});

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
.delete-account-container {
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
