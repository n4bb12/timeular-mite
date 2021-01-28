import got from "got"

import { TimeularActivities } from "./types"

/**
 * https://developers.timeular.com/#9ac8c381-7e91-4802-8f02-e6918493e902
 */
export async function getTimeularActivities(accessToken: string) {
  const url = `https://api.timeular.com/api/v3/activities`
  console.log("GET", url)

  const { body } = await got.get<TimeularActivities>(url, {
    responseType: "json",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return body
}
