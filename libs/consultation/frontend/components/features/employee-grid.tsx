import React from 'react';
import { EmployeeCard } from '@consultation-booking/consultation/frontend/components/features/employee-card';
import { Employee } from '@consultation-booking/consultation/frontend/types';

interface EmployeeGridProps {
  employees: Employee[];
  onBookConsultation: (employee: Employee) => void;
  onViewProfile: (employee: Employee) => void;
  loading?: boolean;
}

export const EmployeeGrid: React.FC<EmployeeGridProps> = ({
  employees,
  onBookConsultation,
  onViewProfile,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-96 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <svg
            className="mx-auto h-12 w-12 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium">No employees found</h3>
          <p className="mt-1 text-sm">
            There are no employees available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onBookConsultation={onBookConsultation}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
};
