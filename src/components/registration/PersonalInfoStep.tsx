
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { FormData } from "../DriverRegistration";

interface PersonalInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({ data, updateData, onNext }: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!data.driverLicenseNumber.trim()) {
      newErrors.driverLicenseNumber = "Driver license number is required";
    } else if (data.driverLicenseNumber.length < 6) {
      newErrors.driverLicenseNumber = "Driver license number must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          Let's start with your basic information
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              placeholder="Enter your first name"
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              placeholder="Enter your last name"
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="driverLicenseNumber">Driver License Number *</Label>
          <Input
            id="driverLicenseNumber"
            value={data.driverLicenseNumber}
            onChange={(e) => updateData({ driverLicenseNumber: e.target.value })}
            placeholder="Enter your driver license number"
            className={errors.driverLicenseNumber ? "border-destructive" : ""}
          />
          {errors.driverLicenseNumber && (
            <p className="text-sm text-destructive">{errors.driverLicenseNumber}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} className="px-8">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
