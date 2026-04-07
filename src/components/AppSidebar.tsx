import { NavLink, useLocation } from "react-router-dom";
import { Upload, TrendingUp, Headphones } from "lucide-react";

const navItems = [
  { to: "/", icon: Upload, label: "Analyze Call" },
  { to: "/trending", icon: TrendingUp, label: "Trending Issues" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
          <Headphones className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold gradient-text">QA-Bot</h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
            Voice Analytics
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary glow-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;
