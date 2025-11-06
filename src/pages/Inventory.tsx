import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, CheckCircle2 } from "lucide-react";

const inventoryItems = [
  { id: 1, name: "Fresh Vegetables", quantity: 150, unit: "kg", status: "Good", expiry: "3 days", category: "Produce" },
  { id: 2, name: "Rice", quantity: 200, unit: "kg", status: "Good", expiry: "30 days", category: "Grains" },
  { id: 3, name: "Canned Beans", quantity: 500, unit: "cans", status: "Good", expiry: "180 days", category: "Canned" },
  { id: 4, name: "Fresh Milk", quantity: 50, unit: "liters", status: "Expiring Soon", expiry: "2 days", category: "Dairy" },
  { id: 5, name: "Bread Loaves", quantity: 80, unit: "loaves", status: "Good", expiry: "5 days", category: "Bakery" },
  { id: 6, name: "Pasta", quantity: 120, unit: "kg", status: "Good", expiry: "90 days", category: "Grains" },
  { id: 7, name: "Fresh Fruits", quantity: 100, unit: "kg", status: "Expiring Soon", expiry: "2 days", category: "Produce" },
  { id: 8, name: "Cooking Oil", quantity: 75, unit: "liters", status: "Good", expiry: "120 days", category: "Cooking" },
];

const Inventory = () => {
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const expiringSoon = inventoryItems.filter(item => item.status === "Expiring Soon").length;
  const categories = [...new Set(inventoryItems.map(item => item.category))].length;

  return (
    <div className="page-container">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage food inventory</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elevated stat-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
              <Package className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalItems}</div>
              <p className="text-sm text-muted-foreground mt-1">Across {categories} categories</p>
            </CardContent>
          </Card>

          <Card className="card-elevated border-2 border-secondary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expiring Soon</CardTitle>
              <AlertTriangle className="w-5 h-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{expiringSoon}</div>
              <p className="text-sm text-muted-foreground mt-1">Items need attention</p>
            </CardContent>
          </Card>

          <Card className="card-elevated border-2 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Good Stock</CardTitle>
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{inventoryItems.length - expiringSoon}</div>
              <p className="text-sm text-muted-foreground mt-1">Items in good condition</p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory List */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
            <CardDescription>All items in stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Item Name</th>
                    <th className="text-left p-4 font-semibold">Category</th>
                    <th className="text-left p-4 font-semibold">Quantity</th>
                    <th className="text-left p-4 font-semibold">Expiry</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4">
                        <Badge variant="outline">{item.category}</Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-4 text-muted-foreground">{item.expiry}</td>
                      <td className="p-4">
                        <Badge
                          className={
                            item.status === "Good"
                              ? "bg-primary/10 text-primary hover:bg-primary/20"
                              : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
