import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/state/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = await login(username.trim(), password);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("Identifiants invalides. Veuillez vérifier votre nom d'utilisateur et mot de passe.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--light-grey))] p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md border border-border p-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-md bg-[hsl(var(--bg))] flex items-center justify-center text-white font-bold">F</div>
          <div>
            <h1 className="text-lg font-bold">FIDUCIAL Sécurité Conseil</h1>
            <p className="text-sm text-[hsl(var(--fiducial-grey))]">Audit Tracking Portal – SPB &amp; PRISCOP</p>
          </div>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-[hsl(var(--fiducial-grey))]">Nom d'utilisateur</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-md border border-border p-2 bg-white"
            placeholder="Entrez votre nom d'utilisateur"
          />

          <label className="block mt-4 text-sm font-medium text-[hsl(var(--fiducial-grey))]">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-border p-2 bg-white"
            placeholder="Mot de passe"
          />

          <div className="flex items-center justify-between mt-4">
            <button type="submit" className="px-4 py-2 bg-[hsl(var(--bg))] text-white rounded-md font-medium">Se connecter</button>
            <a className="text-sm text-[hsl(var(--fiducial-grey))]">Mot de passe oublié?</a>
          </div>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

          <div className="mt-4 text-xs text-[hsl(var(--fiducial-grey))]">Pour la démo utilisez: <strong>admin / password</strong></div>
        </form>
      </div>
    </div>
  );
}
