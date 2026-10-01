import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import { TCreateQuestion, TUpdateQuestion } from "./question.validation.js";

const create = async (authId: string, payload: TCreateQuestion) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id: payload.appointmentId, authId },
    select: { id: true },
  });
  if (!appointment) throw new ApiError(404, "Appointment not found");
  return prisma.question.create({
    data: { authId, appointmentId: payload.appointmentId, text: payload.text },
    select: { id: true, text: true, appointmentId: true, createdAt: true },
  });
};

const getMy = async (authId: string, options: TPaginationOptions) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId };
  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: { id: true, text: true, appointmentId: true, createdAt: true },
    }),
    prisma.question.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, questions };
};

const update = async (authId: string, id: string, payload: TUpdateQuestion) => {
  const question = await prisma.question.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!question) throw new ApiError(404, "Question not found");
  if (payload.appointmentId) {
    const appointment = await prisma.appointment.findFirst({
      where: { id: payload.appointmentId, authId },
      select: { id: true },
    });
    if (!appointment) throw new ApiError(404, "Appointment not found");
  }
  return prisma.question.update({
    where: { id },
    data: payload,
    select: { id: true, text: true, appointmentId: true, createdAt: true },
  });
};

const remove = async (authId: string, id: string) => {
  const question = await prisma.question.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!question) throw new ApiError(404, "Question not found");
  return prisma.question.delete({
    where: { id },
    select: { id: true, text: true, appointmentId: true, createdAt: true },
  });
};

export const questionServices = { create, getMy, update, remove };
