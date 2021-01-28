export function fail(message: string) {
  console.error(message)
  console.error("Did you follow the instructions in the README?")
  process.exit(1)
}
