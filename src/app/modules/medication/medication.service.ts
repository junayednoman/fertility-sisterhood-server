import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import {
  TCreateMedication,
  TUpdateMedication,
} from "./medication.validation.js";

const create = async (authId: string, payload: TCreateMedication) =>
  prisma.medication.create({
    data: { authId, ...payload },
    select: {
      id: true,
      name: true,
      dose: true,
      frequency: true,
      type: true,
      startDate: true,
      endDate: true,
      createdAt: true,
    },
  });

const getMy = async (authId: string, options: TPaginationOptions) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId };
  const [medications, total] = await Promise.all([
    prisma.medication.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, dose: true, frequency: true },
    }),
    prisma.medication.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, medications };
};

const getSingle = async (authId: string, id: string) => {
  const medication = await prisma.medication.findFirst({
    where: { id, authId },
    select: {
      id: true,
      name: true,
      dose: true,
      frequency: true,
      type: true,
      startDate: true,
      endDate: true,
      createdAt: true,
    },
  });
  if (!medication) throw new ApiError(404, "Medication not found");
  return medication;
};

const update = async (
  authId: string,
  id: string,
  payload: TUpdateMedication
) => {
  const medication = await prisma.medication.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!medication) throw new ApiError(404, "Medication not found");

  return prisma.medication.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      name: true,
      dose: true,
      frequency: true,
      type: true,
      startDate: true,
      endDate: true,
      createdAt: true,
    },
  });
};

const remove = async (authId: string, id: string) => {
  const medication = await prisma.medication.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!medication) throw new ApiError(404, "Medication not found");

  await prisma.medicationChecklist.deleteMany({ where: { medicationId: id } });
  return prisma.medication.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      dose: true,
      frequency: true,
      type: true,
      startDate: true,
      endDate: true,
      createdAt: true,
    },
  });
};

export const medicationServices = { create, getMy, getSingle, update, remove };
