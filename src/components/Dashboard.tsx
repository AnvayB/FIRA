import { useState, useRef } from 'react';
import { Search, Filter, AlertTriangle, TrendingUp, Users, DollarSign, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CustomerTable } from '@/components/CustomerTable';
import { CustomerDetailsModal } from '@/components/CustomerDetailsModal';
import { mockCustomers } from '@/data/mockCustomers';
import { Customer } from '@/types/customer';

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const riskStats = {
    high: customers.filter(c => c.riskRating === 'high').length,
    medium: customers.filter(c => c.riskRating === 'medium').length,
    low: customers.filter(c => c.riskRating === 'low').length,
  };

  const amlAlerts = customers.reduce((acc, customer) => acc + customer.amlFlags.length, 0);
  const totalBalance = customers.reduce((acc, customer) => acc + customer.accountBalance, 0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        
        if (!Array.isArray(jsonData)) {
          alert('Invalid JSON format. Please upload an array of customer objects.');
          return;
        }

        // Basic validation to ensure the data structure is correct
        const isValidData = jsonData.length > 0 && jsonData.every((item: unknown) => {
          if (typeof item !== 'object' || item === null) return false;
          const customer = item as Record<string, unknown>;
          return (
            typeof customer.id === 'string' &&
            typeof customer.name === 'string' &&
            typeof customer.city === 'string' &&
            ['high', 'medium', 'low'].includes(customer.riskRating as string) &&
            typeof customer.creditScore === 'number' &&
            typeof customer.accountBalance === 'number' &&
            typeof customer.transactionVolume === 'number' &&
            Array.isArray(customer.amlFlags) &&
            Array.isArray(customer.riskFactors) &&
            typeof customer.joinDate === 'string' &&
            typeof customer.lastActivity === 'string'
          );
        });

        if (!isValidData && jsonData.length > 0) {
          alert('Invalid customer data structure. Please ensure your JSON matches the required format.');
          console.log('First item structure:', jsonData[0]);
          return;
        }

        setCustomers(jsonData as Customer[]);
        setSearchTerm(''); // Reset search when new data is loaded
        console.log('Loaded customers:', jsonData);
        alert(`Successfully loaded ${jsonData.length} customers!`);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        alert('Error parsing JSON file. Please check the file format.');
        console.error('JSON parsing error:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Financial Risk Analytics Portal</h1>
              <p className="text-muted-foreground">Customer risk assessment and AML monitoring</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="aml-alert" className="text-sm">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {amlAlerts} AML Alerts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-financial-secondary border-0 shadow-financial">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-financial-secondary border-0 shadow-financial">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total AML Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-risk-high" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-high">{amlAlerts}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-financial-secondary border-0 shadow-financial">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Customers</CardTitle>
              <TrendingUp className="h-4 w-4 text-risk-high" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-risk-high">{riskStats.high}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="risk-medium" className="text-xs">Medium: {riskStats.medium}</Badge>
                <Badge variant="risk-low" className="text-xs">Low: {riskStats.low}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-financial-secondary border-0 shadow-financial">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-financial-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>Customer Search & Filters</CardTitle>
            <CardDescription>Search customers and apply risk-based filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="sm:w-auto"
              >
                <Upload className="h-4 w-4 mr-2" />
                Load JSON Data
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customer Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Customer Risk Portfolio</CardTitle>
            <CardDescription>
              Click on any customer to view detailed risk analysis and AML flags
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <CustomerTable 
              customers={filteredCustomers}
              onCustomerClick={setSelectedCustomer}
            />
          </CardContent>
        </Card>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}