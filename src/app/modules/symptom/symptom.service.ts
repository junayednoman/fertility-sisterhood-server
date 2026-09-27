import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import { TCreateSymptom } from "./symptom.validation.js";

const getDayBounds = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { gte: start, lt: end };
};

const create = async (authId: string, payload: TCreateSymptom) => {
  const date = payload.date ?? new Date();
  const dateRange = getDayBounds(date);
  const existing = await prisma.symptom.findFirst({
    where: { authId, date: dateRange },
    select: { id: true },
  });
  if (existing)
    throw new ApiError(409, "A symptom has already been created for this day");

  return prisma.symptom.create({
    data: {
      authId,
      symptomName: payload.symptomName,
      moods: payload.moods,
      note: payload.note,
      date,
    },
    select: {
      id: true,
      symptomName: true,
      moods: true,
      note: true,
      date: true,
    },
  });
};

const getMy = async (authId: string, options: TPaginationOptions) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId };
  const [symptoms, total] = await Promise.all([
    prisma.symptom.findMany({
      where,
      skip,
      take,
      orderBy: { date: "desc" },
      select: {
        id: true,
        symptomName: true,
        moods: true,
        note: true,
        date: true,
      },
    }),
    prisma.symptom.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, symptoms };
};

const getToday = async (authId: string) =>
  prisma.symptom.findFirst({
    where: { authId, date: getDayBounds(new Date()) },
    orderBy: { date: "desc" },
    select: {
      id: true,
      symptomName: true,
      moods: true,
      note: true,
      date: true,
    },
  });

export const symptomServices = { create, getMy, getToday };
