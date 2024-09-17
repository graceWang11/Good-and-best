import { Button } from '@/components/ui/button';
import { useClerk, useSignIn } from '@clerk/clerk-react';
import { FaUser } from 'react-icons/fa';

function LoginButton() {
    const { openSignIn } = useClerk(); // Use Clerk's hook to open the sign-in modal

  const handleLogin = () => {
    openSignIn();
  };

  return (
    <Button variant="ghost" onClick={handleLogin}>
      <FaUser className="text-gray-700" size={24} /> {/* User Icon */}
    </Button>
  );
}

export default LoginButton;
