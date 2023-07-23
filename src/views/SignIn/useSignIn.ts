/**
 * @module sbom-harbor-ui/views/SignIn/useSignIn.ts
 */
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Auth } from 'aws-amplify'
import { type FederatedSignInOptions } from '@aws-amplify/auth/lib/types'
import { useNavigate } from 'react-router-dom'
import loginUser from '@/actions/loginUser'
import useAlert from '@/hooks/useAlert'
import { useAuthDispatch } from '@/hooks/useAuth'

interface FormData {
  email: string
  password: string
}

const defaultValues: FormData = {
  email: '',
  password: '',
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
})

export const useSignIn = () => {
  const { setAlert } = useAlert()
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit: handleSubmitHookForm,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const handleClickFederatedSignIn = async () => {
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
  }

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
    loading,
    showPassword,
    handleSubmitHookForm,
    onSubmit,
    handleClickFederatedSignIn,
    setShowPassword,
  }
}
