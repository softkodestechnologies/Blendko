// services/authService.ts
import { blendkoApi } from './api';

type Credentials = {
  email: string;
  password: string;
  name?: string;
};

const authService = blendkoApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials: Credentials) => ({
        url: 'user/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Register'],
    }),
    oAuthRegister: builder.mutation({
      query: (credentials: Credentials) => ({
        url: 'user/googleregister',
        method: 'POST',
        body: { googleAccessToken: credentials },
      }),
      invalidatesTags: ['Register'],
    }),
    logIn: builder.mutation({
      query: (credentials: Credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['LogIn'],
    }),
    oAuthLogIn: builder.mutation({
      query: (credentials: Credentials) => ({
        url: 'user/googlelogin',
        method: 'POST',
        body: { googleAccessToken: credentials },
      }),
      invalidatesTags: ['LogIn'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useOAuthRegisterMutation,
  useLogInMutation,
  useOAuthLogInMutation,
} = authService;
