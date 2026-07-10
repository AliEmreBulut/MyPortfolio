"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  // Login sayfasındaysak Sidebar'ı (iskeleti) GÖSTERME
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Profil (User)", href: "/admin/profile" },
    { label: "Deneyimler", href: "/admin/experiences" },
    { label: "Kategoriler", href: "/admin/categories" },
    { label: "Projeler", href: "/admin/projects" },
    { label: "Yetenekler (Skills)", href: "/admin/skills" },
  ];

  return (
    <div className="min-h-screen flex bg-[#030508] text-slate-300 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-white/5 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <h2 className="text-xl font-black text-white">Yönetim Paneli</h2>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-bold transition-colors ${pathname === item.href ? 'bg-brand-green/20 text-brand-green' : 'hover:bg-white/5 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-bold transition-colors text-left"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center px-8 border-b border-white/10 bg-white/5">
          <h1 className="text-lg font-bold text-white">
            {menuItems.find(m => m.href === pathname)?.label || "Admin Paneli"}
          </h1>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}
