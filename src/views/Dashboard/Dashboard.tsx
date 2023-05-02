/**
 * The default view that an authenticated user first sees when they visit the
 *  app. It renders a list of teams that the user is a member of, and a list
 *  of the api keys that the user has access to.
 * @module @sbom-harbor-ui/dashboard/views/Dashboard/Dashboard
 */
import * as React from 'react'
import { useNavigate, useLoaderData, Await } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Fallback from '@/components/SimpleLoadingFallback'
import DashboardTeamCard from '@/views/Dashboard/Team/components/DashboardTeamCard'
import DashboardTeamCreationCard from '@/views/Dashboard/Team/components/DashboardTeamCreateCard'
import { Team } from '@/types'

const DashboardContainer = (): JSX.Element => {
  // navigation hook
  const navigate = useNavigate()

  // hook for getting the route loader data
  const { data } = useLoaderData() as { data: Team[] }

  // Callback function that redirects the user to the new team creation
  // view. This callback does not depend on `navigate`, so it's not
  // necessary to include it in the `useCallback` dependency array.
  /* eslint-disable react-hooks/exhaustive-deps */
  const navigateToCreateTeam = React.useCallback(() => {
    navigate('team/new')
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={6} className="match-height">
        <React.Suspense fallback={<Fallback />}>
          <Await
            resolve={data}
            errorElement={<div>Could not load teams 😬</div>}
            // eslint-disable-next-line react/no-children-prop
            children={(resolvedTeams: Team[]) => (
              <>
                <Grid xs={12} md={4}>
                  <DashboardTeamCreationCard onClick={navigateToCreateTeam} />
                </Grid>
                {resolvedTeams &&
                  resolvedTeams.length > 0 &&
                  resolvedTeams.map((team: Team) => (
                    <Grid xs={12} md={4} key={team.id}>
                      <DashboardTeamCard team={team} />
                    </Grid>
                  ))}
              </>
            )}
          />
        </React.Suspense>
      </Grid>
    </Box>
  )
}
export default DashboardContainer
