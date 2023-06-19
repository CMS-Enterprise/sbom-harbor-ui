/**
 * Reduces an array of projects to a map of projects by id.
 * @module sbom-harbor-ui/selectors/reduceProjectsArrayToMap
 * @deprecated applies to the old API v1
 */
import reduceArrayToMap from '@/selectors/reduceArrayToMap'
import { Project, ProjectEntity } from '@/types'

const reduceProjectsArrayToMap = (
  projects: ProjectEntity[]
): Record<string, Project> =>
  reduceArrayToMap(
    projects.map(
      ({ codebases, ...rest }: ProjectEntity): Project => ({
        ...rest,
        codebases: reduceArrayToMap(codebases),
      })
    )
  )

export default reduceProjectsArrayToMap
