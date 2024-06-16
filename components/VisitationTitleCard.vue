<template>
      <div v-if="student" class="top">
          <div>
            {{ student.studentID }} 
            {{ student.name }}
          </div>
          <div v-if="visit" :style="{ color: 'green' }">
            <el-icon :style="{ color: 'green' }"><CircleCheckFilled /></el-icon>
            <strong>已填寫</strong>
          </div>
          <div v-else :style="{ color: 'red' }">
            <el-icon :style="{ color: 'red' }"><CircleCloseFilled /></el-icon>
          <strong>未填寫</strong>
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
      if (this.temp.success === false) {
        console.log('Error fetching student info:', this.temp);
      }else{
        this.visit = this.temp.body;
      }
    } catch (error) {
      console.error('Error fetching student author:', error);
    }
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