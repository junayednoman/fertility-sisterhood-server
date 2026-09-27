import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import { TCreateAppointment } from "./appointment.validation.js";

const create = async (authId: string, payload: TCreateAppointment) =>
  prisma.appointment.create({
    data: {
      authId,
      doctor: payload.doctor,
      date: payload.date,
      time: payload.time,
      questions: { create: payload.questions.map(text => ({ text, authId })) },
    },
    select: {
      id: true,
      doctor: true,
      date: true,
      time: true,
      createdAt: true,
      questions: { select: { id: true, text: true } },
    },
  });

const getMy = async (authId: string, options: TPaginationOptions) => {
  const { page, take, skip } = calculatePagination(options);
  const where = { authId };
  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      skip,
      take,
      orderBy: { date: "desc" },
      select: {
        id: true,
        doctor: true,
        date: true,
        time: true,
        createdAt: true,
      },
    }),
    prisma.appointment.count({ where }),
  ]);
  return { meta: { page, limit: take, total }, appointments };
};

const getSingle = async (authId: string, id: string) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id, authId },
    select: {
      id: true,
      doctor: true,
      date: true,
      time: true,
      createdAt: true,
      questions: { select: { id: true, text: true } },
    },
  });
  if (!appointment) throw new ApiError(404, "Appointment not found");
  return appointment;
};

export const appointmentServices = { create, getMy, getSingle };
