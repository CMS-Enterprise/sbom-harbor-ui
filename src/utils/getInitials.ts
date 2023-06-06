/**
 * Helper function that returns the initials from full name.
 * @module sbom-harbor-ui/utils/get-initials
 */

type UserPropsForInitials = RequireAtLeastOne<
  {
    name?: string
    email?: string
  },
  'name' | 'email'
>

/**
 * Returns the initials from full name if provided, otherwise
 *  attempts to get initials from the email address and returns that.
 * @param {UserPropsForInitials} inputs
 * @param {string} inputs.name User's full name to get initials from (preferred).
 * @param {string} inputs.email User's email to get initials from.
 * @returns {string} A string containing the user's initials.
 */
const getInitialsCaseInsensitive = ({
  name,
  email,
}: UserPropsForInitials): string => {
  if ('name' in { name } && name && name.length > 1) {
    const names = name.split(/\s/)
    if (names.length > 1) {
      const first = names[0]
      const last = names[names.length - 1]
      return `${first[0]}${last[0]}`
    }
    return `${name[0]}`
  }

  if ('email' in { email } && email) {
    const id = email.split('@')[0]
    // if there is a dot in the id, return the first
    // letters of the first and last words
    if (id.indexOf('.') !== -1) {
      return id
        .split('.')
        .reduce((response, word) => (response += word.slice(0, 1)), '')
    }
    // otherwise just return the first two letters
    return `${id[0]}${id.length > 1 ? id[1] : ''}`
  }

  throw new Error('No name or email provided')
}

/**
 * Returns the initials in uppercase from full name if provided, otherwise
 * attempts to get initials from the email address and returns that.
 * @param {UserPropsForInitials} inputs
 * @param {string} inputs.name User's full name to get initials from (preferred).
 * @param {string} inputs.email User's email to get initials from.
 * @returns {string} A string containing the user's initials in uppercase.
 */
const getInitials = (input: UserPropsForInitials): string => {
  return getInitialsCaseInsensitive(input).toUpperCase()
}

export default getInitials
