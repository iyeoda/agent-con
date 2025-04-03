import React, { useState } from 'react';
import Button from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Badge from '../ui/badge';
import { CheckCircle, CreditCard, Calendar, Clock, Download, Info, AlertTriangle, ChevronRight } from 'lucide-react';

export const BillingSettings = () => {
  const [currentPlan, setCurrentPlan] = useState('pro');
  
  // Sample subscription plans
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 199,
      period: 'month',
      features: [
        '1 project',
        'Up to 5 team members',
        'Basic AI agents',
        'Standard support'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 499,
      period: 'month',
      features: [
        'Up to 5 projects',
        'Up to 25 team members',
        'All AI agents',
        'Priority support',
        'Advanced analytics'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 999,
      period: 'month',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'All AI agents with customization',
        '24/7 dedicated support',
        'Advanced analytics & reporting',
        'Custom CDE integrations',
        'On-premises deployment options'
      ],
      recommended: false
    }
  ];

  // Sample invoice data
  const invoices = [
    { id: 'INV-2025-028', date: '2025-03-01', amount: 499, status: 'paid' },
    { id: 'INV-2025-015', date: '2025-02-01', amount: 499, status: 'paid' },
    { id: 'INV-2025-004', date: '2025-01-01', amount: 499, status: 'paid' },
    { id: 'INV-2024-109', date: '2024-12-01', amount: 299, status: 'paid' }
  ];

  // Sample payment method
  const paymentMethod = {
    type: 'card',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2028
  };

  const handleChangePlan = (planId: string) => {
    // In a real implementation, this would open a confirmation dialog
    // and eventually update the subscription via an API call
    alert(`Changing plan to ${planId}`);
  };

  const handleUpdatePaymentMethod = () => {
    // In a real implementation, this would open a payment method update form
    alert('Updating payment method');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#3A366E] mb-2">Billing & Subscription</h2>
        <p className="text-[#4C5760] mb-6">
          Manage your subscription plan and billing information.
        </p>
      </div>

      {/* Current Subscription */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <CreditCard size={20} className="mr-2" />
          Current Subscription
        </h3>

        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-medium text-[#3A366E]">
                    {plans.find(p => p.id === currentPlan)?.name} Plan
                  </h4>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-[#4C5760] mb-4">
                  Billing {plans.find(p => p.id === currentPlan)?.period}ly at ${plans.find(p => p.id === currentPlan)?.price}
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-[#4C5760]">
                    <Calendar size={14} />
                    <span>Next billing: April 1, 2025</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#4C5760]">
                    <Clock size={14} />
                    <span>Renews automatically</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-[#A7CEBC]">
                  Cancel Subscription
                </Button>
                <Button className="bg-[#3A366E]">
                  Change Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E]">Available Plans</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <Card 
              key={plan.id} 
              className={`border ${
                plan.id === currentPlan 
                  ? 'border-[#D15F36] ring-1 ring-[#D15F36]' 
                  : 'border-[#A7CEBC]'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-[#3A366E]">{plan.name}</CardTitle>
                    <CardDescription>${plan.price}/{plan.period}</CardDescription>
                  </div>
                  {plan.recommended && (
                    <Badge className="bg-[#F8C630] text-[#3A366E]">Recommended</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-[#D15F36] mt-0.5 flex-shrink-0" />
                      <span className="text-[#4C5760]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.id === currentPlan ? (
                  <Button className="w-full border-[#D15F36] text-[#D15F36]" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-[#3A366E]" 
                    onClick={() => handleChangePlan(plan.id)}
                  >
                    Select Plan
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <CreditCard size={20} className="mr-2" />
          Payment Methods
        </h3>

        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                  <CreditCard size={24} />
                </div>
                <div>
                  <div className="font-medium text-[#3A366E]">
                    {paymentMethod.brand.charAt(0).toUpperCase() + paymentMethod.brand.slice(1)} •••• {paymentMethod.last4}
                  </div>
                  <div className="text-sm text-[#4C5760]">
                    Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Default</Badge>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  className="border-[#A7CEBC]"
                  onClick={handleUpdatePaymentMethod}
                >
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="border-[#A7CEBC]">
          <CreditCard size={16} className="mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E] flex items-center">
          <Clock size={20} className="mr-2" />
          Billing History
        </h3>

        <Card className="border-[#A7CEBC]">
          <CardContent className="p-0">
            <div className="divide-y">
              {/* Table Header */}
              <div className="grid grid-cols-4 p-4 bg-[#F7F5F2] font-medium text-[#3A366E]">
                <div>Invoice</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Actions</div>
              </div>
              
              {/* Invoice Rows */}
              {invoices.map(invoice => (
                <div key={invoice.id} className="grid grid-cols-4 p-4 items-center">
                  <div className="font-medium text-[#3A366E]">{invoice.id}</div>
                  <div className="text-[#4C5760]">{new Date(invoice.date).toLocaleDateString()}</div>
                  <div className="text-[#4C5760]">${invoice.amount.toFixed(2)}</div>
                  <div>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-[#3A366E]">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E]">Billing Address</h3>
        
        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-[#4C5760] mb-1">Acme Construction, Inc.</p>
                <p className="text-[#4C5760] mb-1">123 Builder Street</p>
                <p className="text-[#4C5760] mb-1">Suite 400</p>
                <p className="text-[#4C5760] mb-1">New York, NY 10001</p>
                <p className="text-[#4C5760]">United States</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button variant="outline" className="border-[#A7CEBC]">
                  Update Address
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Contact */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E]">Billing Contact</h3>
        
        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-[#4C5760] mb-1">Jane Smith</p>
                <p className="text-[#4C5760] mb-1">Finance Director</p>
                <p className="text-[#4C5760] mb-1">jane.smith@acmeconstruction.com</p>
                <p className="text-[#4C5760]">+1 (555) 123-4567</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button variant="outline" className="border-[#A7CEBC]">
                  Update Contact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-[#3A366E]">Tax Information</h3>
        
        <Card className="border-[#A7CEBC]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[#4C5760] font-medium">Tax ID (EIN):</p>
                  <p className="text-[#4C5760]">XX-XXXXXXX</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#4C5760] font-medium">VAT Number:</p>
                  <p className="text-[#4C5760]">Not provided</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button variant="outline" className="border-[#A7CEBC]">
                  Update Tax Info
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Need Help Section */}
      <div className="rounded-md border p-4 bg-[#3A366E] bg-opacity-5 mt-8">
        <div className="flex items-start gap-3">
          <div className="text-[#D15F36]">
            <Info size={20} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-[#3A366E] mb-1">Need Help with Billing?</h3>
            <p className="text-sm text-[#4C5760] mb-2">
              If you have any questions about your subscription or billing, our support team is available to assist you.
            </p>
            <Button variant="link" className="p-0 h-auto text-[#D15F36]">
              Contact Billing Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};