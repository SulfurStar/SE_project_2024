<template>
  <div class="delete-account-container">
    <h1>學生清單</h1>
    <div v-if="visitTables">
      <ul>
        <li v-for="visitTable in visitTables" :key=visitTable.id>
          <VisitationTitleCard :visits="visitTable" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import VisitationTitleCard from "~/components/VisitationTitleCard.vue";

const route = useRoute();
const router = useRouter();
const visitTables = ref(null);
// const numberOfVisitTables = ref(null);
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
  const responseVisitTable = await fetch("/api/visitation/get-students-by-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (responseVisitTable.ok) {
    const responseData = await responseVisitTable.json();
    if (responseData.statusCode === 200) {
      visitTables.value = responseData.body;
      console.log("pppppppppppppppppppppp", visitTables.value);
    } else {
      console.error("Failed to fetch posts:", responseData);
    }
  } else {
    console.error("Failed to fetch posts: HTTP status", responseVisitTable.status);
  }

  // const responseNumberOfVisitTables = await fetch("/api/visitation/get-number-of-visits-table", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(params2),
  // });
  // numberOfVisitTables.value = await responseNumberOfVisitTables.json();
  // numberOfVisitTables.value = Math.ceil(numberOfVisitTables.value / 10);
  // console.log("numberOfPosts:", numberOfVisitTables.value);
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
