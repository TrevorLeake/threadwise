import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


const schema = z.object({
  email: z.string().email(),
  // name: z.string().optional(),
  // comment: z.string().optional(),
})


type Schema = z.infer<typeof schema>


export const MailingForm = () => {
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Schema) => {
    console.log(data)
  }

  // how to reflect error states for users better? or should I this is already excellent; no work

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="fard@gmail.com" type="email" />
      {/* <input {...register("word")} /> */}
      <input type="submit" />
    </form>
  )
}