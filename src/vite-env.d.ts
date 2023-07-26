/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_CF_DOMAIN: string
  readonly VITE_AWS_REGION: string
  readonly VITE_COGNITO_DOMAIN: string
  readonly VITE_USER_POOL_ID: string
  readonly VITE_USER_POOL_CLIENT_ID: string
  readonly VITE_COGNITO_REDIRECT_SIGN_IN: string
  readonly VITE_COGNITO_REDIRECT_SIGN_OUT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
