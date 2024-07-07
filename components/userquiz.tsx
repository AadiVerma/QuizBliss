"use client"
import { useEffect, useState } from "react"
import { myquiz ,DeleteQuiz} from '@/actions/bulkquiz';
import { useRouter } from "next/navigation";
export default function userQuiz() {
    const [data, setdata] = useState<any>();
    const router = useRouter();
    useEffect(() => {
        const fetch = async () => {
            const id = localStorage.getItem('userId');
            const response = await myquiz(id || "");
            console.log(response);
            setdata(response?.userQuizzes);
        }
        fetch();
    }, []);
    return (
        <div className="bg-black min-h-screen">
            <div className="flex justify-between bg-black border-b-2 border-gray-500 p-4">
            <h1 className="text-white cursor-pointer font-bold text-xl mt-1" onClick={()=>{
                    router.push('/')
                }}><span className="text-3xl text-purple-600">Q</span>uiz<span className="text-3xl text-purple-600">B</span>liss</h1>
                <div className="flex gap-4">
                    <button className="bg-purple-500 rounded p-2 font-bold text-white hover:bg-purple-700" onClick={() => { router.push('/createquiz') }}>Add Quiz</button>
                    <button className="bg-red-500 rounded p-2 font-bold text-white hover:bg-red-700" onClick={()=>{
                        localStorage.clear();
                        router.push('/signin');
                    }}>Log Out</button>
                    <h1 className="h-10 w-10 rounded-full bg-purple-600 text-white font-bold flex justify-center text-lg 
            place-items-center">{localStorage.getItem('userName')?.[0] ?? ""}
                    </h1>
                </div>
            </div>
            <h1 className="text-purple-300 text-4xl font-bold flex justify-center mt-6">Your Quizzes</h1>
            <div className="grid grid-cols-1 place-items-center gap-6 mt-10">
                {data && data.map((d: any) => {
                    return (
                        <div className="bg-[#121212] p-4 rounded-lg border-2 outline-none w-[35%] border-gray-700 ">
                            <div className="flex gap-2">
                                <h1 className="h-6 w-6 rounded-full bg-purple-600 text-white font-bold flex justify-center text-sm 
            place-items-center">{d.user.username[0]}</h1>
                                <h2 className="font-medium text-white">{d.user.username}</h2>
                            </div>
                            <h1 className="text-4xl font-bold mt-4 text-white ">{d.name}</h1>
                            <div className="flex justify-end gap-4">
                                <button className="bg-red-500 w-full mt-4 rounded p-2 font-bold text-white text-lg hover:bg-red-700" onClick={async()=>{
                                    await DeleteQuiz(d.id);
                                }}>Delete</button>
                                <button className="bg-purple-500 w-full mt-4 rounded p-2 font-bold text-white text-lg hover:bg-purple-700" onClick={()=>router.push(`/userquiz/${d.id}`)}>Add</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}