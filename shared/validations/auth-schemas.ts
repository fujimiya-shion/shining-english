import { z } from "zod";

const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})$/;
const passwordMinLength = 8;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Họ tên phải có ít nhất 2 ký tự")
      .max(100, "Họ tên không được quá 100 ký tự"),
    email: z
      .string()
      .email("Email không hợp lệ"),
    phone: z
      .string()
      .regex(phoneRegex, "Số điện thoại không hợp lệ (VD: 0912345678)"),
    password: z
      .string()
      .min(passwordMinLength, `Mật khẩu phải có ít nhất ${passwordMinLength} ký tự`),
    passwordConfirmation: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Bạn cần đồng ý điều khoản" }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["passwordConfirmation"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(passwordMinLength, `Mật khẩu phải có ít nhất ${passwordMinLength} ký tự`),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên không được quá 100 ký tự"),
  email: z
    .string()
    .email("Email không hợp lệ"),
  message: z
    .string()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(1000, "Nội dung không được quá 1000 ký tự"),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z
    .string()
    .email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(phoneRegex, "Số điện thoại không hợp lệ (VD: 0912345678)"),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

export const settingsSchema = z.object({
  name: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên không được quá 100 ký tự"),
  phone: z
    .string()
    .regex(phoneRegex, "Số điện thoại không hợp lệ (VD: 0912345678)")
    .or(z.literal("")),
  birthday: z.string().optional(),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
