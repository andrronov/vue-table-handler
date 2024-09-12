<script setup lang="ts">
import { onMounted, Reactive, reactive, Ref, ref, watch } from "vue";
import { fetchUsers } from "../mock-api/useFetchApi";
import { IParams, IUser } from "../types/userType";

const pageOptions: Reactive<IParams> = reactive({page: 1, pageCount: 10})
const users: Ref<Array<IUser>> = ref([]);
const isLoading: Ref<boolean> = ref(true);

function fetchData() {
  isLoading.value = true;
  fetchUsers({ page: pageOptions.page, pageCount: pageOptions.pageCount })
    .then((data) => (users.value = data))
    .catch((err) => console.error(err))
    .finally(() => (isLoading.value = false));
}

onMounted(() => {
  fetchData();
});

watch(pageOptions, () => {
  fetchData();
});
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <table v-else style="margin-bottom: 10px">
    <thead>
      <tr>
        <th>Идентификатор</th>
        <th>Имя</th>
        <th>Email</th>
        <th>Пол</th>
      </tr>
    </thead>
    <tbody v-if="users.length > 0">
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.sex }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td>No users</td>
      </tr>
    </tbody>
  </table>
  <div style="display: flex">
    <button @click="pageOptions.page--" :disabled="pageOptions.page <= 1">-</button>
    <p>{{ pageOptions.page }}</p>
    <button @click="pageOptions.page++" :disabled="users.length < 1">+</button>
    <select v-model="pageOptions.pageCount" name="pageCount">
      <option :value="Number(10)">10</option>
      <option :value="Number(20)">20</option>
      <option :value="Number(25)">25</option>
    </select>
  </div>
</template>

<style scoped></style>
