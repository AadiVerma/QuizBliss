"use client"

interface param {
  text: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  answer1: boolean,
  answer2: boolean,
  answer3: boolean,
  answer4: boolean
}
export default function UserQuizes({ text, option1, option2, option3, option4, answer1, answer2, answer3, answer4 }: param) {
  return (
    <div className="border-2 rounded-md p-4 w-[50%] mb-4">
      <h1 className="text-white text-2xl font-bold mb-4">Q.{text}</h1>
      <div className="grid grid-cols-2 gap-10 mt-4">
        <div className="flex items-center">
          <label className="relative flex items-center">
            <input
              type="checkbox"
              className="absolute w-0 h-0 opacity-0"
              checked={answer1}
              readOnly
            />
            <span className={`flex items-center justify-center h-6 w-6 border-2 rounded-md ${answer1 ? "bg-green-500 border-green-500" : "bg-gray-800 border-gray-600"}`}>
              {answer1 && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
            </span>
            <span className={`ml-2 ${answer1 ? "text-green-500" : "text-gray-400"}`}>
              {option1}
            </span>
          </label>
        </div>
        <div>
          <label className="relative flex items-center">
            <input
              type="checkbox"
              className="absolute w-0 h-0 opacity-0"
              checked={answer1}
              readOnly
            />
            <span className={`flex items-center justify-center h-6 w-6 border-2 rounded-md ${answer2 ? "bg-green-500 border-green-500" : "bg-gray-800 border-gray-600"}`}>
              {answer2 && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
            </span>
            <span className={`ml-2 ${answer2 ? "text-green-500" : "text-gray-400"}`}>
              {option2}
            </span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-10">
        <div className="flex items-center">
        <label className="relative flex items-center">
          <input
            type="checkbox"
            className="absolute w-0 h-0 opacity-0"
            checked={answer1}
            readOnly
          />
          <span className={`flex items-center justify-center h-6 w-6 border-2 rounded-md ${answer3 ? "bg-green-500 border-green-500" : "bg-gray-800 border-gray-600"}`}>
            {answer3 && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
          </span>
          <span className={`ml-2 ${answer3 ? "text-green-500" : "text-gray-400"}`}>
            {option3}
          </span>
        </label>
      </div>
      <div>
        <label className="relative flex items-center">
          <input
            type="checkbox"
            className="absolute w-0 h-0 opacity-0"
            checked={answer4}
            readOnly
          />
          <span className={`flex items-center justify-center h-6 w-6 border-2 rounded-md ${answer4 ? "bg-green-500 border-green-500" : "bg-gray-800 border-gray-600"}`}>
            {answer4 && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
          </span>
          <span className={`ml-2 ${answer4 ? "text-green-500" : "text-gray-400"}`}>
            {option4}
          </span>
        </label>
      </div>
      </div>
    </div>);
}