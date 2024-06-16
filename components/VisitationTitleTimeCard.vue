<template>
    <div v-if="student" class="top">
        <div>
          {{ student.studentID }} 
          {{ student.name }}
        </div>
        <div v-if="visit" class="visit-date">
          {{ formatDateTime(visit.visit_date) }}
          <div v-if="visit.visit_date === null" class="visit-date">
          <strong>尚未填寫</strong>
          </div>
        </div>
        <!-- <div v-else-if="visit.visit_date == ''" class="visit-date">
          <strong>未填寫</strong>
        </div> -->
        <div v-else class="visit-date">
          <strong>尚未填寫</strong>
        </div>
    </div>

</template>

<script>
export default {
name: 'VisitsTitleCard',
props: {
student: {
  type: Object,
  required: true
}
},
data() {
return {
  visit: null,
  temp: null,
};
},
mounted() {
if (this.student) {
  this.fetchStudentInfo();
}
},
methods: {
async fetchStudentInfo() {
  if (!this.student.id) {
    return;
  }
  try {
    const response = await fetch(`/api/visitation/get-student-info-by-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId: this.student.id }),
    });
    this.temp = await response.json();
    if (this.temp.success === true) {
      this.visit = this.temp.body;
    }
  } catch (error) {
    console.error('Error fetching student author:', error);
  }
},
formatDateTime(dateTime) {
  if (!dateTime) return '';
    const options = {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
  };
  return new Date(dateTime).toLocaleString(undefined, options);
}
},
};
</script>

<style>
.top {
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
}

</style>