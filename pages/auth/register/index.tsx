import { Formik, Form, Field } from 'formik'
import { Button, cookieStorageManager, Input } from "@chakra-ui/react"
import * as yup from 'yup'
import { useState } from 'react'
import { setCookie } from "nookies"

export default function RegisterPage () {

  const [error, setError] = useState<string | null>(null)

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setError(null)
          const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              email: values.email,
              username: values.username,
              password: values.password,
            })
          })
          const json = await res.json()
          if (!res.ok) throw new Error(json.error)
          if (res.ok) {
            setCookie(null, 'username', json.user.username)
            setCookie(null, 'token', json.token)
          }
          resetForm()
        } catch (error) {
          if (error instanceof Error) setError(error.message)
        } finally {
          setSubmitting(false)
        }
      }}
      validationSchema={yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
      })}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div className="flex flex-col">
            <h1 className='font-bold text-3xl uppercase mb-8'>Sign Up</h1>
            <Field name="email" as={Input} isInvalid={touched['email'] && errors['email']} placeholder="Your email" />
            {touched['email'] && errors['email'] && <label htmlFor="email" className="text-red-500">{errors['email']}</label>}
            <Field name="username" as={Input} isInvalid={touched['username'] && errors['username']} placeholder="Your username" />
            {touched['username'] && errors['username'] && <label htmlFor="username" className="text-red-500">{errors['username']}</label>}
            <Field name="password" type="password" as={Input} isInvalid={touched['password'] && errors['password']} placeholder="Your password" />
            {touched['password'] && errors['password'] && <label htmlFor="password" className="text-red-500">{errors['password']}</label>}
            <Field name="passwordConfirm" type="password" as={Input} isInvalid={touched['passwordConfirm'] && errors['passwordConfirm']} placeholder="Confirm your password" />
            {touched['passwordConfirm'] && errors['passwordConfirm'] && <label htmlFor="passwordConfirm" className="text-red-500">{errors['passwordConfirm']}</label>}
            {error && <span className="text-red-500">{error}</span>}
            <Button disabled={isSubmitting} type="submit">Register</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}