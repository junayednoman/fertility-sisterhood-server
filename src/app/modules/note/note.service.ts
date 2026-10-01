import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import { TCreateNote, TUpdateNote } from "./note.validation.js";

const noteSelect = {
  id: true,
  title: true,
  description: true,
  date: true,
  tags: true,
} as const;

const create = async (authId: string, payload: TCreateNote) =>
  prisma.note.create({ data: { authId, ...payload }, select: noteSelect });

const getMy = async (authId: string, options: TPaginationOptions) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId };
  const [notes, total] = await Promise.all([
    prisma.note.findMany({
      where,
      skip,
      take,
      orderBy: { date: "desc" },
      select: noteSelect,
    }),
    prisma.note.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, notes };
};

const update = async (authId: string, id: string, payload: TUpdateNote) => {
  const note = await prisma.note.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!note) throw new ApiError(404, "Note not found");
  return prisma.note.update({
    where: { id },
    data: payload,
    select: noteSelect,
  });
};

const remove = async (authId: string, id: string) => {
  const note = await prisma.note.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!note) throw new ApiError(404, "Note not found");
  return prisma.note.delete({ where: { id }, select: noteSelect });
};

export const noteServices = { create, getMy, update, remove };
