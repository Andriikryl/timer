import { LitElement, css, html } from 'lit'
import { customElement, } from 'lit/decorators.js'
import "./components/timer-form"

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {

  render() {
    return html`
      <main>
          <timer-form></timer-form>
      </main>
    
    `
  }

  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
