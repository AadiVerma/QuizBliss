"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function bulk(){
   try {
     const response=await prisma.quizTopic.findMany({
      select:{
        id: true,
        name: true,
        user: {
          select: {
            username: true,
          },
        },
      }
     });
     return response;
   } catch (error) {
    console.log(error);
    return null;
   }
}
export async function myquiz(ids:string){
  try {
    const response=await prisma.user.findUnique({
      where:{
       id:ids
      },
     select:{
       id: true,
       userQuizzes: {
         select:{
                id:true,
                name:true,
                user: {
                  select: {
                    username: true,
                  },
                },
            },
       },
     }
    });
    return response;
  } catch (error) {
   console.log(error);
   return null;
  }
}
export async function questionsofquiz(ids:string){
  try {
    const response=await prisma.quizTopic.findUnique({
      where:{
       id:ids
      },
     select:{
       questions:{
        select:{
          text:true,
          options:{
            select:{
              option1:true,
              option2:true,
              option3:true,
              option4:true,
              answers:{
                select:{
                  answer1:true,
                  answer2:true,
                  answer3:true,
                  answer4:true,
                }
              }
            }
          }
        }
       }
     }
    });
    return response;
  } catch (error) {
   console.log(error);
   return null;
  }
}
export async function DeleteQuiz(ids:string){
  try {
    const response1=await prisma.question.findFirst({
      where:{
        quizTopicId:ids
      },
      select:{
        id:true,
        options:{
          select:{
            id:true,
            answers:{
              select:{
                id:true,
              }
            }
          }
        }
      }
    })
    await prisma.answer.delete({
      where:{
        id:response1?.options?.answers?.id,
      }
    })
    await prisma.option.delete({
      where:{
        id:response1?.options?.id,
      }
    })
    await prisma.question.delete({
      where:{
        id:response1?.id,
      }
    })
    const response=await prisma.quizTopic.delete({
      where:{
       id:ids
      }})
      console.log(response);
    return response;
  } catch (error) {
   console.log(error);
   return null;
  }
}