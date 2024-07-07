"use client"
import { Checkbox } from "@/components/ui/checkbox"
interface param {
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    questionindex: number
    setselectedoptions: React.Dispatch<React.SetStateAction<boolean[][]>>;
}
export default function Quiz({ question, option1, option2, option3, option4, setselectedoptions,questionindex }: param) {
    const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
        setselectedoptions((prevOptions: boolean[][]) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[questionIndex][optionIndex] = !updatedOptions[questionIndex][optionIndex];
            return updatedOptions;
        });
    };
    return (
        <div className="bg-[#121212] p-4 rounded-lg border-2 outline-none w-[40%] border-gray-700 mb-2 mt-4">
            <h1 className="text-2xl font-bold text-white">Q. {question}</h1>
            <div className="grid grid-cols-2 mt-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="border-white" onCheckedChange={()=>{
                        handleOptionSelect(questionindex, 0)}} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                        {option1}
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="border-white" onCheckedChange={() => handleOptionSelect(questionindex, 1)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                        {option2}
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-2 mt-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="border-white" onCheckedChange={() => handleOptionSelect(questionindex, 2)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                        {option3}
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="border-white" onCheckedChange={() =>handleOptionSelect(questionindex, 3)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                    >
                        {option4}
                    </label>
                </div>
            </div>
        </div>
    )
}