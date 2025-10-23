import { createSafeRouteHandler } from '@sugardarius/anzen'
import { geolocation } from '@vercel/functions'

// NOTE:
// Fallback on Seoul, South Korea (randomly selected for testing).
// Defined as strings as `geolocation` returns strings
const LAT_LONG_FALLBACK = ['37.5665', '126.9780']

export const GET = createSafeRouteHandler(
  {
    id: 'api/geolocation',
  },
  async (_ctx, req) => {
    let { latitude, longitude } = geolocation(req)
    if (!latitude || !longitude) {
      latitude = LAT_LONG_FALLBACK[0]
      longitude = LAT_LONG_FALLBACK[1]
    }

    return Response.json({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    })
  }
)
