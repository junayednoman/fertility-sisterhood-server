import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import ApiError from "../../classes/ApiError.js";
import prisma from "../../utils/prisma.js";
import { TCreateJournal, TUpdateJournal } from "./journal.validation.js";

const create = async (authId: string, payload: TCreateJournal) =>
  prisma.journal.create({
    data: { authId, ...payload },
    select: { id: true, title: true, content: true, createdAt: true },
  });

const getMy = async (authId: string, options: TPaginationOptions) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId };
  const [journals, total] = await Promise.all([
    prisma.journal.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, content: true, createdAt: true },
    }),
    prisma.journal.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, journals };
};

const update = async (authId: string, id: string, payload: TUpdateJournal) => {
  const journal = await prisma.journal.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!journal) throw new ApiError(404, "Journal entry not found");

  return prisma.journal.update({
    where: { id },
    data: payload,
    select: { id: true, title: true, content: true, createdAt: true },
  });
};

const remove = async (authId: string, id: string) => {
  const journal = await prisma.journal.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!journal) throw new ApiError(404, "Journal entry not found");

  return prisma.journal.delete({
    where: { id },
    select: { id: true, title: true, content: true, createdAt: true },
  });
};

export const journalServices = { create, getMy, update, remove };
