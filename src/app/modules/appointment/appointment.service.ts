import ApiError from "../../classes/ApiError.js";
import {
  calculatePagination,
  TPaginationOptions,
} from "../../utils/paginationCalculation.js";
import prisma from "../../utils/prisma.js";
import {
  TCreateAppointment,
  TUpdateAppointment,
} from "./appointment.validation.js";

const create = async (authId: string, payload: TCreateAppointment) =>
  prisma.appointment.create({
    data: {
      authId,
      doctor: payload.doctor,
      date: payload.date,
      time: payload.time,
    },
    select: {
      id: true,
      doctor: true,
      date: true,
      time: true,
      createdAt: true,
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

const update = async (
  authId: string,
  id: string,
  payload: TUpdateAppointment
) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!appointment) throw new ApiError(404, "Appointment not found");

  return prisma.appointment.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      doctor: true,
      date: true,
      time: true,
      createdAt: true,
    },
  });
};

const remove = async (authId: string, id: string) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id, authId },
    select: { id: true },
  });
  if (!appointment) throw new ApiError(404, "Appointment not found");

  await prisma.question.deleteMany({ where: { appointmentId: id } });
  return prisma.appointment.delete({
    where: { id },
    select: { id: true, doctor: true, date: true, time: true, createdAt: true },
  });
};

export const appointmentServices = { create, getMy, getSingle, update, remove };
