import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/paper-input/paper-input.js';
import '../assets/icons-svg.js';

class FruitAvailable extends PolymerElement {
  static get template() {
    return html`
        <style>
        :host {
            display: block;
        }
        .flex-start-justified {
            @apply --layout-horizontal;
            @apply --layout-start-justified;
        }
        </style>
        <div class="flex-start-justified">
            <paper-input type="number" min="0" value="{{value}}">
                <div slot="prefix">
                    <iron-icon icon="{{icon}}"></iron-icon>
                </div>
            </paper-input>
        </div>
        `;
  }
  static get properties() {
    return {
      icon: { type: String, value: '', notify: true },
      value: { type: Number, value: 0 }
    };
  }
  static get is() {
    return 'fruit-available';
  }
}
customElements.define(FruitAvailable.is, FruitAvailable);
