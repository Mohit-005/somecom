import React from 'react';
import { Shield, Truck, RotateCcw, CreditCard, Award } from 'lucide-react';

const ProductFeatures = () => {
  const features = [
    {
      icon: <RotateCcw className="h-5 w-5" />,
      title: "7 days",
      subtitle: "Replacement"
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Free Delivery",
      subtitle: "Above $50"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Warranty",
      subtitle: "Policy"
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Pay on Delivery",
      subtitle: "Available"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Top Brand",
      subtitle: "Guarantee"
    }
  ];

  return (
    <div className="bg-muted/20 border rounded-lg p-4 my-6">
      <div className="flex justify-between items-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-primary mb-2">
              {feature.icon}
            </div>
            <div className="text-sm font-medium text-primary">
              {feature.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {feature.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatures;