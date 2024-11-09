import { SessionProvider } from "next-auth/react"
export default async function AuthWrapper({ children }: { children: React.ReactNode }) {
    
    return (
        <div>
                {children}
            
        </div>
    )
}