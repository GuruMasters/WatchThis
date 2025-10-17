import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@consultation-booking/consultation/frontend/components/ui/card';
import { Button } from '@consultation-booking/consultation/frontend/components/ui/button';
import { Badge } from '@consultation-booking/consultation/frontend/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@consultation-booking/consultation/frontend/components/ui/avatar';
import { Star, Mail, Phone, Award, GraduationCap } from 'lucide-react';
import { Employee } from '@consultation-booking/consultation/frontend/types';

interface EmployeeCardProps {
  employee: Employee;
  onBookConsultation?: (employee: Employee) => void;
  onViewProfile?: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onBookConsultation,
  onViewProfile,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card variant="glass" padding="lg" hover className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={employee.imageUrl} alt={employee.name} />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1">{employee.name}</CardTitle>
            <CardDescription className="text-base font-medium text-primary mb-2">
              {employee.title}
            </CardDescription>

            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">{employee.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({employee.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {employee.bio}
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <Award className="w-4 h-4 mr-1" />
              Specialties
            </h4>
            <div className="flex flex-wrap gap-1">
              {employee.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {employee.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{employee.specialties.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" />
              Experience
            </h4>
            <p className="text-sm text-muted-foreground">
              {employee.experience} years of experience
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Mail className="w-4 h-4" />
          <span>{employee.email}</span>
          {employee.phone && (
            <>
              <Phone className="w-4 h-4 ml-2" />
              <span>{employee.phone}</span>
            </>
          )}
        </div>

        <div className="mt-auto space-y-2">
          <Button
            onClick={() => onBookConsultation?.(employee)}
            className="w-full"
            size="sm"
          >
            Book Consultation
          </Button>

          <Button
            variant="outline"
            onClick={() => onViewProfile?.(employee)}
            className="w-full"
            size="sm"
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
