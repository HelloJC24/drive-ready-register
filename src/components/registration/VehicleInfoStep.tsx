
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "lucide-react";
import { FormData } from "../DriverRegistration";

interface VehicleInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const VehicleInfoStep = ({ data, updateData, onNext, onPrev }: VehicleInfoStepProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const vehicleColors = [
    "Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", 
    "Orange", "Brown", "Burgundy", "Purple", "Gold", "Beige", "Other"
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.vehicleColor) {
      newErrors.vehicleColor = "Vehicle color is required";
    }

    if (!data.plateNumber.trim()) {
      newErrors.plateNumber = "Plate number is required";
    } else if (data.plateNumber.length < 3) {
      newErrors.plateNumber = "Plate number must be at least 3 characters";
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
          <Car className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          Tell us about your vehicle
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vehicleColor">Vehicle Color *</Label>
          <Select value={data.vehicleColor} onValueChange={(value) => updateData({ vehicleColor: value })}>
            <SelectTrigger className={errors.vehicleColor ? "border-destructive" : ""}>
              <SelectValue placeholder="Select your vehicle color" />
            </SelectTrigger>
            <SelectContent>
              {vehicleColors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.vehicleColor && (
            <p className="text-sm text-destructive">{errors.vehicleColor}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="plateNumber">License Plate Number *</Label>
          <Input
            id="plateNumber"
            value={data.plateNumber}
            onChange={(e) => updateData({ plateNumber: e.target.value.toUpperCase() })}
            placeholder="ABC-1234"
            className={`font-mono text-center ${errors.plateNumber ? "border-destructive" : ""}`}
            maxLength={10}
          />
          {errors.plateNumber && (
            <p className="text-sm text-destructive">{errors.plateNumber}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Enter your license plate number as it appears on your vehicle
          </p>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Vehicle Information Summary</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Color:</strong> {data.vehicleColor || "Not selected"}</p>
          <p><strong>Plate Number:</strong> {data.plateNumber || "Not entered"}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={handleNext} className="px-8">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VehicleInfoStep;
