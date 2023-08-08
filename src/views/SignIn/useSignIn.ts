/**
 * @module sbom-harbor-ui/views/SignIn/useSignIn.ts
 */
import { Auth } from 'aws-amplify'
import { FederatedSignInOptions } from '@aws-amplify/auth/lib/types'
import { BaseSyntheticEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import loginUser from '@/actions/loginUser'
import useAlert from '@/hooks/useAlert'
import { useAuthDispatch } from '@/hooks/useAuth'

export interface FormData {
  email: string
  password: string
}

const defaultValues: FormData = {
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export const useSignIn = () => {
  const { setAlert } = useAlert()
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    clearErrors,
    control,
    formState,
    formState: { errors },
    handleSubmit: handleSubmitInternal,
    getFieldState,
    getValues,
    register,
    reset,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch,
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  })

  const handleClickFederatedSignIn = useCallback(async () => {
    try {
      await Auth.federatedSignIn({
        provider: 'COGNITO',
      } as FederatedSignInOptions)
    } catch (error) {
      setAlert({
        message: 'There was an error with the identity provider.',
        severity: 'error',
      })
    }
  }, [setAlert])

  const onSubmit = useCallback(
    async (data: FormData) => {
      const { email, password } = data
      setLoading(true)
      try {
        // FIXME: correct type error in loginUser action
        // @ts-expect-error ts(2345)
        await loginUser(dispatch, { email, password })
        setLoading(false)
        navigate('/app')
      } catch (error) {
        setLoading(false)
        setAlert({
          message: 'There was an error logging in. Please try again.',
          severity: 'error',
        })
      }
    },
    [dispatch, navigate, setAlert]
  )

  return {
    control,
    errors,
    formState,
    loading,
    clearErrors,
    getFieldState,
    getValues,
    handleClickFederatedSignIn,
    handleSubmit: handleSubmitInternal(onSubmit) satisfies (
      e?: BaseSyntheticEvent<FormData, unknown, unknown> | undefined
    ) => Promise<void>,
    register,
    reset,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch,
    showPassword,
    setShowPassword,
  }
}
