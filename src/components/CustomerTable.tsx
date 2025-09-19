import { Customer } from '@/types/customer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Eye } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onCustomerClick: (customer: Customer) => void;
}

export function CustomerTable({ customers, onCustomerClick }: CustomerTableProps) {
  const getRiskBadgeVariant = (risk: Customer['riskRating']) => {
    switch (risk) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Risk Rating</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Credit Score</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Account Balance</th>
            <th className="text-left p-4 font-medium text-muted-foreground">AML Flags</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Last Activity</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr 
              key={customer.id} 
              className="border-b hover:bg-muted/25 transition-colors cursor-pointer"
              onClick={() => onCustomerClick(customer)}
            >
              <td className="p-4">
                <div>
                  <div className="font-medium text-foreground">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">ID: {customer.id}</div>
                </div>
              </td>
              <td className="p-4 text-foreground">{customer.city}</td>
              <td className="p-4">
                <Badge variant={getRiskBadgeVariant(customer.riskRating)}>
                  {customer.riskRating.toUpperCase()}
                </Badge>
              </td>
              <td className="p-4">
                <div className="font-medium text-foreground">{customer.creditScore}</div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full ${
                      customer.creditScore >= 700 ? 'bg-risk-low' : 
                      customer.creditScore >= 600 ? 'bg-risk-medium' : 
                      'bg-risk-high'
                    }`}
                    style={{ width: `${(customer.creditScore / 850) * 100}%` }}
                  />
                </div>
              </td>
              <td className="p-4 font-medium text-foreground">
                {formatCurrency(customer.accountBalance)}
              </td>
              <td className="p-4">
                {customer.amlFlags.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-risk-high" />
                    <Badge variant="aml-alert" className="text-xs">
                      {customer.amlFlags.length} Alert{customer.amlFlags.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs">Clean</Badge>
                )}
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {new Date(customer.lastActivity).toLocaleDateString()}
              </td>
              <td className="p-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCustomerClick(customer);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}