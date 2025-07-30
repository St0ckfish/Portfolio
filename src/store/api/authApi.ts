import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuthToken, removeAuthToken, getAuthToken } from '@/components/dashboard/Auth/auth';

export interface User {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
  name: string;
  image: File;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorId: {
    _id: string;
    name: string;
    username: string;
    imageUrl: string;
  };
  imageUrl: string;
  tags: string[];
  views: number;
  likes: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portfolio-backend-rxwc.onrender.com',
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Blog'],
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAuthToken(data.token);
        } catch (error) {
          console.error('Sign in failed:', error);
        }
      },
    }),
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: ({ username, password, name, image }) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('image', image);

        return {
          url: '/auth/signup',
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAuthToken(data.token);
        } catch (error) {
          console.error('Sign up failed:', error);
        }
      },
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    signOut: builder.mutation<void, void>({
      queryFn: () => {
        removeAuthToken();
        return { data: undefined };
      },
      invalidatesTags: ['User'],
    }),
    getAllBlogs: builder.query<Blog[], void>({
      query: () => ({
        url: '/blogs',
        method: 'GET',
      }),
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query<Blog, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
    createBlog: builder.mutation<Blog, FormData>({
      query: (formData) => ({
        url: '/blogs',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation<Blog, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetCurrentUserQuery, useSignOutMutation, useGetAllBlogsQuery, useGetBlogByIdQuery, useDeleteBlogMutation, useCreateBlogMutation, useUpdateBlogMutation } = authApi;
