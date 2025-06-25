import { useParams, Link } from "react-router";
const ErrorPage = () => {
  let { errorId } = useParams();
  if (!errorId) errorId = "404";

  const errorMessages = {
    401: "Utilisateur non authentifié",
    403: "Accès refusé",
    404: "Oups! La page que vous demandez n'existe pas.",
    500: "Échec de la récupération des données",
    502: "Erreur de passerelle",
    503: "Service indisponible",
    504: "Délai d’attente de la passerelle dépassé",
  };

  const errorMessage = errorMessages[errorId] || "Erreur inconnue";
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-5xl text-base font-semibold text-indigo-600 sm:text-7xl">
          {errorId}
        </p>
        <h1 className="mt-4 font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          {errorMessage}
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            to={"/"}
          >
            Retournez sur la page d'accueil
          </Link>
        </div>
      </div>
    </main>
  );
};
export default ErrorPage;
