import { useAuthentication } from "@/data/hooks";
import { AuthenticationDomain } from "@/data/usecases";
import { AuthenticationMiddlewareContract } from "@/domain/contracts/authentication";
import { tuple } from "@/infra/lib/tuple-it";
import { LuggageTagStrategy } from "@/main/config/default";
import { makeAuthorization, makeToken } from "@/main/factories/http/authorization.factory";
import { urls } from "@/main/routing";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface SignInPageProps {
  tags: LuggageTagStrategy;
  builder: AuthenticationMiddlewareContract;
}

export default function SignInPage({ builder, tags }: SignInPageProps) {
  const navigate = useNavigate();
  const { http, setSession, storage } = useAuthentication();
  const [formData, setFormData] = React.useState<AuthenticationDomain.Credentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const [error, result] = await tuple(builder.signIn(formData));

      if (error) {
        alert(error);

        return;
      }

      if (result) {
        const { accessToken, refreshToken } = makeAuthorization(result.data);
        storage.setItem(tags["@session"], JSON.stringify(result.data));

        if (refreshToken) {
          storage.setItem(tags["@refreshToken"], refreshToken);
        } else {
          console.error("RefreshToken is undefined or missing.");
        }

        setSession(result.data);
        http.setAuthorization(makeToken({ accessToken }));
        navigate(urls.redirect.DASHBOARD);
      }
    },
    [builder, formData],
  );

  return (
    <div className="h-screen w-full bg-neutral-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
