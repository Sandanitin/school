import React, { useState } from 'react';
import PlanListTable from '../components/PlanListTable';

const PlanListPage = () => {
  // Sample data - replace this with actual API call
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      description: 'Basic subscription with essential features',
      price: 9.99,
      billingCycle: 'monthly',
      isActive: true
    },
    {
      id: 2,
      name: 'Pro Plan',
      description: 'Professional plan with advanced features',
      price: 29.99,
      billingCycle: 'monthly',
      isActive: true
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      description: 'For large organizations with custom needs',
      price: 99.99,
      billingCycle: 'annually',
      isActive: false
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(plan => plan.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Plan Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage your subscription plans
        </p>
      </div>
      
      <PlanListTable 
        plans={plans}
        onDelete={handleDelete}
        onStatusToggle={handleStatusToggle}
      />
    </div>
  );
};

export default PlanListPage;
