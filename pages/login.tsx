import { logIn } from '@providers/User'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { Button } from "@chakra-ui/react"

interface Credentials {
  username: string
  password: string
}

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export default function LoginPage () {

  const router = useRouter()

  const handleLogin = (values: Credentials, { setSubmitting }: FormikHelpers<Credentials>) => {
    console.log('log in')
    console.log(values)
    const loggedInUser = logIn(values.username, values.password)
    console.log("🚀 ~ file: login.tsx ~ line 24 ~ handleLogin ~ loggedInUser", loggedInUser)
  }

  return (
    <div>
      LoginPage
      <Formik initialValues={{ username: "", password: "" }} onSubmit={handleLogin} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col">
              <Field name="username" />
              <Field name="password" />
              <Button type='submit'>Log In</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}