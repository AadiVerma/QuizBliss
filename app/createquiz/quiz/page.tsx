"use client";
import { useState } from "react";
import * as React from "react"
import {addQuestion ,addoption,addAnswer} from '@/actions/question';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
export default function Quiz() {
  const [text, settext] = useState("");
  const [option1,setoption1]=useState("");
  const [option2,setoption2]=useState("");
  const [option3,setoption3]=useState("");
  const [option4,setoption4]=useState(""); 
  const [position1, setPosition1] = React.useState("false")
  const [position2, setPosition2] = React.useState("false")
  const [position3, setPosition3] = React.useState("false")
  const [position4, setPosition4] = React.useState("false")
  const route=useRouter();
  const handleSubmit = async () => {
    try {
      const response=await addQuestion(text,localStorage.getItem('topicid')||"");
      const id=response?.id;
      const anotherres=await addoption(option1,option2,option3,option4,id || "");
      const anotherres2=await addAnswer(position1=="true",position2=="true",position3=="true",position4=="true",anotherres?.id || "");
      console.log("response",response);
      console.log("response1",anotherres);
      console.log("response2",anotherres2);
      localStorage.removeItem('topicid');
      route.push('/')
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="flex min-h-screen w-full justify-center place-items-center bg-black">
      <div className="border-2 rounded-2xl p-4 w-[50%] text-white">
        <h1 className="text-3xl font-bold flex justify-center place-items-center">
          Create a Quiz
        </h1>
        <h2 className="flex justify-start place-items-end text-lg mt-6">Question :</h2>
        <input
          className="w-full rounded-lg p-4 bg-transparent mt-2 border-2 outline-none"
          type="text"
          placeholder="Question"
          value={text}
          onChange={(e) => settext(e.target.value)}
        />
        <h1 className="mt-3 text-lg">Options : </h1>
        <div className="flex mt-3 gap-4">
          <input
            className="w-[80%] rounded-lg p-4 bg-transparent border-2 outline-none"
            type="text"
            placeholder="Option 1."
            value={option1}
            onChange={(e) => setoption1(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-[18%] rounded-lg border-2">Status</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={position1} onValueChange={setPosition1}>
                <DropdownMenuRadioItem value="true">True</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="false">False</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex mt-4 gap-4">
          <input
            className="w-[80%] rounded-lg p-4 bg-transparent border-2 outline-none"
            type="text"
            placeholder="Option 2."
            value={option2}
            onChange={(e) => setoption2(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-[18%] rounded-lg border-2">Status</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={position2} onValueChange={setPosition2}>
                <DropdownMenuRadioItem value="true">True</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="false">False</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex mt-4 gap-4">
          <input
            className="w-[80%] rounded-lg p-4 bg-transparent border-2 outline-none"
            type="text"
            placeholder="Option 3."
            value={option3}
            onChange={(e) => setoption3(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-[18%] rounded-lg border-2">Status</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={position3} onValueChange={setPosition3}>
                <DropdownMenuRadioItem value="true">True</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="false">False</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex mt-4 gap-4">
          <input
            className="w-[80%] rounded-lg p-4 bg-transparent border-2 outline-none"
            type="text"
            placeholder="Option 4."
            value={option4}
            onChange={(e) => setoption4(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-[18%] rounded-lg border-2">Status</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={position4} onValueChange={setPosition4}>
                <DropdownMenuRadioItem value="true">True</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="false">False</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-4">
          <button
            className="w-full  rounded-lg p-4  mt-4 text-xl text-white bg-red-500 hover:bg-red-700 outline-none"
           onClick={()=>{
            route.push('/')
           }}>
            Cancel
          </button>
          <button
            type="submit"
            className="w-full  rounded-lg p-4  mt-4 text-xl text-white bg-green-600 hover:bg-green-700 outline-none" onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
