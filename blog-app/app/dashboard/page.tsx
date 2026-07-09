import { requireSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Protected Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">This page is protected by middleware and server-side session checks.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Signed In User</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{session.name}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Role</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{session.role}</p>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
          {session.role === "ADMIN"
            ? "Admin access enabled: this user can review role-restricted sections."
            : "Standard user session: role-based restrictions can be extended from this baseline."}
        </div>
      </div>
    </main>
  );
}
