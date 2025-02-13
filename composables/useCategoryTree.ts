import { computed } from "@vue/composition-api"
import { categoryTreeQuery } from "../gql/queries"
import * as GraphQLTypes from "@/server/types/GraphQL"
import * as types from "@/composables/types"
import { useNuxtApp, useState } from "#app"

export const useCategoryTree = (): types.UseCategoryTreeResponse => {
  const nuxt = useNuxtApp()
  const fetcher = nuxt.nuxt2Context.$gqlFetch
  const categories = useState(`use-category-tree-categories`, (): GraphQLTypes.PrCategory[] => {
    return [] as GraphQLTypes.PrCategory[]
  })

  const loading = useState(`use-category-tree-loading`, () => false)
  const error = useState(`use-category-tree-error`, () => null)

  // load
  const load = async () => {
    try {
      loading.value = true
      const response = await fetcher({
        query: categoryTreeQuery,
        variables: {},
      })
      categories.value = response.data.categoriesTree.items
      error.value = null
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  // return
  return {
    load,
    categories,
    loading: computed(() => loading.value),
    error: computed(() => error),
  }
}
