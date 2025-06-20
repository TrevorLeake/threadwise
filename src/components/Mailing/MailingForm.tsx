import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, Input } from "../../atoms/Container"
import { Paragraph, SiteGrate } from "../../atoms/TypographySC"
import type { CSSProperties } from "react"
import { MailingFormSchema, type MailingFormValues } from "../../schemas/mailing"



export const MailingForm = (props:{style?:CSSProperties}) => {
  // await tasks with disabled... animation/submission?

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MailingFormValues>({
    delayError:240,
    shouldUseNativeValidation:false,
    resolver: zodResolver(MailingFormSchema),
    // disabled:
  });

  const onSubmit = (data: MailingFormValues) => {
    console.log(data)
  }

  // how to reflect error states for users better? or should I this is already excellent; no work

  // should we operate with react as a presentation layer of markup
  // so declarative returns, but pully everything else

  return (
    <Form style={{ aspectRatio:11.5/6.16, ...props.style}} data-testid='mailing-form' noValidate onSubmit={handleSubmit(onSubmit)}>
      <SiteGrate data-testid='mailing-form-message'>
        mailing
      </SiteGrate>
        <div style={{ justifyItems:'right', marginTop:'auto',  flexFlow:'column', display:'flex' }}>
           {`RE: { hyperpatter }`}
        </div>

      <Input data-testid='mailing-form-email-input' {...register("email")} placeholder="email@address.com" type="email"/>
      {errors.email && (
        <p data-testid="mailing-form-email-error" style={{ color: 'red' }}>
          {errors.email.message}
        </p>
      )}
      <Input data-testid='mailing-form-submit' className='submit' value={'submit'} aria-label="submit-for-mailing-list" id='submit-for-mailing-list' type="submit" />

    </Form> 
  )
}