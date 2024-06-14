<template>
  <div></div>
</template>

<script setup>
import {  onMounted } from 'vue';
import { useRouter} from 'vue-router';

onMounted(() => {
  const router = useRouter();
  router.push('/posts/overview/1');
});

</script>
