import bcrypt from "bcrypt";
import config from "./app/config/index.js";
import prisma from "./app/utils/prisma.js";
import { LoginProvider, UserRole, UserStatus } from "@prisma/client";

const seedAdmin = async () => {
  try {
    const exist = await prisma.auth.findUnique({
      where: {
        email: config.admin.email,
      },
    });

    if (exist?.role === UserRole.ADMIN)
      return console.log("Admin already exists");

    const hashedPass = await bcrypt.hash(config.admin.password as string, 10);
    await prisma.auth.create({
      data: {
        email: config.admin.email as string,
        name: "Admin",
        password: hashedPass,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        loginProvider: LoginProvider.EMAIL,
      },
    });
    console.log("Admin created");
  } catch (error) {
    console.log(error);
  }
};

seedAdmin();
