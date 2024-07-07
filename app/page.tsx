"use client"
import { bulk } from "@/actions/bulkquiz";
import QuizCard from "@/components/quizcard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface User {
  username: string;
}

interface QuizTopic {
  id: string;
  name: string;
  user: User;
}
export default function Home() {
  const [data, setdata] = useState<QuizTopic[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetch = async () => {
      const response = await bulk();
      setdata(response || []);
    }
    fetch();
  }, [])
  return (
    <div className="min-h-screen bg-black">
      <div className="flex justify-between bg-black border-b-2 border-gray-500 p-4">
        <h1 className="text-white font-bold text-xl mt-1"><span className="text-3xl text-purple-600">Q</span>uiz<span className="text-3xl text-purple-600">B</span>liss</h1>
        <div className="flex gap-4">
          <button className="bg-green-500 rounded p-2 font-bold text-white hover:bg-green-700" onClick={() => { router.push('/createquiz') }}>Add Quiz</button>
          <button className="bg-purple-500 rounded p-2 font-bold text-white hover:bg-purple-700" onClick={() => { router.push('/userquiz') }}>My Quiz</button>
          <button className="bg-red-500 rounded p-2 font-bold text-white hover:bg-red-700" onClick={() => {
            localStorage.clear();
            router.push('/signin');
          }}>Log Out</button>
          <h1 className="h-10 w-10 rounded-full bg-purple-600 text-white font-bold flex justify-center text-lg 
            place-items-center">{localStorage.getItem('userName')?.[0] ?? ""}
          </h1>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-purple-300 flex justify-center mt-4">Solve Quizzes</h1>
      <div className="bg-black grid grid-cols-1 place-items-center  p-4 gap-4 mt-4">
        {data && (
          data.map((item: QuizTopic, index: number) => (
            <QuizCard key={index} id={item.id} name={item.name} user={item.user.username} />
          ))
        )}
      </div>
    </div>
  )
}