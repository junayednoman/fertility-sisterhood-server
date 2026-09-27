import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import { TCreateJournal } from "./journal.validation.js";

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

export const journalServices = { create, getMy };
