import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Task Manager
      </h1>
      <TaskBoard />
    </main>
  );
}