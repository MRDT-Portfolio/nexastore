import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product, ProductsResponse } from "@/types/product";

interface GetProductsParams {
  search?: string;
  category?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams | void>({
      query: ({
        search,
        category,
        limit = 20,
        skip = 0,
        sortBy,
        order = "asc",
      } = {}) => {
        let url = "/products";

        if (search) {
          url = "/products/search";
        } else if (category) {
          url = `/products/category/${encodeURIComponent(category)}`;
        }

        const params = new URLSearchParams();

        if (search) {
          params.set("q", search);
        }

        params.set("limit", String(limit));
        params.set("skip", String(skip));

        if (sortBy) {
          params.set("sortBy", sortBy);
          params.set("order", order);
        }

        return `${url}?${params.toString()}`;
      },
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = baseApi;
