import { buildBreadcrumbs } from "../helpers/buildBreadcrumbs"
import { Breadcrumb } from "~~/pages/types"
import { Product, ProductOption, ProductOptionValue } from "~~/server/types/GraphQL"

const ratingAttrFQN = `tenant~rating`
export const getName = (product: Product) => product?.content?.productName

export const getRating = (product: Product) => {
  const attr = product?.properties?.find((property) => property?.attributeFQN === ratingAttrFQN)
  return attr?.values?.pop()?.value
}
export const getProductTotalReviews = (): number => 0
export const getPrice = (product: Product): number => product?.price?.price || 0
export const getSalePrice = (product: Product): number => product?.price?.salePrice || 0
export const getDescription = (product: Product): string =>
  product?.content?.productFullDescription || ""

export const getSFProductGallery = (product: Product) => {
  return product?.content?.productImages?.map((content) => ({
    mobile: { url: content?.imageUrl },
    desktop: { url: content?.imageUrl },
    big: { url: content?.imageUrl },
    alt: content?.altText || product?.content?.productName,
  }))
}

export const getBreadcrumbs = (product: Product): Breadcrumb[] => {
  const homeCrumb = [{ text: "Home", link: "/" }]
  if (!product?.categories?.[0]) {
    return homeCrumb
  }
  const productCrumbs = buildBreadcrumbs(product?.categories[0]).map((b) => ({
    ...b,
    link: `/c/${b.link}`,
  }))

  return [...homeCrumb, ...productCrumbs]
}
export const getProperties = (product: Product) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reducer = (accum: any, property: any) => {
    const values = property?.values?.map(
      (val: ProductOptionValue) => val?.value || val?.stringValue
    )
    const key = property?.attributeDetail?.name as string
    accum[key] = values
    return accum
  }
  return product?.properties?.filter((attr) => !attr?.isHidden).reduce(reducer, {})
}
export const getOptionSelectedValue = (option: ProductOption) => {
  const selectedValue = option?.values?.find((value) => value?.isSelected)
  return selectedValue?.value || selectedValue?.stringValue
}
export const getOptionName = (option: ProductOption): string => option?.attributeDetail?.name || ""
export const getOptions = (product: Product) => product?.options

export const getSegregatedOptions = (product: Product) => {
  const options = product?.options
  if (!options) return

  const nuxt = useNuxtApp()
  const colorAttributeFQN = nuxt.nuxt2Context.$config.colorAttributeFQN
  const sizeAttributeFQN = nuxt.nuxt2Context.$config.sizeAttributeFQN
  const colorAndSizeOptions = [colorAttributeFQN, sizeAttributeFQN]

  const colourOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === colorAttributeFQN.toLowerCase()
  )

  const sizeOptions = options?.find(
    (option) => option?.attributeFQN?.toLowerCase() === sizeAttributeFQN.toLowerCase()
  )

  const listOptions = options?.filter(
    (option) =>
      option?.attributeDetail?.inputType?.toLowerCase() === "list" &&
      !colorAndSizeOptions.includes(option?.attributeFQN?.toLowerCase())
  )

  const yesNoOptions = options?.filter(
    (option) => option?.attributeDetail?.inputType?.toLowerCase() === "yesno"
  )

  const textBoxOptions = options?.filter(
    (option) => option?.attributeDetail?.inputType?.toLowerCase() === "textbox"
  )

  const productOptions = {
    colourOptions,
    sizeOptions,
    listOptions,
    yesNoOptions,
    textBoxOptions,
  }

  return productOptions
}

export const productGetters = {
  getName,
  getRating,
  getProductTotalReviews,
  getPrice,
  getSalePrice,
  getDescription,
  getSFProductGallery,
  getBreadcrumbs,
  getProperties,
  getOptionSelectedValue,
  getOptionName,
  getOptions,
  getSegregatedOptions,
}
