"use client";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useUserStore();
  const router = useRouter();

  const handleLogin = async () => {
    const result = await loginWithGoogle();
    if (!result.success) {
      console.error(result.error?.message || "Login failed");
    }
    router.replace("/dashboard");
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-center space-x-2 font-semibold rounded-md py-2 px-4 transition-colors duration-200 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 w-full md:w-auto"
    >
      <FcGoogle size={24} />
      <span>Sign in with Google</span>
    </button>
  );
}
