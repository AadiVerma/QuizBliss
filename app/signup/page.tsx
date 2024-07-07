"use client";
import { signup } from "@/actions/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const router = useRouter();
  const handleSubmission = async () => {
    const response = await signup(username, email, password);
    if (response) {
      localStorage.setItem("userId", response.id);
      localStorage.setItem("userName", response.username);
      router.push("/");
    } else {
      alert("Failed to signup");
    }
  };
  return (
    <div className="flex min-h-screen w-full justify-center place-items-center bg-black">
      <div className="border-2 rounded-2xl p-4 w-[50%] text-white">
        <h1 className="text-3xl font-bold flex justify-center place-items-center text-purple-500">
          Sign Up
        </h1>
        <h2 className="flex justify-center place-items-end text-purple-300">
          Already have an account ?{" "}
          <span
            className="underline ml-2 cursor-pointer"
            onClick={() => {
              router.push("/signin");
            }}
          >
            SignIn
          </span>
        </h2>
        <input
          className="w-full rounded-lg p-4 bg-transparent mt-4 border-2 outline-none"
          type="text"
          placeholder="UserName"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className="w-full rounded-lg p-4 bg-transparent mt-4 border-2 outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-lg p-4 bg-transparent mt-4 border-2 outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-lg p-4 bg-purple-500 mt-4 text-2xl text-white hover:bg-purple-700 outline-none font-bold"
          onClick={handleSubmission}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
