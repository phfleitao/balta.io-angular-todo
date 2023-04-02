import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, type FormGroup } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public mode: string = 'list';
    public todos: Todo[] = [];
    public title: string = 'Minhas Tarefas';
    public form!: FormGroup;

    constructor(@Inject(FormBuilder) private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            title: ['', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(60),
                Validators.required
            ])]
        });
        this.load();
    }

    add() : void {
        const id = this.todos.length + 1;
        const title = this.form.controls['title'].value;

        this.todos.push(new Todo(id, title, false));
        this.save();
        this.clear();
    }

    clear(): void {
        this.form.reset();
    }

    remove(todo: Todo) : void {
        const index = this.todos.indexOf(todo);
        if(index !== -1){
            this.todos.splice(index, 1);
        }
        this.save();
    }

    markAsDone(todo: Todo): void {
        todo.done = true;
        this.save();
    }

    markAsUndone(todo: Todo): void {
        todo.done = false;
        this.save();
    }

    save() : void {
        const data = JSON.stringify(this.todos);
        localStorage.setItem('todos', data);
        this.mode = 'list';
    }

    load() : void {
        const data = localStorage.getItem('todos');
        if(data != null)
            this.todos = JSON.parse(data);
    }

    changeMode(mode: string) : void {
        this.mode = mode;
    }
}
