import { LitElement, css, html } from 'lit'
import { customElement, } from 'lit/decorators.js'

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
      <div>
      asd
      <div/>
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
