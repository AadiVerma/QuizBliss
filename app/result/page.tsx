"use client"
import { LuBadgeCheck } from "react-icons/lu";
import { useRouter, useSearchParams } from 'next/navigation';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
export default function () {
    const params=useSearchParams();
    const minutes=params.get('minutes');
    const seconds=params.get('seconds');
    const total=params.get('total');
    const correct=params.get('correct');
    const wrong=params.get('wrong');
    const printRef = useRef<HTMLDivElement>(null);
    const handleDownload = async () => {
        if (printRef.current) {
            const canvas = await html2canvas(printRef.current, {
                ignoreElements: (element) => element.tagName === "BUTTON",
                backgroundColor: null,
                scale: 2
            });
            const newCanvas = document.createElement("canvas");
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;
            const context = newCanvas.getContext("2d");
            if (context) {
                context.fillStyle = "#000000";
                context.fillRect(0, 0, newCanvas.width, newCanvas.height);
                context.drawImage(canvas, 0, 0);
            }

            const imgData = newCanvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("quiz-results.pdf");
        }
    };

    const router = useRouter();
    return (
        <div className="bg-black min-h-screen flex justify-center place-items-center">
            <div ref={printRef} className="text-white border-2 pt-12 pb-12 pl-6 pr-6 rounded-2xl border-purple-400">
                <div className="flex justify-center"><LuBadgeCheck className="text-6xl text-green-500" /></div>
                <h1 className="flex mt-4 justify-center text-md text-green-500">You time was <span className="text-green-500 ml-2">{minutes} minutes and {seconds} seconds</span></h1>
                <h1 className="text-lg mt-2 flex justify-center text-purple-300">There were a total of {total} questions.</h1>
                <h1 className="flex justify-center mt-2 text-purple-300">out of which</h1>
                <h1 className="flex justify-center mt-3 text-green-500">{correct} answers are correct.</h1>
                <h1 className="flex justify-center mt-3 text-red-500">{wrong} answers are wrong.</h1>
                <div>
                    <div className="flex gap-4 mt-5 justify-center">
                        <button className="bg-green-500 text-white p-4 rounded-lg w-full  hover:bg-green-700 font-bold text-lg" onClick={() => { router.push("/") }}>Home</button>
                        <button className="bg-purple-500 p-4 text-white rounded-lg w-full hover:bg-purple-700 font-bold text-lg" onClick={handleDownload}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}