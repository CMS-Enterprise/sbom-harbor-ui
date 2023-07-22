/**
 * @module sbom-harbor-ui/errors/AuthError
 * @see {@link @sbom-harbor-ui/utils/getJWT}
 * @see {@link @sbom-harbor-ui/router/authLoader}
 */

export enum AuthErrorKeys {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  UNKNOWN = 'UNKNOWN',
}

export enum AuthErrorStatusText {
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  UNKNOWN = 'Unknown Error',
}

export enum AuthErrorStatus {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  UNKNOWN = 500,
}

const Entries = Object.entries(AuthErrorStatus) as [string, AuthErrorStatus][]

/**
 * Custom error class for authentication errors
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {AuthError} An instance of AuthError
 * @example
 * throw new AuthError('Invalid Session', { status: 401 })
 */
class AuthError extends Error {
  #key: AuthErrorKeys
  #status: number
  #statusText: string
  #message: string

  constructor({
    status = 401,
    message,
  }: {
    status?: number
    message?: string | AuthErrorStatusText
  } = {}) {
    super(message)

    // Ensure the name of this error is the same as the class name
    this.name = 'AuthError'

    // Assign the error message
    this.#message = message as string

    // If a status code is provided, assign it, otherwise default to 401
    this.#status = status

    // Get the enum key from the status code
    this.#key = (Entries.find(
      ([, value]: [string, AuthErrorStatus]) => value === this.#status
    )?.[0] || AuthErrorKeys.UNKNOWN) as AuthErrorKeys

    // Get the status text from the enum key
    this.#statusText = AuthErrorStatusText[this.#key]

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError)
    }
  }

  get status(): number {
    return this.#status
  }

  get statusText(): string {
    return this.#statusText
  }

  get message(): string {
    return this.#message || this.#statusText
  }

  toResponse(): Response {
    return new Response(this.message, {
      status: this.#status,
      statusText: this.#statusText,
    })
  }
}

export default AuthError
