import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'pending' | 'done';


type TasksState = {
  tasks: Task[];
  filter: Filter;
};

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
};

export const TasksStore = signalStore(
  withState(initialState),
  withComputed((state) => ({
    visibleTasks: computed(() => {
      const tasks = state.tasks();
      const filter = state.filter();

      switch (filter) {
        case 'all':
          return tasks;
        case 'pending':
          return tasks.filter((task) => !task.completed);
        case 'done':
          return tasks.filter((task) => task.completed);
      }
    })
  })),
  withMethods((store) => ({
    changeFilter: (newFilter: Filter) => {
      patchState(store, { filter: newFilter });
    },
    loadTasks: () => {
      // aca podria llamar a un servicio que le pegue a una api.
      const tasks: Task[] = [
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
      ]

      patchState(store, { tasks });
    }
  }))
);
