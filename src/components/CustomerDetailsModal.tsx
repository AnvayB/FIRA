import { Customer } from '@/types/customer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Calendar, CreditCard, DollarSign, MapPin, TrendingDown, TrendingUp, X } from 'lucide-react';

interface CustomerDetailsModalProps {
  customer: Customer;
  onClose: () => void;
}

export function CustomerDetailsModal({ customer, onClose }: CustomerDetailsModalProps) {
  const getRiskBadgeVariant = (risk: Customer['riskRating']) => {
    switch (risk) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return 'default';
    }
  };

  const getAMLSeverityVariant = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return 'aml-alert';
      case 'medium': return 'aml-warning';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const getAMLTypeDescription = (type: string) => {
    switch (type) {
      case 'suspicious_transactions': return 'Suspicious Transaction Patterns';
      case 'high_risk_country': return 'High-Risk Country Activity';
      case 'pep': return 'Politically Exposed Person';
      case 'sanctions_match': return 'Sanctions List Match';
      default: return type;
    }
  };

  const getRiskFactorIcon = (impact: 'positive' | 'negative') => {
    return impact === 'positive' ? TrendingUp : TrendingDown;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Customer Risk Analysis: {customer.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Customer Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Risk Rating</span>
                <Badge variant={getRiskBadgeVariant(customer.riskRating)}>
                  {customer.riskRating.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Credit Score</span>
                <div className="text-right">
                  <div className="font-medium">{customer.creditScore}</div>
                  <div className="w-20 bg-muted rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        customer.creditScore >= 700 ? 'bg-risk-low' : 
                        customer.creditScore >= 600 ? 'bg-risk-medium' : 
                        'bg-risk-high'
                      }`}
                      style={{ width: `${(customer.creditScore / 850) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Balance</span>
                <span className="font-medium">{formatCurrency(customer.accountBalance)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Transaction Volume</span>
                <span className="font-medium">{formatCurrency(customer.transactionVolume)}</span>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{customer.city}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: {new Date(customer.joinDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Last Activity: {new Date(customer.lastActivity).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* AML Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-risk-high" />
                AML Alerts ({customer.amlFlags.length})
              </CardTitle>
              <CardDescription>
                Anti-money laundering flags and compliance alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer.amlFlags.length > 0 ? (
                <div className="space-y-4">
                  {customer.amlFlags.map((flag) => (
                    <div key={flag.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={getAMLSeverityVariant(flag.severity)}>
                          {flag.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(flag.dateDetected).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">
                        {getAMLTypeDescription(flag.type)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {flag.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-risk-low/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-risk-low" />
                  </div>
                  <p className="text-muted-foreground">No AML alerts detected</p>
                  <p className="text-sm text-muted-foreground">Customer shows clean compliance record</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Risk Factors Analysis */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Risk Assessment Reasoning
            </CardTitle>
            <CardDescription>
              Detailed breakdown of factors contributing to the risk rating
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.riskFactors.map((factor) => {
                const Icon = getRiskFactorIcon(factor.impact);
                return (
                  <div 
                    key={factor.id} 
                    className={`p-4 border rounded-lg ${
                      factor.impact === 'positive' ? 'bg-risk-low/5 border-risk-low/20' : 'bg-risk-high/5 border-risk-high/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${
                        factor.impact === 'positive' ? 'text-risk-low' : 'text-risk-high'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="text-xs">
                            {factor.category.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-xs font-medium">
                            Weight: {(factor.weight * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{factor.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Risk Summary */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Risk Rating Summary</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This customer's <Badge variant={getRiskBadgeVariant(customer.riskRating)} className="mx-1">
                  {customer.riskRating.toUpperCase()}
                </Badge> risk rating is determined by analyzing multiple factors including credit history, 
                transaction patterns, geographic risk, and compliance flags.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-risk-low" />
                  <span>{customer.riskFactors.filter(f => f.impact === 'positive').length} Positive Factors</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3 text-risk-high" />
                  <span>{customer.riskFactors.filter(f => f.impact === 'negative').length} Risk Factors</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}