import { CardWrapper } from '@/components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const AuthErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <CardWrapper
        headerLabel="Oops! Something went wrong!"
        backButtonHref="/auth/signin"
        backButtonLabel="Back to  Sign In"
      >
        <div className="w-full flex justify-center items-center">
          <ExclamationTriangleIcon className="text-destructive" />
        </div>
      </CardWrapper>
    </div>
  );
};

export default AuthErrorPage;
