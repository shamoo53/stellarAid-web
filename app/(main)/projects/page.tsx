'use client';

import React, { useState } from 'react';
import { ProjectFilters, ProjectFiltersState } from '@/components/projects/ProjectFilters';
import Link from 'next/link';
import { BadgeCheck, Zap, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    category: 'Health',
    progress: 90,
    raised: 45000,
    goal: 50000,
    isVerified: true,
    isUrgent: false,
    status: 'active',
    createdAt: '2024-03-20',
    imageGradient: 'from-cyan-400/20 to-blue-500/20',
  },
  {
    id: 2,
    title: 'School for Rural Communities',
    category: 'Education',
    progress: 71,
    raised: 28500,
    goal: 40000,
    isVerified: true,
    isUrgent: true,
    status: 'almost-funded',
    createdAt: '2024-03-15',
    imageGradient: 'from-blue-400/20 to-indigo-500/20',
  },
  {
    id: 3,
    title: 'Emergency Food Support',
    category: 'Disaster Relief',
    progress: 100,
    raised: 62100,
    goal: 60000,
    isVerified: false,
    isUrgent: true,
    status: 'completed',
    createdAt: '2024-03-22',
    imageGradient: 'from-emerald-400/20 to-teal-500/20',
  },
  {
    id: 4,
    title: 'Solar Power for Villages',
    category: 'Energy',
    progress: 45,
    raised: 11250,
    goal: 25000,
    isVerified: true,
    isUrgent: false,
    status: 'active',
    createdAt: '2024-03-10',
    imageGradient: 'from-orange-400/20 to-red-500/20',
  },
  {
    id: 5,
    title: 'Reforestation Project',
    category: 'Environment',
    progress: 15,
    raised: 3000,
    goal: 20000,
    isVerified: false,
    isUrgent: false,
    status: 'active',
    createdAt: '2024-03-18',
    imageGradient: 'from-green-400/20 to-emerald-500/20',
  },
  {
    id: 6,
    title: 'Medical Supplies for Clinics',
    category: 'Health',
    progress: 85,
    raised: 34000,
    goal: 40000,
    isVerified: true,
    isUrgent: true,
    status: 'almost-funded',
    createdAt: '2024-03-21',
    imageGradient: 'from-rose-400/20 to-pink-500/20',
  },
];

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFiltersState>({
    sort: 'newest',
    verifiedOnly: false,
    status: 'all',
    urgentOnly: false,
  });

  const handleFiltersChange = (newFilters: ProjectFiltersState) => {
    setFilters(newFilters);
    // In a real app, you would fetch data here
  };

  // Filter logic for mock data
  const filteredProjects = mockProjects.filter(project => {
    if (filters.verifiedOnly && !project.isVerified) return false;
    if (filters.urgentOnly && !project.isUrgent) return false;
    if (filters.status !== 'all' && project.status !== filters.status) return false;
    return true;
  });

  // Sort logic for mock data
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filters.sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (filters.sort === 'most-funded') return b.raised - a.raised;
    if (filters.sort === 'ending-soon') return b.progress - a.progress; // Simple mock logic
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#f0f4fa]">
      {/* Header Section */}
      <div className="relative bg-white pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-secondary-50/30 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-[1280px] relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full text-primary-600 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Explore Opportunities
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 mb-6 tracking-tight">
            Support <span className="gradient-text">Impactful</span> Projects
          </h1>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            Discover verified initiatives across the globe. From emergency relief to long-term sustainable development, your Stellar contributions drive real change.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <ProjectFilters onFiltersChange={handleFiltersChange} />

      {/* Projects Grid */}
      <main className="container mx-auto px-4 py-12 max-w-[1280px]">
        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full"
              >
                {/* Card Image area */}
                <div className={`relative h-56 w-full bg-gradient-to-br ${project.imageGradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {project.isVerified && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                        <BadgeCheck className="w-4 h-4 text-primary-500" />
                        <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-wider">Verified</span>
                      </div>
                    )}
                    {project.isUrgent && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary-500/90 backdrop-blur-md rounded-full shadow-sm text-white">
                        <Zap className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Urgent</span>
                      </div>
                    )}
                  </div>

                  <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                    <div className="w-8 h-8 rounded-full bg-white/80 shadow-inner" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-secondary-500 uppercase tracking-[0.1em]">
                      {project.category}
                    </span>
                    <span className={clsx(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
                      project.status === 'completed' ? "bg-success-50 text-success-700" : 
                      project.status === 'almost-funded' ? "bg-warning-50 text-warning-700" :
                      "bg-primary-50 text-primary-700"
                    )}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-6 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <div className="mt-auto space-y-6">
                    {/* Progress Section */}
                    <div>
                      <div className="flex justify-between items-end mb-2.5">
                        <span className="text-sm font-semibold text-neutral-400">Progress</span>
                        <span className="text-sm font-bold text-neutral-900">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(project.progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Funding Section */}
                    <div className="flex justify-between items-center gap-4 pt-2">
                      <div className="flex flex-col">
                        <span className="text-[15px] text-neutral-600">
                          <span className="font-bold text-neutral-900">${project.raised.toLocaleString()}</span>
                          <span className="mx-1 text-neutral-400">of</span>
                          <span className="text-neutral-500">${project.goal.toLocaleString()}</span>
                        </span>
                      </div>
                      <Link
                        href={`/projects/${project.id}`}
                        className="px-5 py-2 rounded-lg border border-neutral-200 text-sm font-bold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 shadow-sm flex items-center gap-2 group/btn"
                      >
                        Donate
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-neutral-300">
            <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-10 h-10 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">No projects found</h3>
            <p className="text-neutral-500 text-center max-w-sm mb-8">
              We couldn't find any projects matching your current filters. Try adjusting your search or clear all filters.
            </p>
            <Button variant="outline" onClick={() => setFilters({ sort: 'newest', verifiedOnly: false, status: 'all', urgentOnly: false })}>
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
