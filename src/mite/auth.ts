import { fail } from "../fail"

export function getMiteAccountName() {
  let accountName = process.env.MITE_ACCOUNT_NAME!

  if (!accountName) {
    fail("MITE_ACCOUNT_NAME not found")
  }

  return accountName
}

export function getMiteAccessToken() {
  let accessToken = process.env.MITE_API_KEY!

  if (!accessToken) {
    fail("MITE_API_KEY not found")
  }

  return accessToken
}
