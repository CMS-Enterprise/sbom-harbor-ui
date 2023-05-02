/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_CF_DOMAIN: string
  readonly VITE_USER_POOL_ID: string
  readonly VITE_USER_POOL_CLIENT_ID: string
  readonly VITE_AWS_REGION: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
