import mammoth from "mammoth";
import { readFile } from "node:fs/promises";

const filePath = process.argv[2];
const buffer = await readFile(filePath);
const result = await mammoth.extractRawText({ buffer });
console.log(result.value);
if (result.messages.length) {
  console.error("--- messages ---");
  console.error(result.messages);
}
