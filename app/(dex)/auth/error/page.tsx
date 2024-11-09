'use client';
import { error } from 'console';
import { useParams, useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();
  const {error} = useParams();
  console.log(error);
  
  let errorMessage = "An unknown error occurred";
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid credentials. Please try again.";
  }

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>
      <button onClick={() => router.push('/auth/signin')}>Back to Sign In</button>
    </div>
  );
}
