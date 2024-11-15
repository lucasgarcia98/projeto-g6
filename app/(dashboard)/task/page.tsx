import ListTask from '@/app/components/task/list';
import { Suspense } from 'react';

export default function TaskPage() {
  return (
    <Suspense>
      <ListTask />
    </Suspense>
  );
}
