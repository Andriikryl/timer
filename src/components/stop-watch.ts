// my-timer.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface TimerListTypes {
    number: number
  }


@customElement('stop-watch')
export class MyStopwatch extends LitElement {
  static styles = css`
    p {
      font-size: 2em;
    }
  `;

  @state() private elapsedTime = 0;
  @state() private startTime: number | null = null;
  @property({type: Array}) _timerList: TimerListTypes[] = [];

  render() {
    const seconds = Math.floor(this.elapsedTime / 1000);
    const milliseconds = this.elapsedTime % 1000;
    return html`
      <p>${seconds}.${milliseconds.toString().padStart(3, '0')}</p>
      <div class="controls">
        ${this.startTime? html`<button @click=${this.stop}>stop</button>` : html`<button @click=${this.start}>start</button>`}
        <button @click=${this.reset}>reset</button>
      </div>
      <ul>
      ${this._timerList.map((item) =>
    html`<li>${item.number}</li>`
  )}
      </ul>
    `;
  }

  start() {
    if (!this.startTime) {
      this.startTime = Date.now();
      requestAnimationFrame(() => this.tick());
    }
  }

  stop() {
    const elapsedTimeWhenStopped = Date.now() - this.startTime!;
    this._timerList = [...this._timerList, {number: elapsedTimeWhenStopped}];
    this.startTime = null;
  }

  reset() {
    this.startTime = null;
    this.elapsedTime = 0;
  }

  tick() {
    if (this.startTime) {
      this.elapsedTime = Date.now() - this.startTime;
      requestAnimationFrame(() => this.tick());
    }
  }
}
