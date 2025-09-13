import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockOfficers } from "@/lib/data";
import { Mail, Phone } from "lucide-react";

export default function OfficerDirectoryPage() {
  const officers = mockOfficers;

  return (
    <>
      <Header
        title="Officer Directory"
        description="Connect with local agricultural officers for expert guidance."
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <Card>
          <CardHeader>
            <CardTitle>Local Agricultural Officers</CardTitle>
            <CardDescription>
              Find contact information for officers in your region.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {officers.map((officer) => (
                <Card key={officer.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                      <AvatarImage
                        src={officer.avatarUrl}
                        alt={officer.name}
                      />
                      <AvatarFallback>
                        {officer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-primary">
                        {officer.name}
                      </h3>
                      <p className="font-medium">{officer.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {officer.district}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col space-y-2">
                    <a href={`tel:${officer.phone}`}>
                       <Button variant="outline" className="w-full justify-start">
                        <Phone className="mr-2 h-4 w-4" />
                        {officer.phone}
                       </Button>
                    </a>
                     <a href={`mailto:${officer.email}`}>
                       <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        {officer.email}
                       </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
