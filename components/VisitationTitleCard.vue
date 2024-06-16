<template>

      <div v-if="stuInfo" class="top">
          <div>
            {{ stuInfo.studentID }} 
            {{ stuInfo.name }}
          </div>
          <div v-if="visits.visit_address" :style="{ color: 'green' }">
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
  visits: {
    type: Object,
    required: true
  }
},
data() {
  return {
    temp: null,
    stuInfo: null
  };
},
mounted() {
  if (this.visits.id) {
    this.fetchStudentInfo();
  }
},
methods: {
  async fetchStudentInfo() {
    if (!this.visits.studentId) {
      return;
    }
    try {
      const response = await fetch(`/api/visitation/get-student-info-by-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: this.visits.studentId }),
      });
      this.temp = await response.json();
      if (this.temp.success === false) {
        console.log('Error fetching student info:', this.temp[1]);
        
      }else{
        this.stuInfo = this.temp.body;
      }
    } catch (error) {
      console.error('Error fetching comment author:', error);
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