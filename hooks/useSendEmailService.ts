import { useMutation } from '@tanstack/react-query';
import { EmailProps } from 'types';
import * as api from 'api/email';

export const SendEmailService = () => {
  const result = async ({ email, token }: EmailProps) => {
    return await api.sendEmail({ email, token });
  };
  return useMutation(result);
};
