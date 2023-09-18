import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const data = await prisma.users.findFirst({
    where: {
      AND: [
        {
          email: "tuwirufiha@mailinator.com",
        },
      ],
    },
  });

  const deserializedValue = BigInt(data.id);
  const ff = deserializedValue.toString();

  const user = {
    // id: deserializedValue,
    id: ff,
    name: data?.name,
    email: data?.email,
  };

  return user;
});
