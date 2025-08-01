import LoginForm from '@/components/auth/LoginForm'
import SocialLogin from '@/components/auth/SocialLogin'
import React from 'react'

export default function LoginPage() {
  return (
    <div>
       <section className="h-screen grid place-items-center">
      <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
        <h4 className="font-bold text-2xl">Sign in</h4>
        <LoginForm mode={'login'} />
        <SocialLogin mode={'login'} />
      </div>
    </section>
    </div>
  )
}
