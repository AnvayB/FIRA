import { Customer } from '@/types/customer';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    city: 'New York, NY',
    riskRating: 'low',
    creditScore: 780,
    accountBalance: 150000,
    transactionVolume: 25000,
    amlFlags: [],
    riskFactors: [
      {
        id: '1',
        category: 'credit',
        description: 'Excellent credit history with consistent payments',
        impact: 'positive',
        weight: 0.8
      },
      {
        id: '2',
        category: 'behavioral',
        description: 'Stable transaction patterns over 5+ years',
        impact: 'positive',
        weight: 0.7
      }
    ],
    joinDate: '2019-03-15',
    lastActivity: '2024-01-18'
  },
  {
    id: '2',
    name: 'Michael Chen',
    city: 'San Francisco, CA',
    riskRating: 'medium',
    creditScore: 680,
    accountBalance: 75000,
    transactionVolume: 45000,
    amlFlags: [
      {
        id: '1',
        type: 'suspicious_transactions',
        severity: 'medium',
        description: 'Multiple large cash deposits detected',
        dateDetected: '2024-01-10'
      }
    ],
    riskFactors: [
      {
        id: '1',
        category: 'transaction_pattern',
        description: 'Irregular large cash deposits',
        impact: 'negative',
        weight: 0.6
      },
      {
        id: '2',
        category: 'credit',
        description: 'Average credit score with some missed payments',
        impact: 'negative',
        weight: 0.4
      }
    ],
    joinDate: '2021-07-22',
    lastActivity: '2024-01-19'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    city: 'Miami, FL',
    riskRating: 'high',
    creditScore: 520,
    accountBalance: 12000,
    transactionVolume: 85000,
    amlFlags: [
      {
        id: '1',
        type: 'high_risk_country',
        severity: 'high',
        description: 'Frequent transactions to high-risk jurisdictions',
        dateDetected: '2024-01-05'
      },
      {
        id: '2',
        type: 'suspicious_transactions',
        severity: 'high',
        description: 'Structuring detected - transactions just under reporting threshold',
        dateDetected: '2024-01-12'
      }
    ],
    riskFactors: [
      {
        id: '1',
        category: 'geographic',
        description: 'Transactions to countries with weak AML controls',
        impact: 'negative',
        weight: 0.9
      },
      {
        id: '2',
        category: 'transaction_pattern',
        description: 'Potential structuring behavior',
        impact: 'negative',
        weight: 0.8
      },
      {
        id: '3',
        category: 'credit',
        description: 'Poor credit score and payment history',
        impact: 'negative',
        weight: 0.6
      }
    ],
    joinDate: '2023-11-08',
    lastActivity: '2024-01-19'
  },
  {
    id: '4',
    name: 'David Thompson',
    city: 'Chicago, IL',
    riskRating: 'low',
    creditScore: 750,
    accountBalance: 200000,
    transactionVolume: 30000,
    amlFlags: [],
    riskFactors: [
      {
        id: '1',
        category: 'credit',
        description: 'Strong credit profile with long history',
        impact: 'positive',
        weight: 0.8
      },
      {
        id: '2',
        category: 'behavioral',
        description: 'Conservative spending patterns',
        impact: 'positive',
        weight: 0.6
      }
    ],
    joinDate: '2018-01-12',
    lastActivity: '2024-01-18'
  },
  {
    id: '5',
    name: 'Priya Patel',
    city: 'Austin, TX',
    riskRating: 'medium',
    creditScore: 700,
    accountBalance: 95000,
    transactionVolume: 55000,
    amlFlags: [
      {
        id: '1',
        type: 'pep',
        severity: 'medium',
        description: 'Related to politically exposed person',
        dateDetected: '2024-01-08'
      }
    ],
    riskFactors: [
      {
        id: '1',
        category: 'behavioral',
        description: 'Connection to politically exposed person',
        impact: 'negative',
        weight: 0.5
      },
      {
        id: '2',
        category: 'credit',
        description: 'Good credit score with stable income',
        impact: 'positive',
        weight: 0.7
      }
    ],
    joinDate: '2020-09-30',
    lastActivity: '2024-01-19'
  },
  {
    id: '6',
    name: 'James Wilson',
    city: 'Seattle, WA',
    riskRating: 'high',
    creditScore: 480,
    accountBalance: 8500,
    transactionVolume: 120000,
    amlFlags: [
      {
        id: '1',
        type: 'sanctions_match',
        severity: 'high',
        description: 'Name similarity to sanctioned individual',
        dateDetected: '2024-01-15'
      },
      {
        id: '2',
        type: 'suspicious_transactions',
        severity: 'high',
        description: 'Rapid movement of funds through multiple accounts',
        dateDetected: '2024-01-16'
      }
    ],
    riskFactors: [
      {
        id: '1',
        category: 'behavioral',
        description: 'Potential sanctions list match',
        impact: 'negative',
        weight: 1.0
      },
      {
        id: '2',
        category: 'transaction_pattern',
        description: 'Layering behavior - rapid fund movement',
        impact: 'negative',
        weight: 0.9
      },
      {
        id: '3',
        category: 'credit',
        description: 'Very poor credit score',
        impact: 'negative',
        weight: 0.7
      }
    ],
    joinDate: '2023-12-01',
    lastActivity: '2024-01-19'
  }
];