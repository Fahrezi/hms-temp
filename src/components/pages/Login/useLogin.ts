import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '@/hooks/useAuth';

import { loginRequest } from '@/services/auth.service';

import { LoginResponse, User } from '@/types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = loginRequest();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response: AxiosResponse<LoginResponse> = await loginMutation.mutateAsync(data);

      if (response?.data) {
        const user: User = { ...response.data, roles: ['admin'] };

        login(user, 'xxxxxxxxxxxxx');
        void navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: isSubmitting || loginMutation.isPending,
  };
};
