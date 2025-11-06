import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const donationsList = [
  { id: 1, donor: "ABC Restaurant", category: "Prepared Meals", quantity: "50 meals", date: "2024-01-15", status: "Delivered" },
  { id: 2, donor: "Local Bakery", category: "Bakery", quantity: "100 loaves", date: "2024-01-14", status: "Delivered" },
  { id: 3, donor: "Fresh Market", category: "Vegetables", quantity: "75kg", date: "2024-01-13", status: "Pending" },
  { id: 4, donor: "Daily Dairy", category: "Dairy", quantity: "200L milk", date: "2024-01-12", status: "Delivered" },
  { id: 5, donor: "Fruit Vendor", category: "Fruits", quantity: "150kg", date: "2024-01-11", status: "In Transit" },
];

const Donations = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Donation added successfully!");
    setShowAddForm(false);
  };

  return (
    <div className="page-container">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Donations Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage all food donations</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Donation
          </Button>
        </div>

        {/* Add Donation Form */}
        {showAddForm && (
          <Card className="card-elevated mb-6">
            <CardHeader>
              <CardTitle>New Donation</CardTitle>
              <CardDescription>Record a new food donation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddDonation} className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donor">Donor Name</Label>
                  <Input id="donor" placeholder="Restaurant or donor name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meals">Prepared Meals</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" placeholder="e.g., 50 meals, 100kg" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" required />
                </div>
                <div className="md:col-span-2 flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Donation</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card className="card-elevated mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search donations..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="transit">In Transit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Donations List */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Complete list of all donations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Donor</th>
                    <th className="text-left p-4 font-semibold">Category</th>
                    <th className="text-left p-4 font-semibold">Quantity</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donationsList.map((donation) => (
                    <tr key={donation.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{donation.donor}</td>
                      <td className="p-4 text-muted-foreground">{donation.category}</td>
                      <td className="p-4 text-muted-foreground">{donation.quantity}</td>
                      <td className="p-4 text-muted-foreground">{donation.date}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          donation.status === 'Delivered' ? 'bg-primary/10 text-primary' :
                          donation.status === 'Pending' ? 'bg-secondary/10 text-secondary' :
                          'bg-accent/10 text-accent'
                        }`}>
                          {donation.status}
                        </span>
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

export default Donations;
