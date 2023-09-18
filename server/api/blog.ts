import { PrismaClient } from "@prisma/client";
import user from "./user";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const data = await prisma.blog.findFirst();

  const deserializedValue = BigInt(data.id);
  const ff = deserializedValue.toString();

  console.log(data);

  const userData = {
    // id: deserializedValue,
    id: ff,
    user: user,
  };

  return userData;
});
