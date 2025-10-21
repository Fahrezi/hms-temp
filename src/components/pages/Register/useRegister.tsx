import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { registerRequest } from '@/services/auth.service';

export const registerSchema = z.object({
  email: z.string().trim().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type In  = z.input<typeof registerSchema>; 
type Out = z.output<typeof registerSchema>;

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const useRegister = () => {
  const navigate = useNavigate();
  const registerMutation = registerRequest();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerMutation.mutateAsync(data);
      alert('Registration successful!');
      void navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: isSubmitting || registerMutation.isPending,
  };
};
