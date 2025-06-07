
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Image, Check, User } from "lucide-react";
import { FormData } from "../DriverRegistration";

interface DocumentUploadStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DocumentUploadStep = ({ data, updateData, onNext, onPrev }: DocumentUploadStepProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.profilePicture) {
      newErrors.profilePicture = "Profile picture is required";
    }
    if (!data.driverLicenseImage) {
      newErrors.driverLicenseImage = "Driver license image is required";
    }
    if (!data.carImage) {
      newErrors.carImage = "Car image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    updateData({ [field]: file });
  };

  const FileUploadCard = ({ 
    label, 
    description, 
    field, 
    icon: Icon, 
    acceptedTypes = "image/*" 
  }: { 
    label: string; 
    description: string; 
    field: keyof FormData; 
    icon: any;
    acceptedTypes?: string;
  }) => {
    const file = data[field] as File | null;
    const error = errors[field];

    return (
      <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
        error ? "border-destructive" : file ? "border-green-500 bg-green-50" : "border-muted-foreground/25 hover:border-primary"
      }`}>
        <div className="text-center">
          <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            file ? "bg-green-100" : "bg-muted"
          }`}>
            {file ? <Check className="w-6 h-6 text-green-600" /> : <Icon className="w-6 h-6 text-muted-foreground" />}
          </div>
          <Label htmlFor={field} className="text-sm font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-xs text-muted-foreground mt-1 mb-3">
            {description}
          </p>
          {file ? (
            <div className="space-y-2">
              <p className="text-sm text-green-600 font-medium">✓ {file.name}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(field)?.click()}
              >
                Change File
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(field)?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          )}
          <input
            id={field}
            type="file"
            accept={acceptedTypes}
            className="hidden"
            onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive text-center mt-2">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          Please upload the required documents
        </p>
      </div>

      <div className="space-y-6">
        <FileUploadCard
          label="Profile Picture"
          description="Upload a clear photo of yourself (JPG, PNG)"
          field="profilePicture"
          icon={User}
        />

        <FileUploadCard
          label="Driver License Photo"
          description="Upload a clear photo of your driver license"
          field="driverLicenseImage"
          icon={Image}
        />

        <FileUploadCard
          label="Vehicle Photo"
          description="Upload a clear photo of your vehicle"
          field="carImage"
          icon={Image}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Upload Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Images should be clear and well-lit</li>
          <li>• Maximum file size: 5MB per image</li>
          <li>• Accepted formats: JPG, PNG</li>
          <li>• Driver license should show all details clearly</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={handleNext} className="px-8">
          Review Application
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
