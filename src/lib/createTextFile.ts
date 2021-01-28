import { writeFile } from "fs-extra"
import prettier from "prettier"

export async function createTextFile(path: string, addLines: (lines: string[]) => void) {
  const lines: string[] = []

  addLines(lines)

  const prettierConfig = await prettier.resolveConfig(".prettierrc")
  const content = prettier.format(lines.join("\n"), { ...prettierConfig, parser: "babel-ts" })

  await writeFile(path, content, "utf8")
}
