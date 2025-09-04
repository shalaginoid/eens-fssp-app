import z from 'zod';
import { ru } from 'zod/locales';

z.config(ru());

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Поле обязательно')
    .email('Некорректный e-mail'),
  password: z.string().trim().min(1, 'Поле обязательно'),
});

export const addExecutorSchema = z.object({
  fullname: z.string().trim().min(1, 'Поле обязательно'),
});

export const setStatusSchema = z.object({
  executorId: z.number('Поле обязательно'),
  statusId: z.number('Поле обязательно'),
});

export type LoginSchema = z.output<typeof loginSchema>;
export type AddExecutorSchema = z.output<typeof addExecutorSchema>;
export type SetStatusSchema = z.output<typeof setStatusSchema>;
