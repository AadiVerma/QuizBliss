"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function signup(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    return response;
  } catch (error) {
    return null;
  }
}
export async function signin(
    email: string,
    password: string
  ) {
    try {
      const response = await prisma.user.findUniqueOrThrow({
        where: {
          email: email,
          password: password,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }
  
