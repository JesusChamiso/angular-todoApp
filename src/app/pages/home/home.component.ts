import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([])

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(1),
    ]
  });

  injector = inject(Injector);
  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if(storage) {
      this.tasks.set(JSON.parse(storage));
    }
    this.trackTaks();
  }

  trackTaks(){
    effect(() =>{
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },{
      injector: this.injector
    });
  }
  changeHandler() {
    if(this.newTaskControl.valid) {
    const value = this.newTaskControl.value.trim();
      if(value !== ''){
        this.addTask(value);
        this.newTaskControl.reset();
      }
    }
  }

  addTask(title:string ) {
    const newTask = {
      id:Date.now(),
      title, 
      completed: false
      };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => 
      tasks.filter((task, position) => 
        position !== index));
  }

  updateTask(index: number) {
    
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index ){
          return {
            ...task,
            completed:!task.completed
            }
            }
            return task;
            })
    })
    
    /*
    this.tasks.mutate(state => {
      const currentTask = state[index];
      state[index] = {
        ...currentTask,
        completed: !currentTask.completed
      }
    })
    */
  }

  updateTaskEditingMode(index: number) {
    if(this.tasks()[index].completed) {
      return;
    }else{
      this.tasks.update((prevState) => {
        return prevState.map((task, position) => {
          if (position === index ){
            return {
              ...task,
              editing:true
            }
          }
          return {
            ...task,
            editing:false
          };
        })
      })
    }
  }
  updateTastText(index: number, event:Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index ){
          return {
            ...task,
            title: newValue,
            editing:false
          }
        }
        return task;
      })
    })
  }

  filter = signal<'all' | 'completed' | 'pending'>('all');

  changeFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter.set(filter);
  }

  taskByFilter = computed(()=>{
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    if(filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    return tasks
  })

  clearCompleted() {
    this.tasks.set(
      this.tasks().filter(
        task => !task.completed
      )
    );
  }
}