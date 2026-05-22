import path from "path";
import fs from "fs/promises";

const fPath = path.join(__dirname, "../data/data.json");

export const readData = async () => {
  const data = await fs.readFile(fPath, "utf-8");
  // throw new Error("Custom Error Testing");
  return JSON.parse(data);
};

export const writeData = async (data: any) => {
  await fs.writeFile(fPath, JSON.stringify(data, null, 2));
};
