import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, User, Mail, Phone, MapPin, Car, Image } from "lucide-react";
import { FormData } from "../DriverRegistration";

interface ConfirmationStepProps {
  data: FormData;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

const ConfirmationStep = ({ data, onSubmit, onPrev, isSubmitting }: ConfirmationStepProps) => {
  const InfoSection = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-1">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  const FileStatus = ({ file, label }: { file: File | null; label: string }) => (
    <div className="flex items-center justify-between py-1">
      <span className="text-muted-foreground">{label}:</span>
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-600">
          {file?.name || "Uploaded"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Review Your Information</h3>
        <p className="text-muted-foreground">
          Please review all information before submitting your registration
        </p>
      </div>

      <div className="space-y-4">
        <InfoSection title="Personal Information" icon={User}>
          <div className="space-y-1">
            <InfoRow label="Name" value={`${data.firstName} ${data.lastName}`} />
            <InfoRow label="Driver License" value={data.driverLicenseNumber} />
          </div>
        </InfoSection>

        <InfoSection title="Contact Information" icon={MapPin}>
          <div className="space-y-1">
            <InfoRow label="Email" value={data.email} />
            <InfoRow label="Phone" value={data.phone} />
            <InfoRow 
              label="Address" 
              value={`${data.address}, ${data.city}, ${data.state} ${data.zipCode}`} 
            />
          </div>
        </InfoSection>

        <InfoSection title="Vehicle Information" icon={Car}>
          <div className="space-y-1">
            <InfoRow label="Color" value={data.vehicleColor} />
            <InfoRow label="Plate Number" value={data.plateNumber} />
          </div>
        </InfoSection>

        <InfoSection title="Uploaded Documents" icon={Image}>
          <div className="space-y-1">
            <FileStatus file={data.profilePicture} label="Profile Picture" />
            <FileStatus file={data.driverLicenseImage} label="Driver License" />
            <FileStatus file={data.carImage} label="Vehicle Photo" />
          </div>
        </InfoSection>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-900 mb-2">Important Notice</h4>
        <p className="text-sm text-amber-800">
          By submitting this application, you confirm that all information provided is accurate and complete. 
          False information may result in rejection of your application or termination of driving privileges.
        </p>
      </div>

      <Separator />

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isSubmitting}>
          Back to Edit
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={isSubmitting}
          className="px-8 bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
