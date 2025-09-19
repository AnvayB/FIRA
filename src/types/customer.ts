export interface Customer {
  id: string;
  name: string;
  city: string;
  riskRating: 'high' | 'medium' | 'low';
  creditScore: number;
  accountBalance: number;
  transactionVolume: number;
  amlFlags: AMLFlag[];
  riskFactors: RiskFactor[];
  joinDate: string;
  lastActivity: string;
}

export interface AMLFlag {
  id: string;
  type: 'suspicious_transactions' | 'high_risk_country' | 'pep' | 'sanctions_match';
  severity: 'high' | 'medium' | 'low';
  description: string;
  dateDetected: string;
}

export interface RiskFactor {
  id: string;
  category: 'credit' | 'behavioral' | 'geographic' | 'transaction_pattern';
  description: string;
  impact: 'positive' | 'negative';
  weight: number;
}