import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksStore } from './app.component.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [TasksStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
    <h1>Hello</h1>
    <p>Tasks: {{ store.visibleTasks().length }}</p>
    @for (task of store.visibleTasks(); track task.id) {
      <li>{{ task.title }}</li>
    }
    <hr>
    <div role="group">
      <button (click)="store.changeFilter('pending')">Pending</button>
      <button (click)="store.changeFilter('all')">All</button>
      <button (click)="store.changeFilter('done')">Done</button>
    </div>
  </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  readonly store = inject(TasksStore);

  ngOnInit() {
    this.store.loadTasks();
  }


}
