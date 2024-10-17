<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-4 p-4 items-start flex-col">
      <div class="flex gap-2 items-center">
        <label for="check_categories">Отобразить больше категорий</label>
        <input id="check_categories" type="checkbox" v-model="manyCategory" />
      </div>
      <div class="flex flex-col gap-4">
        <div>Выбрано {{ checkLength }}</div>
        <div class="flex gap-2 items-center">
          <label for="check_all_categories" class="font-bold"
            >Выбрать все</label
          >
          <input
            id="check_all_categories"
            type="checkbox"
            v-model="checkAll"
            @change="checkedAll"
          />
        </div>
      </div>
      <MButton bg="bg-blue-500" :is-loading="loading" @click="getCategories()">
        Показать
      </MButton>
    </div>
    <div class="font-bold text-xl" v-if="loading">Загрузка данных!</div>
    <div
      v-else
      class="flex flex-col gap-4 p-4 border-[1px] border-black rounded-md"
    >
      <div
        v-for="category in useCategoriesStore.categories.filter(
          item => item.id_parent == 0,
        )"
        :key="`category_${category.id}`"
      >
        <CategoryTreeElement
          :categories="useCategoriesStore.categories"
          :category_id="category.id"
          :store="useCategoriesStore"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CategoriesStore } from '@/stores/CategoriesStore'
import { computed, onMounted, ref } from 'vue'
import MButton from '@/components/MButton/MButton.vue'
import CategoryTreeElement from '@/components/CategoryTreeElement/CategoryTreeElement.vue'

const useCategoriesStore = CategoriesStore()

const manyCategory = ref(false)
const loading = ref(false)
const checkAll = ref(false)

const checkLength = computed(() => {
  const checkArray = useCategoriesStore.categories.filter(item => item.checked)
  return checkArray.length
})

async function getCategories() {
  loading.value = true
  let isAllCategories = 0
  if (manyCategory.value) {
    isAllCategories = 1
  }
  useCategoriesStore
    .getAllCategories(isAllCategories)
    .then(() => {
      console.log('Данные успешно загружены!')
    })
    .catch(error => {
      alert('Произошла ошибка!' + error)
    })
    .finally(() => {
      loading.value = false
    })
}

function checkedAll() {
  for (let i = 0; i < useCategoriesStore.categories.length; i++) {
    useCategoriesStore.categories[i].checked = checkAll.value
  }
}

onMounted(() => {
  getCategories()
})
</script>
