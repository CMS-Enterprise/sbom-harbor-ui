/**
 * Type definitions for the application.
 * @module sbom-harbor-ui/types
 */
import type {
  CognitoIdToken,
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'
import InputBase, { InputBaseProps } from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'

//* Application Types
//*--------------------------------------------------------/

export enum RouteIds {
  AUTHED_APP = 'authed-app',
  DASHBOARD = 'dashboard',
  MAIN = 'main',
  LOGIN = 'login',
  LOGOUT = 'logout',
  TEAM = 'team',
  TEAM_EDIT = 'team-edit',
  TEAM_NEW = 'team-new',
  TEAM_VIEW = 'team-view',
  PRODUCTS = 'products',
  VENDORS = 'vendors',
  VENDOR_VIEW = 'vendor-view',
}

//* User (Cognito)
//*--------------------------------------------------------/

export type CognitoUserInfo = {
  attributes: {
    email: string
    sub?: string
  }
  id?: string
  username: string
}

export type UserState = {
  user: CognitoUser
  userInfo: CognitoUserInfo
  userSession: CognitoUserSession
  idToken: CognitoIdToken
  jwtToken: string
}

export type UserDataType =
  | (UserState &
      CognitoUserInfo & {
        role?: string
        avatar?: string | null
        email?: string
        fullName?: string
        password?: string
        teams?: string[]
      })
  | null

//* Forms
//*--------------------------------------------------------/

export type FormField = {
  name: string
  label?: string
  type: InputBaseProps['type']
  required?: InputBaseProps['required']
  disabled?: InputBaseProps['disabled']
  multiline?: InputBaseProps['multiline']
  value?: InputBaseProps['value']
  component?:
    | typeof TextField
    | typeof InputBase
    | React.FC<HTMLInputElement>
    | JSX.ElementType
}

//* Vendors & Products
//*--------------------------------------------------------/

export interface Vendor {
  id: string
  name: string
  description?: string
  contact?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  website?: string
  notes?: string
  products: Omit<Product, 'vendor'>[]
}

export interface Product {
  id: string
  name: string
  lastUpload: TDateISO | undefined
  vendor: Omit<Vendor, 'products'>
}

//* Teams
//*--------------------------------------------------------/

/**
 * A team as it is set in the app state
 */
export type Team = {
  id: string
  name: string
  members: Record<string, TeamMember>
  projects: Record<string, Project>
  tokens: Record<string, Token>
}

/**
 * A team as it is returned from the API
 */
export type TeamEntity = {
  id: string
  name: string
  members: Array<TeamMember>
  projects: Array<ProjectEntity>
  tokens: Array<Token>
}

//* Team Members
//*--------------------------------------------------------/

/**
 * A user object representing a member of a team
 */
export type TeamMember = {
  id: string
  email: string
  isTeamLead: boolean
}

/**
 * The possible roles a team member can be assigned.
 * @see {@link @sbom-harbor-ui/dashboard/components/TeamMembersTable}
 */
export enum TeamMemberRole {
  MEMBER = 'member',
  TEAM_LEAD = 'team lead',
}

/**
 * Schema for a row representing a TeamMember in `TeamMembersTable`.
 * @see {@link @sbom-harbor-ui/dashboard/views/Dashboard/Team/components/TeamMembersTable}
 */
export type TeamMemberTableRow = TeamMember & {
  avatarSrc?: string
  name?: string
  role?: TeamMemberRole
  username?: string
}

//* Tokens
//*--------------------------------------------------------/

/**
 * A token as it is returned by the API and consumed in the app.
 * Also the schema for a row representing a codebase in `TokensTable`.
 * @see {@link @sbom-harbor-ui/dashboard/views/Dashboard/Team/components/TokensTable}
 */
export type Token = {
  id: string
  name: string
  created: string
  expires: string
  enabled: boolean
  token: string
}

//* Projects
//*--------------------------------------------------------/

/**
 * A project as it is set in the app state
 */
export type Project = {
  id: string
  name: string
  fisma: string
  codebases: Record<string, Codebase>
}

/**
 * A project as it is returned from the API
 */
export type ProjectEntity = {
  id: string
  name: string
  fisma: string
  codebases: Codebase[]
}

//* Codebases
//*--------------------------------------------------------/

/**
 * A codebase as it is returned from the API and consumed in the app.
 */
export type Codebase = {
  id: string
  name: string
  language: CodebaseLanguage | ''
  buildTool: BuildTool | ''
}

/**
 * The list of possible languages a codebase can be written in.
 */
export enum CodebaseLanguage {
  C = 'C',
  CPP = 'C++',
  DOTNET = '.NET',
  GO = 'go',
  JAVA = 'Java',
  JAVASCRIPT = 'Javascript',
  TYPESCRIPT = 'Typescript',
  NODE = 'Node.js',
  PHP = 'PHP',
  PYTHON = 'Python',
  RUBY = 'Ruby',
  RUST = 'Rust',
  OTHER = 'Other',
}

/**
 * The list of possible build tools a codebase can use.
 */
export enum BuildTool {
  ANT = 'ant',
  GRADLE = 'gradle',
  MAVEN = 'maven',
  NPM = 'npm',
  YARN = 'yarn',
  PIP = 'pip',
  VISUAL_STUDIO_BUILD_TOOLS = 'Visual Studio Build Tools',
  OTHER = 'Other',
}

//* Theme
//*--------------------------------------------------------/

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'

export type ThemeSkin = 'filled' | 'light' | 'light-static'
