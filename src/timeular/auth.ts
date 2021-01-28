import { writeFile } from "fs-extra"
import got from "got"

import { fail } from "../fail"

/**
 * https://developers.timeular.com/#12de6e46-4b3a-437b-94b2-39b7782eb24c
 */
export async function getTimeularAccessToken() {
  let token = process.env.TIMEULAR_ACCESS_TOKEN

  if (token) {
    return token
  }

  console.log("TIMEULAR_ACCESS_TOKEN not found. Creating a new token...")

  let apiKey = process.env.TIMEULAR_API_KEY!
  let apiSecret = process.env.TIMEULAR_API_SECRET!

  if (!apiKey || !apiSecret) {
    fail("TIMEULAR_API_KEY or TIMEULAR_API_SECRET not found")
  }

  const url = `https://api.timeular.com/api/v3/developer/sign-in`
  console.log("POST", url)

  const { body } = await got.post<any>(url, {
    responseType: "json",
    json: { apiKey, apiSecret },
  })

  await writeFile(".env.timeular", `TIMEULAR_ACCESS_TOKEN="${body.token}"`)

  return body.token
}
