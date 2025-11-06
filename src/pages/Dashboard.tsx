import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Package, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-donation.jpg";

const stats = [
  {
    title: "Total Donations",
    value: "1,234",
    description: "This month",
    icon: Heart,
    trend: "+12%",
    color: "text-primary",
  },
  {
    title: "Meals Served",
    value: "8,456",
    description: "Children fed",
    icon: Users,
    trend: "+18%",
    color: "text-secondary",
  },
  {
    title: "Active Inventory",
    value: "456",
    description: "Items available",
    icon: Package,
    trend: "+5%",
    color: "text-accent",
  },
  {
    title: "Waste Reduced",
    value: "2.3 tons",
    description: "This month",
    icon: TrendingUp,
    trend: "+23%",
    color: "text-primary",
  },
];

const Dashboard = () => {
  return (
    <div className="page-container">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 flex items-center">
          <div className="content-wrapper text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back! 👋</h1>
            <p className="text-lg md:text-xl opacity-95">
              Together we're making a difference in reducing food waste and feeding communities
            </p>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="card-elevated stat-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                  <p className="text-sm font-semibold text-primary mt-2">{stat.trend} from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest contributions from donors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { donor: "ABC Restaurant", items: "50 meals", time: "2 hours ago" },
                  { donor: "Local Bakery", items: "100 bread loaves", time: "5 hours ago" },
                  { donor: "Fresh Market", items: "75kg vegetables", time: "1 day ago" },
                ].map((donation, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{donation.donor}</p>
                      <p className="text-sm text-muted-foreground">{donation.items}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{donation.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "New Donation", color: "bg-primary" },
                  { label: "Update Inventory", color: "bg-secondary" },
                  { label: "View Reports", color: "bg-accent" },
                  { label: "Manage Users", color: "bg-primary" },
                ].map((action, i) => (
                  <button
                    key={i}
                    className={`${action.color} text-white p-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
