import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

/**
 *
 */
class FruitLover extends PolymerElement {
  static get template() {
    return html`
      <div> Lovers list: </div>
      <template is="dom-repeat" items="[[lovers]]">
        <div>Full name: <span>{{item.firstName}} {{item.lastNanme}}</span></div>
      </template>
    `;
  }

  static get is() {
    return 'fruit-lover';
  }

  static get properties() {
    return {
      lover: {
        type: Object
      },
      lovers: {
        type: Array,
        value: () => [
          { firstName: 'Vical', lastNanme: 'Rodriguez' },
          { firstName: 'Sasuke', lastNanme: 'Uchiha' }
        ]
      }
    };
  }
}
customElements.define(FruitLover.is, FruitLover);
