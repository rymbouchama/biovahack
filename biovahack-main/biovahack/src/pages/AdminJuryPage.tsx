import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, LogOut, Pencil } from "lucide-react";

type JuryDomain = "biotech" | "tech" | "business";

type JuryMember = {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  domain: JuryDomain;
  githubUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
};

const API_BASE = "http://localhost:3001";
const TOKEN_KEY = "adminAccessToken";

export default function AdminJuryPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [members, setMembers] = useState<JuryMember[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [showAdd, setShowAdd] = useState(true);
  const [newMember, setNewMember] = useState({
    name: "",
    title: "",
    description: "",
    imageUrl: "",
    domain: "biotech" as JuryDomain,
    githubUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const editingMember = useMemo(
    () => (editingId == null ? null : members.find((m) => m.id === editingId) ?? null),
    [editingId, members]
  );

  const [editForm, setEditForm] = useState({
    name: "",
    title: "",
    description: "",
    imageUrl: "",
    domain: "biotech" as JuryDomain,
    githubUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
  }, []);

  const loadMembers = async (tkn: string) => {
    setFetchError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/jury`, {
        headers: { Authorization: `Bearer ${tkn}` }, // harmless even if GET is public
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load jury");
      setMembers(data.data || []);
    } catch (e: any) {
      setFetchError(e?.message || "Failed to load jury");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) void loadMembers(token);
  }, [token]);

  useEffect(() => {
    if (!editingMember) return;
    setEditForm({
      name: editingMember.name,
      title: editingMember.title,
      description: editingMember.description,
      imageUrl: editingMember.imageUrl,
      domain: editingMember.domain,
      githubUrl: editingMember.githubUrl ?? "",
      twitterUrl: editingMember.twitterUrl ?? "",
      linkedinUrl: editingMember.linkedinUrl ?? "",
    });
  }, [editingMember]);

  const adminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail || !loginPassword) {
      setLoginError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || data?.error || "Login failed");

      if (!data.accessToken) throw new Error("Missing accessToken");
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      setToken(data.accessToken);
    } catch (err: any) {
      setLoginError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setMembers([]);
    setEditingId(null);
  };

  const addMember = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/jury`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newMember,
          githubUrl: newMember.githubUrl,
          twitterUrl: newMember.twitterUrl,
          linkedinUrl: newMember.linkedinUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to add jury member");

      setNewMember({
        name: "",
        title: "",
        description: "",
        imageUrl: "",
        domain: "biotech",
        githubUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
      });

      await loadMembers(token);
    } catch (err: any) {
      alert(err?.message || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id: number) => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/jury/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to delete member");

      await loadMembers(token);
    } catch (err: any) {
      alert(err?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async () => {
    if (!token || editingId == null) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/jury/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update member");

      setEditingId(null);
      await loadMembers(token);
    } catch (err: any) {
      alert(err?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border" style={{ borderColor: "rgba(159,193,59,0.12)", padding: 20, background: "rgba(255,255,255,0.02)" }}>
          <h1 className="text-2xl font-bold mb-3">Admin Login (Jury)</h1>
          <p className="text-sm text-white/60 mb-6">Login to add/edit/delete jury members.</p>

          <form onSubmit={adminLogin} className="space-y-3">
            <input
              className="w-full px-3 py-2 rounded-lg bg-white/5 border"
              style={{ borderColor: "rgba(255,255,255,0.10)", color: "#fff" }}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Admin email"
            />
            <input
              className="w-full px-3 py-2 rounded-lg bg-white/5 border"
              style={{ borderColor: "rgba(255,255,255,0.10)", color: "#fff" }}
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Admin password"
            />

            {loginError && <div className="text-red-400 text-sm">{loginError}</div>}

            <button
              disabled={loading}
              className="w-full py-2 rounded-lg"
              style={{ background: "rgba(159,193,59,0.20)", border: "1px solid rgba(159,193,59,0.35)", color: "#9FC13B" }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Jury Admin</h1>
            <p className="text-sm text-white/60">Add/edit/delete jury members.</p>
          </div>
          <button
            onClick={adminLogout}
            className="px-3 py-2 rounded-lg flex items-center gap-2"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#fff" }}
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {fetchError && <div className="mb-4 text-red-400">{fetchError}</div>}

        {/* Add */}
        <div className="mb-6 rounded-2xl border p-4" style={{ borderColor: "rgba(159,193,59,0.12)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Add Member</div>
            <button
              onClick={() => setShowAdd((v) => !v)}
              className="px-3 py-2 rounded-lg flex items-center gap-2"
              style={{ background: "rgba(159,193,59,0.12)", border: "1px solid rgba(159,193,59,0.35)", color: "#9FC13B" }}
            >
              <Plus className="w-4 h-4" /> {showAdd ? "Hide" : "Show"}
            </button>
          </div>

          {showAdd && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
              <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} placeholder="Title" value={newMember.title} onChange={(e) => setNewMember({ ...newMember, title: e.target.value })} />
              <textarea className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} placeholder="Description" value={newMember.description} onChange={(e) => setNewMember({ ...newMember, description: e.target.value })} />
              <input className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} placeholder="Image URL" value={newMember.imageUrl} onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })} />

              <select
                className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white"
                style={{ borderColor: "rgba(255,255,255,0.10)" }}
                value={newMember.domain}
                onChange={(e) => setNewMember({ ...newMember, domain: e.target.value as JuryDomain })}
              >
                <option value="biotech">biotech</option>
                <option value="tech">tech</option>
                <option value="business">business</option>
              </select>

              <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} placeholder="GitHub URL (optional)" value={newMember.githubUrl} onChange={(e) => setNewMember({ ...newMember, githubUrl: e.target.value })} />
              <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} placeholder="Twitter URL (optional)" value={newMember.twitterUrl} onChange={(e) => setNewMember({ ...newMember, twitterUrl: e.target.value })} />
              <input className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} placeholder="LinkedIn URL (optional)" value={newMember.linkedinUrl} onChange={(e) => setNewMember({ ...newMember, linkedinUrl: e.target.value })} />

              <div className="md:col-span-2 flex gap-3">
                <button
                  onClick={addMember}
                  disabled={loading}
                  className="flex-1 py-2 rounded-lg"
                  style={{ background: "rgba(159,193,59,0.20)", border: "1px solid rgba(159,193,59,0.35)", color: "#9FC13B" }}
                >
                  {loading ? "Adding..." : "Add Member"}
                </button>
                <button
                  onClick={() =>
                    setNewMember({
                      name: "",
                      title: "",
                      description: "",
                      imageUrl: "",
                      domain: "biotech",
                      githubUrl: "",
                      twitterUrl: "",
                      linkedinUrl: "",
                    })
                  }
                  className="py-2 px-4 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#fff" }}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Members */}
        <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(159,193,59,0.12)", background: "rgba(255,255,255,0.02)" }}>
          <div className="font-semibold mb-3">Current Members</div>

          {members.length === 0 && <div className="text-sm text-white/60">No jury members yet.</div>}

          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.id} className="border rounded-xl p-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {editingId === m.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                    <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                    <textarea className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                    <input className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} value={editForm.imageUrl} onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })} />

                    <select
                      className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white"
                      style={{ borderColor: "rgba(255,255,255,0.10)" }}
                      value={editForm.domain}
                      onChange={(e) => setEditForm({ ...editForm, domain: e.target.value as JuryDomain })}
                    >
                      <option value="biotech">biotech</option>
                      <option value="tech">tech</option>
                      <option value="business">business</option>
                    </select>

                    <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} value={editForm.githubUrl} onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })} placeholder="GitHub URL" />
                    <input className="px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} value={editForm.twitterUrl} onChange={(e) => setEditForm({ ...editForm, twitterUrl: e.target.value })} placeholder="Twitter URL" />
                    <input className="md:col-span-2 px-3 py-2 rounded-lg bg-white/5 border text-white" style={{ borderColor: "rgba(255,255,255,0.10)" }} value={editForm.linkedinUrl} onChange={(e) => setEditForm({ ...editForm, linkedinUrl: e.target.value })} placeholder="LinkedIn URL" />

                    <div className="md:col-span-2 flex gap-3">
                      <button
                        onClick={saveEdit}
                        className="flex-1 py-2 rounded-lg"
                        style={{ background: "rgba(159,193,59,0.20)", border: "1px solid rgba(159,193,59,0.35)", color: "#9FC13B" }}
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="py-2 px-4 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#fff" }}
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-sm text-white/60">{m.title}</div>
                      <div className="text-xs text-white/40 mt-1">Domain: {m.domain}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(m.id)}
                        className="px-3 py-2 rounded-lg flex items-center gap-2"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#fff" }}
                        type="button"
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </button>

                      <button
                        onClick={() => deleteMember(m.id)}
                        className="px-3 py-2 rounded-lg flex items-center gap-2"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#fff" }}
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}