"use client"

import styles from "./styles.module.scss"
import LoginMutation from "./graphql/mutations/login.graphql"
import { useFormik } from "formik"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "usehooks-ts"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { setCookie,  } from "@/utilities/helpers/cookies"

interface CredentialsType {
  email: string
  password: string
}

interface CredentialsErrorsType {
  email?: string
  password?: string
}

export default function Login() {
  const router = useRouter()
  const [, setTokenValue] = useLocalStorage("token", null)
  const [, setRefreshTokenValue] = useLocalStorage("refreshToken", null)
  const [login, {loading, error}] = useMutation(LoginMutation)
  const loginUser = async (values: CredentialsType) => {
    const { data } = await login({variables: { input: values }})
    const { refreshToken, token } = data?.login || {}
    setCookie("refreshToken", refreshToken)
    setRefreshTokenValue(refreshToken)
    setCookie("token", token)
    setTokenValue(token)
    
    router.push("/dashboard", { scroll: false })
  }

  const {
    errors,
    isSubmitting,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: { email: "muaviausmani.pro@gmail.com", password: "Hello123" },
    validate: (values) => {
      const errors: CredentialsErrorsType = { }
      if (!values.email) {
        errors.email = "Required"
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address"
      }
      
      if (!values.password) {
        errors.password = "Required"
      }
      return errors;
    },
    onSubmit: loginUser
  })

  return (
    <div className={styles.root}>
      <h1 className="text-xl text-center">Log in to Intradocs</h1>
      <hr className="my-4" />
        <form onSubmit={handleSubmit}>
          <Input 
            name="email" 
            placeholder="Email" 
            type="email" 
            containerClass={"mb-2 w-full"} 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />
          <Input 
            name="password" 
            placeholder="Password" 
            type="password" 
            containerClass={"mb-2 w-full"} 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />
          <Button disabled={isSubmitting || loading} type="submit" className="w-full">Login</Button>
        </form>
    </div>
  )
}