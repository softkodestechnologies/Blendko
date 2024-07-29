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
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Register'],
    }),
    oAuthRegister: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/googleregister',
        method: 'POST',
        body: { googleAccessToken: credentials },
      }),
      invalidatesTags: ['Register'],
    }),
    logIn: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['LogIn'],
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.token);
          console.log('User data:', data.user); 
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    oAuthLogIn: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/googlelogin',
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
