import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import { TCreateCost, TUpdateCost } from "./cost.validation.js";

const create = async (authId: string, payload: TCreateCost) =>
  prisma.cost.create({
    data: { authId, ...payload },
    select: {
      id: true,
      amount: true,
      date: true,
      isPaid: true,
      ivfRound: true,
      type: true,
      category: true,
      description: true,
      createdAt: true,
    },
  });

const getMy = async (authId: string, options: TPaginationOptions) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId };
  const [costs, total] = await Promise.all([
    prisma.cost.findMany({
      where,
      skip,
      take,
      orderBy: { date: "desc" },
      select: {
        id: true,
        amount: true,
        date: true,
        isPaid: true,
        ivfRound: true,
        createdAt: true,
      },
    }),
    prisma.cost.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, costs };
};

const getSingle = async (authId: string, id: string) => {
  const cost = await prisma.cost.findFirst({
    where: { id, authId },
    select: {
      id: true,
      amount: true,
      date: true,
      isPaid: true,
      ivfRound: true,
      type: true,
      category: true,
      description: true,
      createdAt: true,
    },
  });
  if (!cost) throw new ApiError(404, "Cost not found");
  return cost;
};

const update = async (authId: string, id: string, payload: TUpdateCost) => {
  const cost = await prisma.cost.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!cost) throw new ApiError(404, "Cost not found");
  return prisma.cost.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      amount: true,
      date: true,
      isPaid: true,
      ivfRound: true,
      type: true,
      category: true,
      description: true,
      createdAt: true,
    },
  });
};

const remove = async (authId: string, id: string) => {
  const cost = await prisma.cost.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!cost) throw new ApiError(404, "Cost not found");
  return prisma.cost.delete({
    where: { id },
    select: {
      id: true,
      amount: true,
      date: true,
      isPaid: true,
      ivfRound: true,
    },
  });
};

export const costServices = { create, getMy, getSingle, update, remove };
