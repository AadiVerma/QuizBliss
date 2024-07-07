"use client";
import { useEffect, useState } from "react";
import { setInterval } from "timers";
import { useRouter, useParams } from "next/navigation";
import { LuAlarmClock } from "react-icons/lu";
import Quiz from "@/components/quiz";
import { getparticulartopicquestion, getparticulartopicanswers } from "@/actions/question";
export default function () {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [seconds, setseconds] = useState<number>(0);
    const [minutes, setminutes] = useState<number>(0);
    const [data, setdata] = useState<any>();
    const [answerdata, setanserdata] = useState<any>();
    const [selectdoptions, setselectedoptions] = useState<boolean[][]>([]);
    const handlesubmit = () => {
        if (!answerdata || !selectdoptions.length) {
            console.error("Data not properly loaded.");
            return;
          }
        const total=selectdoptions.length;
        let correct=0;
        let wrong=0;
        
        selectdoptions.forEach((options, index) => {
              let flag=true;
                if(options[0]!==answerdata?.questions[index].options.answers.answer1){
                    flag=false;
                }
                if(options[1]!==answerdata?.questions[index].options.answers.answer2){
                    flag=false;
                }
                if(options[2]!==answerdata?.questions[index].options.answers.answer3){
                    flag=false;
                }
                if(options[3]!==answerdata?.questions[index].options.answers.answer4){
                    flag=false;
                }
                if(flag){
                    correct++;
                }
                else{
                    wrong++;
                }
        })
        router.push(`/result?minutes=${minutes}&seconds=${seconds}&total=${total}&correct=${correct}&wrong=${wrong}`);
    }

    useEffect(() => {
        const fetchdata = async () => {
            const response = await getparticulartopicquestion(id);
            const initialSelectedOptions = response?.questions.map(() => [false, false, false, false]);
            setselectedoptions(initialSelectedOptions||[]);
            setdata(response);
            const ansresponse = await getparticulartopicanswers(id);
            setanserdata(ansresponse);
        }
        fetchdata();
    }, [id])
    useEffect(() => {
        const timer = setInterval(() => {
            setseconds((prevSeconds) => {
                if (prevSeconds === 59) {
                    setminutes((prevMinutes) => (prevMinutes + 1) % 60);
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);
        return clearInterval(timer);
    }, [])
    const formatString = (Time: number) => {
        return Time.toString().padStart(2, "0");
    }
    const renderDigits = (Time: string) => {
        return Time.split('').map((digit, index) => (
            <span key={index} className="p-2 bg-black border-2 border-gray-600 rounded-md mr-1 outline-none">{digit}</span>
        ))
    }
    return (
        <div className="min-h-screen bg-black">
            <div className="flex justify-between bg-black border-b-2 border-gray-500 p-4">
                <h1 className="text-white font-bold text-xl mt-1"><span className="text-3xl text-purple-600">Q</span>uiz<span className="text-3xl text-purple-600">B</span>liss</h1>
                <div className="flex">
                    <LuAlarmClock className="text-3xl text-purple-500 mr-4 " />
                    <div className="text-white mt-1">{renderDigits(formatString(minutes))}</div>
                    <span className=" mr-2 ml-1 mt-1 text-white font-extrabold">:</span>
                    <div className="text-white mt-1">{renderDigits(formatString(seconds))}</div>
                </div>
                <div className="flex gap-4">
                    <button className="bg-purple-500 rounded p-2 font-bold text-white hover:bg-purple-700" onClick={handlesubmit}>Submit</button>
                    <button className="bg-red-500 rounded p-2 font-bold text-white hover:bg-red-700 pl-4 pr-4" onClick={() => router.push('/')}>Quit</button>
                    <h1 className="h-10 w-10 rounded-full bg-purple-600 text-white font-bold flex justify-center text-lg 
            place-items-center">{localStorage.getItem('userName')?[0]:""}
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-1 place-items-center mt-8">
                {data && data.questions.map((d: any, index: number) => (<Quiz question={d.text} option1={d.options.option1} option2={d.options.option2} option3={d.options.option3} option4={d.options.option4}
                questionindex={index} key={index}
                setselectedoptions={setselectedoptions} />
                ))}
            </div>
        </div>
    )
}