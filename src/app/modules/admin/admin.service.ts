import { UserRole } from "@prisma/client";
import prisma from "../../utils/prisma.js";
import { TProfileUpdate } from "./admin.validation.js";

const getProfile = async (authId: string) => {
  const profile = await prisma.auth.findUniqueOrThrow({
    where: {
      id: authId,
      role: UserRole.ADMIN,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return profile;
};

const updateProfile = async (authId: string, payload: TProfileUpdate) => {
  const result = await prisma.auth.update({
    where: {
      id: authId,
      role: UserRole.ADMIN,
    },
    data: payload,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const adminServices = {
  getProfile,
  updateProfile,
};
