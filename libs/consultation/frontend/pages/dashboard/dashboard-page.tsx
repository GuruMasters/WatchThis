import React from 'react';
import { DashboardHeader } from './dashboard-header';
import { StatsOverview } from './stats-overview';
import { RecentActivity } from './recent-activity';
import { UpcomingSessions } from './upcoming-sessions';
import { QuickActions } from './quick-actions';

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg">
      <DashboardHeader />

      <div className="container-max py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="glass-card p-8 animate-fade-in-up bg-white/90">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-lg text-muted">
                  Ready for your next consultation? Let's make today productive.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-success-600 animate-pulse"></div>
                  Online
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activities & Sessions */}
          <div className="lg:col-span-2 space-y-8">
            <RecentActivity />
            <UpcomingSessions />
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
