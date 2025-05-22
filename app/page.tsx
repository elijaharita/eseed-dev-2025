import { redirect } from "next/navigation";

export default function Page() {
  redirect("/experiments/detachable-player");

  return <div></div>;
}
