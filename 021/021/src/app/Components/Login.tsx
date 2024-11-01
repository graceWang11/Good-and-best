import { Button } from '@/components/ui/button';
import { useClerk, useUser } from '@clerk/clerk-react';
import { FaUser } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function LoginButton() {
    const clerk = useClerk();
    const { user, isSignedIn } = useUser();
    const router = useRouter();
    
    // Get user details from Convex
    const userDetails = useQuery(api.user.getUserByEmail, {
      email: user?.primaryEmailAddress?.emailAddress || ""
    });

    // Update Clerk profile if it differs from Convex
    useEffect(() => {
      if (isSignedIn && userDetails && userDetails.userName !== user.fullName) {
        user.update({
          firstName: userDetails.userName.split(' ')[0],
          lastName: userDetails.userName.split(' ').slice(1).join(' '),
        });
      }
    }, [isSignedIn, userDetails, user]);

    if (!isSignedIn) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <FaUser className="text-gray-700" size={24} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem onClick={() => router.push('/sign-in')}>
                        Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/sign-up')}>
                        Create Account
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // If user is admin, redirect to admin console
    if (userDetails?.userType === "Admin") {
        router.push('/admin');
        return null;
    }

    const handleSignOut = async () => {
        await clerk.signOut();
        router.push('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.imageUrl} alt={userDetails?.userName || user.fullName || ""} />
                        <AvatarFallback>
                            <FaUser className="text-gray-700" size={24} />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {userDetails?.userName || user.fullName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.primaryEmailAddress?.emailAddress}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/orders')}>
                    Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LoginButton;
