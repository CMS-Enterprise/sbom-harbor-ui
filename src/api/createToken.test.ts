import getFutureDate from '@/utils/getFutureDate'
import createToken from '@/api/createToken'

test.skip('calls makes a single fetch request', async () => {
  await createToken({
    name: 'some-name',
    expires: getFutureDate(1, new Date()),
    jwtToken: 'some-token',
    teamId: 'some-team',
  })

  expect(global.fetch).toHaveBeenCalledTimes(1)
})
