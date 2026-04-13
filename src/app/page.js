
// COMPONENT: HomePage
// PURPOSE: The main landing page of the application. 
//          Acts as a wrapper for the TaskBoard.
// TYPE: Server Component (Default)

import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 md:p-12 flex justify-center">
      {/* Background decoration using Tailwind classes */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black"></div>
      
      <div className="w-full max-w-3xl">
        <TaskBoard />
      </div>
    </main>
  );
}