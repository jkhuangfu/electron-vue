<script setup lang="ts">
import { onMounted, ref } from 'vue';
const { versions } = window as any;

defineProps<{ msg: string }>();

const count = ref(0);

const res = ref<any>(null!);

async function add() {
  count.value++;
  const s = await versions.ping();
  console.log(s);
}

async function net() {
  const s = await versions.net();
  console.log(s);
  res.value = s;
}

async function getData() {
  const result = await versions.getData();
  console.log(result);
}

const v = ref(versions.foo);
console.log(versions);

onMounted(async () => {
  await net();
});
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>网络状态:{{ res }}</h1>
  <h2>{{ v }}</h2>

  <button type="button" @click="add">count is: {{ count }}</button>
  <button type="button" @click="getData">获取数据</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
