import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
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
