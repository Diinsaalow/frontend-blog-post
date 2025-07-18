import { useState } from "react";
import AuthForm from "../components/AuthForm";
// import { useSignupMutation } from "../lib/services/authSlice";
// import { setCredentials } from "../lib/features/userSlice";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUp = () => {
  // const [signup, { isLoading }] = useSignupMutation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // Placeholder for loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      // Placeholder for signup logic with Context API
      // const response = await signup(data).unwrap();
      // dispatch(setCredentials(response));
      toast.success("Signed up successfully!");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.data?.message || "An error occurred. Please try again."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md">
            <AuthForm
              type="signup"
              onSubmit={handleSignUp}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
