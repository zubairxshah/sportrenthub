// queries/categoryQueries.ts
export const categoriesQuery = `*[_type == "category"] {
    _id,
    name,
    "image": image.asset->url
  }`;
  