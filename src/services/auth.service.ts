import fs from "fs/promises";
import path from "path";

const filePath = path.join(__dirname, "../data/users.json");

export const getUsers = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

export const saveUsers = async (users: any) => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};