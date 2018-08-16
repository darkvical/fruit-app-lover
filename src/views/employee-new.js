import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import '@polymer/iron-form';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-dropdown-menu';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-item';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-upload';
import '../styles/shared-styles.js';
import { EMPLOYEE_LIST } from '../routes/urls.js';
import { navigateTo } from '../routes/utils.js';

/**
 * New employee view.
 *
 * @class EmployeeNew
 * @extends {PolymerElement}
 */
class EmployeeNew extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <div class="card">
        <iron-form id="form">
          <form>
            <vaadin-vertical-layout>
              <h2>Register a new employee</h2>
              <vaadin-form-layout>
                <vaadin-form-item>
                  <label slot="label">Title</label>
                  <vaadin-dropdown-menu class="full-width">
                    <template>
                      <vaadin-list-box>
                        <vaadin-item>Mr</vaadin-item>
                        <vaadin-item>Mrs</vaadin-item>
                        <vaadin-item>Ms</vaadin-item>
                        <vaadin-item>Miss</vaadin-item>
                        <vaadin-item>Other</vaadin-item>
                      </vaadin-list-box>
                    </template>
                  </vaadin-dropdown-menu>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">First Name</label>
                  <vaadin-text-field required="" error-message="Please enter first name" class="full-width"></vaadin-text-field>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Last Name</label>
                  <vaadin-text-field required="" error-message="Please enter last name" class="full-width"></vaadin-text-field>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Email</label>
                  <vaadin-text-field required="" error-message="Please enter email" class="full-width"></vaadin-text-field>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Birth date</label>
                  <vaadin-date-picker class="full-width"></vaadin-date-picker>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Dietary Restrictions</label>
                  <vaadin-combo-box class="full-width" items="[[dietarys]]"></vaadin-combo-box>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Add profile picture</label>
                  <vaadin-upload class="full-width" max-files="1"></vaadin-upload>
                </vaadin-form-item>

                <vaadin-form-item>
                  <label slot="label">Preferred language</label>
                  <vaadin-radio-group value="{{radioValue}}">
                    <vaadin-radio-button value="en">English</vaadin-radio-button>
                    <vaadin-radio-button value="fr">Français</vaadin-radio-button>
                    <vaadin-radio-button value="de">Deutsch</vaadin-radio-button>
                  </vaadin-radio-group>
                </vaadin-form-item>

                <vaadin-form-item colspan="2">
                  <label slot="label">Free word (allergies)</label>
                  <vaadin-text-area class="full-width"></vaadin-text-area>
                </vaadin-form-item>

                <vaadin-form-item colspan="2">
                  <vaadin-checkbox checked="{{_canSubmit}}">
                    I have read the <a href="" on-click="toggleDialog">terms and conditions</a>
                  </vaadin-checkbox>
                </vaadin-form-item>

                <vaadin-form-item colspan="2">
                  <vaadin-button disabled\$="[[!_canSubmit]]" on-click="_submitForm">Submit</vaadin-button>
                </vaadin-form-item>

              </vaadin-form-layout>
            </vaadin-vertical-layout>
          </form>
        </iron-form>
      </div>

      <vaadin-notification opened="{{formSubmittedOpen}}" duration="2000">
        <template>
          <div>
            <p><b>Submitted</b></p>
            <p>Your registration was successful</p>
          </div>
        </template>
      </vaadin-notification>

      <vaadin-notification opened="{{formInvalidOpen}}">
        <template>
          <div>
            <p><b>Some fields invalid</b></p>
            <p>Please fill all the required fields and try again</p>
          </div>
        </template>
      </vaadin-notification>

      <vaadin-dialog no-close-on-esc no-close-on-outside-click opened="{{dialogOpen}}">
        <template>
          <vaadin-vertical-layout theme="spacing">
            <div>
              <p><b>Terms and conditions</b></p>
              <p>This software might just work or not, there is no third option.</p>
            </div>
            <vaadin-button on-click="toggleDialog">Ok</vaadin-button>
          </vaadin-vertical-layout>
        </template>
      </vaadin-dialog>
    `;
  }

  static get is() {
    return 'employee-new';
  }
  static get properties() {
    return {
      dietarys: {
        type: Array,
        value: () => [
          'Ovo-Vegetarian',
          'Lacto-Vegetarian',
          'Lacto-Ovo Vegetarians',
          'Pescetarians',
          'Other'
        ]
      },
      dialogOpen: Boolean,
      formSubmittedOpen: {
        type: Boolean,
        observer: '_formSubmittedOpenChanged'
      },
      formInvalidOpen: Boolean,
      radioValue: String
    };
  }

  toggleDialog(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dialogOpen = !this.dialogOpen;
  }

  _formSubmittedOpenChanged(value, oldValue) {
    // once notification is closed, redirect to the list page
    if (oldValue && !value) {
      navigateTo(EMPLOYEE_LIST);
    }
  }

  _submitForm() {
    if (this.$.form.validate()) {
      this.formSubmittedOpen = true;
    } else {
      this.formInvalidOpen = true;
    }
  }
}

customElements.define(EmployeeNew.is, EmployeeNew);
