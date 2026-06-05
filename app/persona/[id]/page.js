import { getPersonById, formatPerson } from "@/lib/tmdb";
import PersonaPageWrapper from "../personaPageWrapper";

export default async function Page({ params }) {
  const { id } = await params;
  const { details, credits } = await getPersonById(id);
  const persona = formatPerson(details, credits);
  return <PersonaPageWrapper persona={persona} />;
}
