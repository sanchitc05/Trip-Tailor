import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForgotPassword, useSignIn, useSignUp } from "@/hooks/useAuth";
import { forgotPasswordSchema, signInSchema, signUpSchema } from "@/utils/validation";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function AuthPage({ mode = "signin" }) {
  const titleMap = { signin: "Sign In", signup: "Sign Up", forgot: "Forgot Password" };
  usePageTitle(titleMap[mode]);
  const navigate = useNavigate();
  const signIn = useSignIn();
  const signUp = useSignUp();
  const forgotPassword = useForgotPassword();
  const schemaMap = { signin: signInSchema, signup: signUpSchema, forgot: forgotPasswordSchema };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaMap[mode]),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values) => {
    if (mode === "signin") {
      await signIn.mutateAsync(values);
      navigate("/dashboard");
    } else if (mode === "signup") {
      await signUp.mutateAsync(values);
      navigate("/auth/sign-in");
    } else {
      await forgotPassword.mutateAsync(values);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card>
        <h1 className="text-2xl font-semibold">{titleMap[mode]}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3">
          {mode === "signup" && <Input placeholder="Full name" {...register("name")} />}
          {errors.name && <p className="text-xs text-rose-300">{errors.name.message}</p>}
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-xs text-rose-300">{errors.email.message}</p>}
          {mode !== "forgot" && <Input type="password" placeholder="Password" {...register("password")} />}
          {errors.password && <p className="text-xs text-rose-300">{errors.password.message}</p>}
          <Button type="submit" className="w-full">{titleMap[mode]}</Button>
        </form>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="ghost">Google</Button>
          <Button variant="ghost">GitHub</Button>
        </div>
        {mode === "signin" && <Link className="mt-4 block text-sm text-slate-300 hover:text-white" to="/auth/forgot-password">Forgot password?</Link>}
      </Card>
    </div>
  );
}
