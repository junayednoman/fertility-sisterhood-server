import { ChecklistCategory, ChecklistStatus } from "@prisma/client";
import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import { TCreateChecklist } from "./checklist.validation.js";

const getDayBounds = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { gte: start, lt: end };
};
const create = async (authId: string, payload: TCreateChecklist) =>
  prisma.checklist.create({
    data: {
      authId,
      title: payload.title,
      category: payload.category,
      date: payload.date ?? new Date(),
      description: payload.description,
    },
    select: { id: true, title: true, category: true, date: true, status: true },
  });
const getToday = async (
  authId: string,
  options: TPaginationOptions,
  category?: ChecklistCategory
) => {
  const { page, take, skip } = calculatePagination(options);
  const where = {
    authId,
    date: getDayBounds(new Date()),
    ...(category ? { category } : {}),
  };
  const [checklists, total] = await Promise.all([
    prisma.checklist.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true, status: true },
    }),
    prisma.checklist.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, checklists };
};
const markDone = async (authId: string, id: string) => {
  const item = await prisma.checklist.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!item) throw new ApiError(404, "Checklist item not found");
  return prisma.checklist.update({
    where: { id },
    data: { status: ChecklistStatus.COMPLETED },
    select: { id: true, title: true, status: true },
  });
};
export const checklistServices = { create, getToday, markDone };
