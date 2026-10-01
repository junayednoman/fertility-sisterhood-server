import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import {
  TCreateTestResult,
  TUpdateTestResult,
} from "./testResult.validation.js";

const create = async (authId: string, payload: TCreateTestResult) =>
  prisma.testResult.create({
    data: { authId, ...payload },
    select: {
      id: true,
      name: true,
      date: true,
      value: true,
      unit: true,
      note: true,
      category: true,
      createdAt: true,
    },
  });

const getMy = async (
  authId: string,
  options: TPaginationOptions,
  category?: string
) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId, ...(category ? { category } : {}) };
  const [testResults, total] = await Promise.all([
    prisma.testResult.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        date: true,
        value: true,
        unit: true,
        createdAt: true,
      },
    }),
    prisma.testResult.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, testResults };
};

const getSingle = async (authId: string, id: string) => {
  const testResult = await prisma.testResult.findFirst({
    where: { id, authId },
    select: {
      id: true,
      name: true,
      date: true,
      value: true,
      unit: true,
      note: true,
      createdAt: true,
    },
  });
  if (!testResult) throw new ApiError(404, "Test result not found");
  return testResult;
};

const update = async (
  authId: string,
  id: string,
  payload: TUpdateTestResult
) => {
  const testResult = await prisma.testResult.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!testResult) throw new ApiError(404, "Test result not found");
  return prisma.testResult.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      category: true,
      name: true,
      date: true,
      value: true,
      unit: true,
      note: true,
      createdAt: true,
    },
  });
};

const remove = async (authId: string, id: string) => {
  const testResult = await prisma.testResult.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!testResult) throw new ApiError(404, "Test result not found");
  return prisma.testResult.delete({
    where: { id },
    select: { id: true, name: true, date: true, value: true, unit: true },
  });
};

export const testResultServices = { create, getMy, getSingle, update, remove };
