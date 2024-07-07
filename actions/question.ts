"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function QuizTopic(name: string, userid: string) {
  try {
    const response = await prisma.quizTopic.create({
      data: {
        name: name,
        userid: userid,
      },
    });
    return response;
  } catch (error) {
    return null;
  }
}
export async function addQuestion(text: string, topicid: string) {
  try {
    const response = await prisma.question.create({
      data: {
        text: text,
        quizTopicId: topicid,
      },
    });
    return response;
  } catch (error) {
    return null;
  }
}
export async function addoption(option1:string,option2:string,option3:string,option4:string,questionId:string){
  try {
      const response = await prisma.option.create({
        data:{
          option1:option1,
          option2:option2,
          option3:option3,
          option4:option4,
          questionId:questionId,
        }
      });
    return response;
  } catch (error) {
    return null;
  }
}
export async function addAnswer(answer1:boolean,answer2:boolean,answer3:boolean,answer4:boolean,optionid:string){
  try {
      const response = await prisma.answer.create({
        data:{
          answer1:answer1,
          answer2:answer2,
          answer3:answer3,
          answer4:answer4,
          optionId:optionid,
        }
      });
    return response;
  } catch (error) {
    return null;
  }
}
export async function getparticulartopicquestion(id:string){
  try {
    const response = await prisma.quizTopic.findUnique({
      where:{
        id:id
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
              }
            }
          }
        }
      }
    });
    return response;
  } catch (error) {
    return null;
  }
}
export async function getparticulartopicanswers(id:string){
  try {
    const response = await prisma.quizTopic.findUnique({
      where:{
        id:id
      },
      select:{
        questions:{
          select:{
            options:{
              select:{
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
    return null;
  }
}