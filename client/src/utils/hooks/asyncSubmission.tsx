import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser, logOut } from '@/services/userSlice';

type StateError = {
  error: boolean;
  message: string;
};

function useAsyncSubmission({ callback }: { callback: any }) {
  const [isError, setIsError] = useState<StateError>({
    error: false,
    message: '',
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmission = async (
    data: any,
    formAction: () => void,
    type?: string,
    onSuccess?: (response: any) => void
  ) => {
    try {
      const response = await callback(data).unwrap();
      formAction();

      if (onSuccess) onSuccess(response);

      if (type === '/') {
        dispatch(setUser(response.user));
        router.push(type);
      }
    } catch (err: any) {
      if (err?.data?.name === 'TokenExpiredError') {
        dispatch(logOut());
        router.push('/signin');
      }
      
      setIsError({
        error: true,
        message: err?.data?.error?.message || err?.data?.message || 'An unexpected error occurred',
      });
    }
  };

  return { isError, handleSubmission };
}

export default useAsyncSubmission;
