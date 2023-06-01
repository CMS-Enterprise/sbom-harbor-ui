/**
 * State loader for react-router data routes that require user's all teams.
 * @module sbom-harbor-ui/loaders/teamsLoader
 * @see {@link @sbom-harbor-ui/dashboard/Routes}
 */
import { defer } from 'react-router-dom'
import teamsResponseToMappedProps from '@/selectors/mapTeamsPropertiesToObjects'
import { Team, TeamEntity } from '@/types'
import getJWT from '@/utils/getJWT'
import harborRequest from '@/utils/harborRequest'

const teamsLoader = ({ request }: { request: Request }) => {
  return defer({
    data: getJWT()
      .then(
        (jwtToken: string): Promise<Response> =>
          harborRequest({
            children: true,
            jwtToken,
            path: `teams`,
            signal: request.signal,
          })
      )
      .then((response: Response): Promise<TeamEntity[]> => response.json())
      .then((teams: TeamEntity[]): Team[] => teamsResponseToMappedProps(teams)),
  })
}

export default teamsLoader
