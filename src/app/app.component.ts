import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'pending' | 'done';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <div class="container">
    <h1>Hello</h1>
    <p>Tasks: {{ visibleTasks().length }}</p>
    @for (task of visibleTasks(); track task.id) {
      <li>{{ task.title }}</li>
    }
    <hr>
    <div role="group">
      <button (click)="changeFilter('pending')">Pending</button>
      <button (click)="changeFilter('all')">All</button>
      <button (click)="changeFilter('done')">Done</button>
    </div>
  </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Install Angular',
      completed: false
    },
    {
      id: '2',
      title: 'Install NodeJS',
      completed: true
    },
    {
      id: '3',
      title: 'Install NGRX',
      completed: false
    }
  ]);

  filter = signal<Filter>('all');
  visibleTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();

    switch (filter) {
      case 'all':
        return tasks;
      case 'pending':
        return tasks.filter((task) => !task.completed);
      case 'done':
        return tasks.filter((task) => task.completed);
    }
  })

  changeFilter(filter: Filter) {
    this.filter.set(filter);
  }
}
