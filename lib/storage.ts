export interface Task {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: string;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getTasksForDate(date: string): Task[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const key = `tasks-${date}`;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error reading tasks for date "${date}":`, error);
    return [];
  }
}

export function saveTasksForDate(date: string, tasks: Task[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const key = `tasks-${date}`;
    window.localStorage.setItem(key, JSON.stringify(tasks));
  } catch (error) {
    console.error(`Error saving tasks for date "${date}":`, error);
  }
}

export function getAllTaskDates(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const dates: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('tasks-')) {
        const date = key.replace('tasks-', '');
        dates.push(date);
      }
    }
    return dates.sort().reverse();
  } catch (error) {
    console.error('Error getting task dates:', error);
    return [];
  }
}
