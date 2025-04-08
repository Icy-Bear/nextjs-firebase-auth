import GoogleLoginButton from "@/components/ui/GoogleLoginButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black transition-colors duration-300">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-10">
        Templete Login Page
      </h1>
      <div className="flex flex-col gap-4">
        <GoogleLoginButton />
      </div>
    </div>
  );
}
