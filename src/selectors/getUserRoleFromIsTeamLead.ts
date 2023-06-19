/**
 * Returns the user role based on the isTeamLead property
 * @module sbom-harbor-ui/selectors/getUserRoleFromIsTeamLead
 * @deprecated applies to the old API v1
 */
import { TeamMember, TeamMemberRole } from '@/types'

const getUserRoleFromIsTeamLead = ({
  isTeamLead = false,
}: TeamMember): TeamMemberRole =>
  isTeamLead ? TeamMemberRole.TEAM_LEAD : TeamMemberRole.MEMBER

export default getUserRoleFromIsTeamLead
