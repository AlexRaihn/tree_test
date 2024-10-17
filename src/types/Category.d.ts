declare namespace Category {
  interface CategoryForTree {
    count: number
    id: number
    title: string
    url: string
    children: CategoryForTree[] | null
  }

  interface CategoryForList {
    count: number
    id: number
    title: string
    url: string
    checked: boolean | null
    id_parent: number | null
  }
}
