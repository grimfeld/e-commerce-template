import { Formik, Form, Field } from "formik"
import { Button, Input } from "@chakra-ui/react"
import * as yup from "yup"
import { getCurrentUser } from '@providers/User'

export default function AddProductPage () {
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: ""
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true)
            console.log(process.env.NEXT_PUBLIC_BASE_URL)
            await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/products', {
              method: 'POST',
              body: JSON.stringify({
                product: values,
                user: {
                  id: getCurrentUser()?.id,
                  token: getCurrentUser()?.token
                }
              })
            })
            console.log('success')
          } catch (error) {
            console.log(error)
          } finally {
            setSubmitting(false)
          }
        }}
        validationSchema={yup.object({
          title: yup.string().required(),
          price: yup.number().required(),
          description: yup.string().required()
        })}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Field name="title" type="text" placeholder="Title" isInvalid={errors["title"]} as={Input} />
            <Field name="price" type="number" placeholder="Price" isInvalid={errors["price"]} as={Input} />
            <Field name="description" type="text" placeholder="Description" isInvalid={errors["description"]} as={Input} />
            <Button type="submit" isDisabled={isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>
    </div >
  )
}