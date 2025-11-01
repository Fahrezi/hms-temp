import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '@/hooks/useAuth';
import { useOverlay } from '@/hooks/useOverlay';

import { loginRequest } from '@/services/auth.service';

import { User } from '@/types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const loginMutation = loginRequest();
  const { login } = useAuth();
  const { activateNotif } = useOverlay();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const handleLogin = useCallback(async (body: { email: string; password: string }) => {
    try {
      return await fetch('http://localhost:5174/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(response => response.json());

    } catch (error) {
      console.error('Login error:', error);
    }
  }, []);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await handleLogin(data);

      // void navigate('/dashboard');
      // const response: AxiosResponse<LoginResponse> = await loginMutation.mutateAsync(data);

      if (response?.access_token) {
        const user: User = {
          name: 'admin',
          ...response.user
        };

        login(user, response.access_token);
        activateNotif({
          notifText: 'Selamat Datang!',
          notifType: 'success'
        });
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
