"use client"
import {QuizTopic} from "@/actions/question";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Topic(){
  const router=useRouter();
   const [question,setquestion]=useState("");
   const handlesubmit=async()=>{
    const response = await QuizTopic(question,localStorage.getItem("userId")||"");
    if (response) {
      localStorage.setItem("topicid", response.id);
      router.push("/createquiz/quiz");
    } else {
      alert("Failed to create quiz");
    }
   }
    return (
        <div className="flex min-h-screen w-full justify-center place-items-center bg-black">
        <div className="border-2 rounded-2xl p-4 w-[50%] text-white">
            <h1 className="text-3xl font-bold flex justify-center">Create Quiz</h1>
            <h2 className="text-2xl font-bold flex justify-center mt-4">Topic of your Quiz</h2>
            <input  type="text" placeholder="Topic Name" className="w-full rounded-lg p-4 bg-transparent mt-4 border-2 outline-none" onChange={(e)=>setquestion(e.target.value)}/>
            <div className="mt-4 flex justify-end gap-4">
            <button className="bg-red-600 rounded-lg p-3 pl-4 pr-4 hover:bg-red-700" onClick={()=>{
              router.push("/");
            }}>Cancel</button>
            <button className="bg-green-600 rounded-lg p-3 pl-6 pr-6 hover:bg-green-700" onClick={handlesubmit}>Save</button>
            </div>
        </div>
        </div>
    );
}