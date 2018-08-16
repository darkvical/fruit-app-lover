import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import '@polymer/iron-ajax';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter';
import '../styles/shared-styles.js';

import '../components/fruit-lover.js';

/**
 * Fruit lovers list view.
 *
 * @class EmployeeList
 * @extends {PolymerElement}
 */
class EmployeeList extends PolymerElement {
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
        <fruit-lover></fruit-lover>
      </div>
    `;
  }

  static get is() {
    return 'employee-list';
  }

  static get properties() {
    return {
      _employees: {
        type: Array,
        value: () => []
      },
      _filterFirstName: String,
      _filterLastName: String,
      _email: String
    };
  }
}

customElements.define(EmployeeList.is, EmployeeList);
