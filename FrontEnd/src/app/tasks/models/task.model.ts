export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'InProgress' | 'Done' | 'Todo';
  dueDate: string;
}
