import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

// Generate random analytics data
const generateMonthlyAnalysis = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = months[new Date().getMonth()];
  
  const totalDonations = Math.floor(Math.random() * 500) + 800;
  const mealsServed = Math.floor(Math.random() * 5000) + 5000;
  const wasteReduced = (Math.random() * 3 + 1).toFixed(1);
  const newDonors = Math.floor(Math.random() * 30) + 20;
  
  const donationGrowth = (Math.random() * 30 - 5).toFixed(1);
  const mealGrowth = (Math.random() * 40 - 5).toFixed(1);
  const wasteGrowth = (Math.random() * 50 + 10).toFixed(1);
  
  return {
    month: currentMonth,
    totalDonations,
    mealsServed,
    wasteReduced,
    newDonors,
    donationGrowth: parseFloat(donationGrowth),
    mealGrowth: parseFloat(mealGrowth),
    wasteGrowth: parseFloat(wasteGrowth),
  };
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState(generateMonthlyAnalysis());

  useEffect(() => {
    // Regenerate analytics every time component mounts
    setAnalytics(generateMonthlyAnalysis());
  }, []);

  const refreshAnalytics = () => {
    setAnalytics(generateMonthlyAnalysis());
  };

  const StatCard = ({ title, value, growth, icon: Icon }: any) => {
    const isPositive = growth >= 0;
    return (
      <Card className="card-elevated stat-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="w-5 h-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{value}</div>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-primary" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-sm font-semibold ${isPositive ? 'text-primary' : 'text-destructive'}`}>
              {Math.abs(growth)}% from last month
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="page-container">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Performance insights for {analytics.month}</p>
          </div>
          <button
            onClick={refreshAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Refresh Data
          </button>
        </div>

        {/* Monthly Summary */}
        <Card className="card-elevated mb-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Monthly Summary - {analytics.month}</CardTitle>
            <CardDescription>Automatically generated performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-foreground leading-relaxed">
                This month has been exceptional for our food donation program. We've successfully processed{" "}
                <strong className="text-primary">{analytics.totalDonations} donations</strong>, which is a{" "}
                <strong className={analytics.donationGrowth >= 0 ? "text-primary" : "text-destructive"}>
                  {Math.abs(analytics.donationGrowth)}% {analytics.donationGrowth >= 0 ? "increase" : "decrease"}
                </strong>{" "}
                compared to last month. Through these generous contributions, we've been able to serve{" "}
                <strong className="text-secondary">{analytics.mealsServed.toLocaleString()} meals</strong> to children and families in need.
              </p>
              <p className="text-foreground leading-relaxed mt-4">
                Our waste reduction efforts have been particularly successful, preventing{" "}
                <strong className="text-accent">{analytics.wasteReduced} tons of food</strong> from going to waste - a remarkable{" "}
                <strong className="text-primary">{analytics.wasteGrowth}% improvement</strong> from the previous month.
                We've also welcomed <strong className="text-primary">{analytics.newDonors} new donors</strong> to our platform this month,
                expanding our network of food providers and strengthening our community impact.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Donations"
            value={analytics.totalDonations}
            growth={analytics.donationGrowth}
            icon={TrendingUp}
          />
          <StatCard
            title="Meals Served"
            value={analytics.mealsServed.toLocaleString()}
            growth={analytics.mealGrowth}
            icon={TrendingUp}
          />
          <StatCard
            title="Waste Reduced"
            value={`${analytics.wasteReduced} tons`}
            growth={analytics.wasteGrowth}
            icon={TrendingUp}
          />
          <StatCard
            title="New Donors"
            value={analytics.newDonors}
            growth={15}
            icon={TrendingUp}
          />
        </div>

        {/* Category Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Donation Categories</CardTitle>
              <CardDescription>Distribution by food type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Prepared Meals", percentage: 35, color: "bg-primary" },
                  { category: "Fresh Produce", percentage: 28, color: "bg-secondary" },
                  { category: "Bakery Items", percentage: 20, color: "bg-accent" },
                  { category: "Dairy Products", percentage: 17, color: "bg-primary/60" },
                ].map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Impact Metrics</CardTitle>
              <CardDescription>Community benefit analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Children Fed</p>
                    <p className="text-2xl font-bold text-primary">{(analytics.mealsServed * 0.6).toFixed(0)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Families Helped</p>
                    <p className="text-2xl font-bold text-primary">{Math.floor(analytics.totalDonations / 5)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">CO2 Saved</p>
                    <p className="text-2xl font-bold text-secondary">{(parseFloat(analytics.wasteReduced) * 2.5).toFixed(1)} tons</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Active Partners</p>
                    <p className="text-2xl font-bold text-secondary">{analytics.newDonors + 45}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
