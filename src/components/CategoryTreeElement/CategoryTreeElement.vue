<template>
  <div class="flex flex-col gap-4">
    <div>
      <div class="flex gap-2 items-center">
        <i
          :class="{ 'rotate-180': isOpen }"
          class="fa-solid cursor-pointer fa-chevron-up fa-chevron-down"
          @click="toggleOpenSelect"
          v-if="children.length > 0"
        ></i>
        <input
          type="checkbox"
          @change="checkElement(category.id)"
          v-model="category.checked"
        />
        {{ category.title }} ({{ category.count }} |
        {{ childrenCount }}
        )
        <a :href="`https://www.klerk.ru${category.url}`" target="_blank"
          >Перейти
        </a>
      </div>
      <div v-if="isOpen" class="p-2">
        <CategoryTreeElement
          v-for="child in categories.filter(
            item => item.id_parent == category.id,
          )"
          :key="`category_${child.id}`"
          :category_id="child.id"
          :categories="categories"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref, computed, onMounted } from 'vue'

const props = defineProps({
  category_id: {
    type: Number,
    required: true,
  },
  categories: {
    type: Array as PropType<Category.CategoryForList[]>,
    required: true,
  },
})

const isOpen = ref(false)

function toggleOpenSelect() {
  isOpen.value = !isOpen.value
}

function checkChildrenCount(count: number) {
  children.value.forEach(item => {
    count += item.count
  })
  return count
}

function checkElement(id_parent: number) {
  const children = props.categories?.filter(item => {
    if (item.id_parent == id_parent) {
      item.checked = category.value.checked
      return true
    }
  })
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      checkElement(children[i].id)
    }
  }
}

const childrenCount = computed(() => {
  let count = category.value.count
  return (count = checkChildrenCount(count))
})

const category = ref({
  id: null,
  title: '',
  count: 0,
  checked: false,
})
const children = ref([])

onMounted(() => {
  category.value = props.categories.find(item => item.id === props.category_id) // Строгое сравнение типов
  children.value = props.categories?.filter(
    item => item.id_parent === props.category_id, // Строгое сравнение типов
  )
})
</script>
