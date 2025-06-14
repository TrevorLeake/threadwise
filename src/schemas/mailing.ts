// src/contracts/mailingForm.ts
import * as z from 'zod';

export const MailingFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  name: z.string().optional(),
  comment: z.string().optional(),
});

export type MailingFormValues = z.infer<typeof MailingFormSchema>;
