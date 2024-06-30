import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('my-timer')
export class MyTimer extends LitElement {
  static styles = css``;

  @property({type: Number}) duration = 60;
  @state() private end: number | null = null;
  @state() private remaining = 0;

  // Observe changes to the duration property
  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('duration')) {
      this.reset();
    }
  }
  

  render() {
    const min = Math.floor(this.remaining / 60000);
    const sec = pad(min, Math.floor(this.remaining / 1000 % 60));
    const hun = pad(true, Math.floor(this.remaining % 1000 / 10));
    return html`
      <p>${min? `${min}:${sec}` : `${sec}.${hun}`}</p>
      <div class="controls">
        ${this.remaining === 0? '' : this.running?
          html`<button @click=${this.pause}>pause</button>` :
          html`<button @click=${this.start}>play</button>`}
        <button @click=${this.reset}>replay</button>
      </div>`;
  }

  start() {
    this.end = Date.now() + this.remaining;
    this.tick();
  }

  pause() {
    this.end = null;
  }

  reset() {
    const running = this.running;
    this.remaining = this.duration * 1000;
    this.end = running? Date.now() + this.remaining : null;
  }

  tick() {
    if (this.running) {
      this.remaining = Math.max(0, (this.end?? 0) - Date.now()); // Using nullish coalescing operator (??)
      requestAnimationFrame(() => this.tick());
    }
  }
  

  get running() {
    return!!this.end && this.remaining > 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.reset();
  }
}

function pad(pad: boolean | number, val: number) {
  return typeof pad === 'boolean'? String(val).padStart(2, '0') : val;
}
