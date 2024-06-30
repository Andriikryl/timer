import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import  "./my-timer"
import "./stop-watch"

type TodoItem = { number: number };

@customElement("timer-form")
export class TimerForm extends LitElement{
    static styles = css ``
    @property({type: Array}) todos: TodoItem[] = [];
    @property({type:String}) newTodo = "";

    render(){
        return html `
            <div>
                <div>
                    <form  @submit="${this.addTodo}">
                        <label for="addTodoItem">add time</label>
                        <input type="number" .value="${this.newTodo}" @input="${this.updateNewTodo}" id="addTodoItem" placeholder="add number"/>
                        <button>add</button>
                    </form>
                    ${this.todos.length === 0
                    ? html `<div>no items</div>`
                    :  html   `<ul>
                        ${this.todos.map((todo) => html`
                        <li>${todo.number}</li>
                        `)}
                    </ul>
                    `
                    }
                </div>                    
          
                ${this.todos.length > 0? html`<my-timer duration="${this.todos[this.todos.length - 1].number}"></my-timer>` : ''}
                <stop-watch></stop-watch>
            </div>
        `
    } 
    
    updateNewTodo(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        this.newTodo = target.value;
    }

    addTodo(event: Event) {
        event.preventDefault(); // Ensure preventDefault is called correctly
        this.todos = [...this.todos, {number: Number(this.newTodo)}]; // Convert string to number
        this.newTodo = "";
    }
}