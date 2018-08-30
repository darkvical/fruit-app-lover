import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import '@polymer/iron-ajax';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter';
import '../styles/shared-styles.js';

import '../components/fruit-lover.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

import { auth, database } from '../access/firebase.js';

/**
 * Fruit lovers list view.
 *
 * @class FruitLovers
 * @extends {PolymerElement}
 */
class FruitLovers extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        vaadin-grid-filter,
        vaadin-text-field {
          width: 100%;
        }
      </style>

      <div class="card">
        <fruit-lover lover="{{lover}}"></fruit-lover>
      </div>

      <template id="loversCard" is="dom-repeat" items="{{lovers}}" as="lover" restamp="true">
        <div class="card">
          <fruit-lover lover="[[lover]]"></fruit-lover>
        </div>
      </template>
    `;
  }

  ready() {
    super.ready();

    const self = this;
    const currentLover = auth.currentUser;
    self._buildCurrentLover(currentLover);

    const users = database.ref('users');
    users.on('child_added', function(snapshot) {
      const user = snapshot.val();
      if (currentLover.email != user.user) {
        self._updateLover(user);
      }
    });
  }

  _updateLover(lover) {
    this.lovers.push(lover);
    this.$.loversCard.render();
  }

  _buildCurrentLover(currentLover) {
    const lover = {};
    lover.user = currentLover.email;
    lover.name = currentLover.displayName;
    lover.image = currentLover.photoURL;
    this.set('lover', lover);
  }

  static get is() {
    return 'fruit-lovers';
  }

  static get properties() {
    return {
      lovers: {
        type: Array,
        value: [],
        notify: true,
        reflectToAttribute: true
      },
      lover: { type: Object, value: {}, notify: true, reflectToAttribute: true }
    };
  }
}

customElements.define(FruitLovers.is, FruitLovers);
