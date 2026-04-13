
// COMPONENT: HomePage
// PURPOSE: The entry point for the route. Acts as a static 
//          Server Component wrapper for our interactive board.
// TYPE: Server Component (Default).
import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 sm:p-8">
      {/* Background Decorative Element */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-slate-950 to-slate-950"></div>
      
      <TaskBoard />
    </main>
  );
}