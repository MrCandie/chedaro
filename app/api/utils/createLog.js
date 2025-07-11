import Log from "../models/logs";

export async function createLog(name, user) {
  try {
    await Log.create({ name, user });
  } catch (error) {
    console.log(error);
  }
}
