"use client"
import { questionsofquiz } from "@/actions/bulkquiz";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserQuizes from "@/components/usersquizes";
import { useRouter } from "next/navigation";
interface OptionData {
    questions: {
        text: string;
        options: {
            option1: string;
            option2: string;
            option3: string;
            option4: string;
            answers: {
                answer1: boolean;
                answer2: boolean;
                answer3: boolean;
                answer4: boolean;
            } | null;
        } | null;
    }[];
}
interface QuestionData {
    text: string;
    options: OptionData | null;
}
interface QuizData {
    questions: QuestionData[];
}
export default function () {
    localStorage.removeItem('topicid');
    const router=useRouter();
    const [datas, setdata] = useState<any>();
    const param = useParams();
    const id = param.id as string;
    useEffect(() => {
        const fetch = async () => {
            const response = await questionsofquiz(id);
            console.log(response);
            setdata(response);
        }
        fetch();
    }, [])
    return (
        <div className="bg-black min-h-screen">
            <div className="flex justify-between bg-black border-b-2 border-gray-500 p-4">
                <h1 className="text-white cursor-pointer font-bold text-xl mt-1" onClick={()=>{
                    router.push('/')
                }}><span className="text-3xl text-purple-600">Q</span>uiz<span className="text-3xl text-purple-600">B</span>liss</h1>
                <div className="flex gap-4">
                    <button className="bg-green-500 rounded p-2 font-bold pl-6 pr-6 text-white hover:bg-green-700" onClick={()=>{
                        localStorage.setItem('topicid',id);
                        router.push('/createquiz/quiz');
                    }}>Add</button>
                    <button className="bg-purple-500 rounded p-2 font-bold text-white hover:bg-purple-700" onClick={()=>router.push('/userquiz')} >All Quiz</button>
                    <button className="bg-red-500 rounded p-2 font-bold text-white hover:bg-red-700" onClick={()=>{
                        localStorage.clear();
                        router.push('/signin');
                    }}>Log Out</button>
                    <h1 className="h-10 w-10 rounded-full bg-purple-600 text-white font-bold flex justify-center text-lg 
            place-items-center">{localStorage.getItem('userName')?.[0] ?? ""}
                    </h1>
                </div>
            </div>
            <div className="mt-10 w-full flex justify-center flex-wrap gap-4">
                {datas && datas.questions.map((d: any) =>
                    <UserQuizes text={d.text} option1={d.options?.option1}
                        option2={d.options?.option2}
                        option3={d.options?.option3}
                        option4={d.options?.option4}
                        answer1={d.options?.answers?.answer1}
                        answer2={d.options?.answers?.answer2}
                        answer3={d.options?.answers?.answer3}
                        answer4={d.options?.answers?.answer4} />
                )}
            </div>
        </div>
    )
}