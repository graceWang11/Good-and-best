import { useClerk, useSignIn } from '@clerk/clerk-react';

function LoginButton() {
    const { openSignIn } = useClerk(); // Use Clerk's hook to open the sign-in modal

  const handleLogin = () => {
    openSignIn();
  };

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}

export default LoginButton;
