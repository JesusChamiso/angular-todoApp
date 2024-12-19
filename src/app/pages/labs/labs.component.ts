import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola desde el componente';
  tasks = [
    'Instalar Angular Cli',
    'Crear Proyecto',
    'Crear componentes'
  ]
  name = 'Jesus Miguel';
  edad = 27;
  disabled = false;
  img = 'https://www.w3schools.com/howto/img_avatar.jpg';

  person = signal({
    name: 'Jesus',
    age: 27,
    avatar: 'https://www.w3schools.com/howto/img_avatar.jpg'
  });

  clickHandler() {
    alert('Hola, click desde eventos en angular');
  }
  clickHandler2() {
    alert('Hola, click Double desde eventos en angular');
  }

  changeHandler(event: Event) {
    console.log(event)
  }

  keydownHandler(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value)
  }

  name2 = signal('Jose Manuel');

  changeHandler2(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name2.set(newValue);
  }
  changeHandler3(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.set({
      ...this.person(),
      name: newValue
    });
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {...prevState,
      age: parseInt(newValue,10)
    }});
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {...prevState,
      name: newValue
    }});
  }

  tareas = signal([
    'Instalar Angular Cli',
    'Crear Proyecto',
    'Crear componentes'
  ])

  colorControl = new FormControl();
  widthControl = new FormControl(50,{
    nonNullable: true
  });
  nameControl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });
  constructor() {
    this.colorControl.valueChanges.subscribe(value => {
      const color = this.colorControl.value;
      console.log(color);
    })
  }
}
