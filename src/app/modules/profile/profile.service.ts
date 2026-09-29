import prisma from "../../utils/prisma.js";
import { TProfileUpdate } from "./profile.validation.js";

const getProfile = async (authId: string) => {
  const profile = await prisma.auth.findUniqueOrThrow({
    where: {
      id: authId,
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

export const profileServices = {
  getProfile,
  updateProfile,
};
