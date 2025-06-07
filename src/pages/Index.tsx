
import DriverRegistration from "@/components/DriverRegistration";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Driver Registration Portal
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete your driver registration in just a few simple steps
          </p>
        </div>
        <DriverRegistration />
      </div>
    </div>
  );
};

export default Index;
