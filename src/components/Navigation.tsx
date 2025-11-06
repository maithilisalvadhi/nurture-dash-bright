import { Link, useLocation } from "react-router-dom";
import { Home, Package, TrendingUp, Users, Settings, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/donations", icon: Heart, label: "Donations" },
  { to: "/inventory", icon: Package, label: "Inventory" },
  { to: "/analytics", icon: TrendingUp, label: "Analytics" },
  { to: "/admin", icon: Settings, label: "Admin" },
];

export const Navigation = () => {
  const location = useLocation();

  const handleLogout = () => {
    // In real app, clear auth tokens here
    window.location.href = "/";
  };

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Heart className="w-6 h-6 fill-primary" />
              <span>FoodShare</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link key={item.to} to={item.to}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "gap-2 transition-all",
                        isActive && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
