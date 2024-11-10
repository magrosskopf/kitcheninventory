"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {

    //setUsername("info@magrosskopf.de")
    //setPassword("$2b$10$D4G5f18o7aMMfwasBl3FvOvGexx2F9LP2on1B47ZZBiWNKjvCnF2a")
  },[])
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/inventar", // Weiterleitung nach Anmeldung
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          defaultValue={process.env.USERNAME}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          defaultValue={process.env.PASSWORD}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

