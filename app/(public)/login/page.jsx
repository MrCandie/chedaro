"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@/hooks/usePost";
import { url } from "@/hooks/lib";
import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/PasswordInput";
import { ImSpinner10 } from "react-icons/im";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async (data) => {
    console.log(data);
    toast.success("Login Successful");
    reset();

    if (data?.data?.userType === "admin")
      return router.replace("/admin/employees");

    router.replace("/organization");
  };

  const loginHandler = usePost({
    url: `${url}/v1/auth/login`,
    queryKey: "",
    title: "Login Successful",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    loginHandler.mutate(data);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <Input
          label="Email"
          type="email"
          required
          register={register}
          name="email"
          info={errors.email?.message ? errors.email.message : null}
        />

        <PasswordInput
          id="password"
          label="Password"
          required
          register={register}
          name="password"
          info={errors.password?.message ? errors.password.message : null}
        />

        <button
          type="submit"
          disabled={loginHandler.isPending}
          className="w-full flex items-center gap-2 justify-center cursor-pointer bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login{" "}
          {loginHandler.isPending && (
            <span className="animate-spin">
              <ImSpinner10 />
            </span>
          )}
        </button>
      </form>
    </main>
  );
}
