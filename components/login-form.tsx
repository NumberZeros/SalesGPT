'use client'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

export default function SignInForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: { email: string; password: string }) => {
    signIn('credentials', data, { callbackUrl: `/` })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <div className="mb-4">
        <Input
          type="email"
          {...register('email')}
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-500"
        />
      </div>

      <div className="mb-4">
        <Input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-sky-500"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
      >
        Sign in
      </Button>
    </form>
  )
}
