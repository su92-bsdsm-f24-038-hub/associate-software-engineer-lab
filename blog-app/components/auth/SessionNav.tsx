import Link from "next/link";
import { logoutAction } from "@/lib/auth/actions";
import { readSession } from "@/lib/auth/session";

export default async function SessionNav() {
  const session = await readSession();

  if (!session) {
    return (
      <Link href="/login" className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/dashboard" className="text-xs font-semibold text-slate-700 hover:text-slate-900">
        Dashboard
      </Link>
      <span className="text-xs text-slate-600">{session.name} ({session.role})</span>
      <form action={logoutAction}>
        <button type="submit" className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">
          Logout
        </button>
      </form>
    </div>
  );
}
