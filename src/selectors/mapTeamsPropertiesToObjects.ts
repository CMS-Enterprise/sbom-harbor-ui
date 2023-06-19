/**
 * Maps the properties of an API TeamEntity to a Team object.
 * @module sbom-harbor-ui/selectors/mapTeamsPropertiesToObjects
 * @deprecated applies to the old API v1
 */
import { Team, TeamEntity } from '@/types'
import reduceProjectsArrayToMap from '@/selectors/reduceProjectsArrayToMap'
import reduceArrayToMap from '@/selectors/reduceArrayToMap'

const mapTeamsPropertiesToObjects = (teams: TeamEntity[]): Team[] =>
  teams.map(({ members, projects, tokens, ...rest }: TeamEntity) => ({
    ...rest,
    members: reduceArrayToMap(members),
    projects: reduceProjectsArrayToMap(projects),
    tokens: reduceArrayToMap(tokens),
  }))

export default mapTeamsPropertiesToObjects
