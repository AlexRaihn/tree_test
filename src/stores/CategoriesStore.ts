import { defineStore } from 'pinia'
import { httpClient } from '@/stores/httpClient'

export const CategoriesStore = defineStore('CategoriesStore', {
  state: () => ({
    categories: [] as Category.CategoryForList[],
  }),
  actions: {
    async getAllCategories(allowEmpty: number = 0) {
      this.categories.length = 0
      return httpClient
        .get('yindex.php/v3/event/rubrics', {
          params: {
            allowEmpty,
          },
        })
        .then(response => {
          this.translateTreeOnList(response.data)
        })
    },
    translateTreeOnList(
      children: Category.CategoryForTree[],
      parent_id: number = 0,
    ) {
      for (let i = 0; i < children.length; i++) {
        this.categories.push({
          id: children[i].id,
          title: children[i].title,
          url: children[i].url,
          count: children[i].count,
          checked: false,
          id_parent: parent_id,
        })

        if (children[i].children?.length) {
          // Сокращение проверки на дочерние элементы
          this.translateTreeOnList(children[i].children, children[i].id)
        }
      }
    },
    checkCategory(category_id: number) {
      this.category.children.find(c => c.id === category_id)
      if (category.children && category.children.length > 0) {
        for (let i = 0; i < category.children.length; i++) {
          checkCategory(category.children[i])
        }
      }
    },
  },
})
