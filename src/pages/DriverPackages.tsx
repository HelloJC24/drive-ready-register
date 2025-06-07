
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Shirt, 
  Package, 
  CreditCard, 
  CheckCircle, 
  Star,
  IdCard
} from "lucide-react";

const DriverPackages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [driverInfo, setDriverInfo] = useState({
    id: "",
    fullName: "",
    registrationDate: new Date().toLocaleDateString()
  });

  // Generate driver ID on component mount
  useEffect(() => {
    const generateDriverId = () => {
      const prefix = "DRV";
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${prefix}${year}${randomNum}`;
    };

    // Get driver info from localStorage (if available from registration)
    const savedData = localStorage.getItem('driverRegistrationData');
    let fullName = "John Doe"; // Default name
    
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        fullName = `${data.firstName || "John"} ${data.lastName || "Doe"}`;
      } catch (error) {
        console.log("Could not parse saved data");
      }
    }

    setDriverInfo({
      id: generateDriverId(),
      fullName,
      registrationDate: new Date().toLocaleDateString()
    });
  }, []);

  const packages = [
    {
      icon: Shield,
      title: "Comprehensive Insurance",
      description: "Full coverage insurance for drivers including liability, collision, and comprehensive protection",
      features: [
        "24/7 roadside assistance",
        "Accident coverage up to $1M",
        "Vehicle repair coverage",
        "Medical expense coverage"
      ]
    },
    {
      icon: Shirt,
      title: "Professional Driver Uniform",
      description: "High-quality, professional uniform set including polo shirts, pants, and accessories",
      features: [
        "2 polo shirts with company logo",
        "2 pairs of professional pants",
        "Driver cap and badge",
        "Weather-resistant jacket"
      ]
    },
    {
      icon: Package,
      title: "TARA Onboarding Kit",
      description: "Complete starter kit with essential tools and resources for new drivers",
      features: [
        "Driver handbook and guidelines",
        "Mobile app setup assistance",
        "GPS device and charger",
        "Emergency contact cards"
      ]
    }
  ];

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Payment Successful!",
      description: "Your driver package has been purchased successfully. Welcome to TARA!",
    });
    
    setIsProcessingPayment(false);
    
    // Navigate to success page or dashboard
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Congratulations! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              You've successfully passed all requirements. Complete your registration with our driver package.
            </p>
          </div>

          {/* Driver ID Preview */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 text-primary">
                <IdCard className="w-5 h-5" />
                Your Driver ID (Preview)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">TARA Driver</h3>
                    <p className="text-lg font-semibold">{driverInfo.fullName}</p>
                    <p className="text-sm opacity-90">ID: {driverInfo.id}</p>
                    <p className="text-sm opacity-90">Registered: {driverInfo.registrationDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      CERTIFIED
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Your official driver ID will be mailed to you within 5-7 business days after payment confirmation.
              </p>
            </CardContent>
          </Card>

          {/* Package Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Driver Complete Package</CardTitle>
              <p className="text-center text-gray-600">
                Everything you need to start your journey as a professional driver
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {packages.map((pkg, index) => (
                  <div key={index} className="border rounded-lg p-6 bg-gray-50/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <pkg.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{pkg.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="text-center bg-primary/5 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Package Price</h3>
                <div className="text-4xl font-bold text-primary mb-2">$200</div>
                <p className="text-gray-600">One-time payment • No hidden fees</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    ✓ Insurance Included
                  </Badge>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    ✓ Free Shipping
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    ✓ 24/7 Support
                  </Badge>
                </div>
              </div>

              {/* Payment Button */}
              <div className="text-center">
                <Button
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  size="lg"
                  className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {isProcessingPayment ? "Processing Payment..." : "Pay $200 & Complete Registration"}
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  Secure payment powered by industry-standard encryption
                </p>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span>🔒 SSL Secured</span>
                  <span>💳 All Cards Accepted</span>
                  <span>🛡️ Money Back Guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Need help? Contact our support team at support@tara.com or call 1-800-TARA-HELP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPackages;
