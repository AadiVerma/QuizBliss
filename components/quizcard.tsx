"use client"
interface param{
    id:string,
    name:string,
    user:string
}
import {useRouter} from 'next/navigation'
export default function QuizCard({id,name,user}:param){
    const router=useRouter();
    return(
        <div className="bg-[#121212] p-4 rounded-lg border-2 outline-none w-[35%] border-gray-700">
            <div className="flex gap-2">
            <h1 className="h-6 w-6 rounded-full bg-purple-600 text-white font-bold flex justify-center text-sm
            place-items-center">{user[0]}</h1>
            <h2 className="font-medium text-white">{user}</h2>
            </div>
            <h1 className="text-4xl font-bold mt-4 text-white ">{name}</h1>
            <div className="flex justify-end">
            <button className="bg-purple-500 w-full mt-4 rounded p-2 font-bold text-white text-lg hover:bg-purple-700" onClick={()=>{
                router.push(`/solvequiz/${id}`)
            }}>Solve</button>
            </div>
        </div>)
}