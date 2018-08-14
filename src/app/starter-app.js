import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-lumo-styles/icons.js';
import '../styles/shared-styles.js';
import { EMPLOYEE_LIST, NEW_EMPLOYEE } from '../routes/urls';
import { onLocationChanged } from '../routes/utils';

// imports for use firebase
import firebase from '../../node_modules/firebase/app';
import { config } from '../api/config-firebase.js';
import 'firebase/database';
import 'firebase/auth';

/**
 * Starter application shell.
 *
 * @class StarterApp
 * @extends {PolymerElement}
 */
class StarterApp extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        vaadin-item {
          padding: 0;
        }
        a {
          display: block;
          color: inherit;
          outline: none;
          line-height: 36px;
        }
        a:hover {
          text-decoration: none;
        }
      </style>

      <app-drawer-layout fullbleed narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar class="header-menu">Menu</app-toolbar>
          <vaadin-list-box selected="{{selected}}">
            <vaadin-item>
              <a href="/employee-list">Fruit lovers</a>
            </vaadin-item>
            <vaadin-item>
              <a href="/employee-new">New employee</a>
            </vaadin-item>
          </vaadin-list-box>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout>
          <app-header slot="header">
            <app-toolbar>
              <vaadin-button theme="icon" hidden$="[[!narrow]]" aria-label="Toggle menu" drawer-toggle>
                <iron-icon icon="lumo:menu"></iron-icon>
              </vaadin-button>
              <div main-title>
                <slot></slot>
              </div>
            </app-toolbar>
          </app-header>
          <main>
            <!-- view content -->
          </main>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get is() {
    return 'starter-app';
  }

  static get properties() {
    return {
      selected: Number,
      name: {
        type: String,
        value: 'vical'
      }
    };
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  ready() {
    super.ready();
    this.removeAttribute('unresolved');
    onLocationChanged(this.__onRouteChanged.bind(this));
    import(/* webpackChunkName: "router" */ '../routes/router.js').then(
      router => {
        router.init(this.shadowRoot.querySelector('main'));
      }
    );
    firebase.initializeApp(config);
    const database = firebase.database();
    const accounts = database.ref('users/');
    accounts
      .orderByChild('user')
      .equalTo('vical.rl@gmail.com')
      .once('child_added', function(snapshot) {
        // console.log(snapshot.val());
      });
  }

  __onRouteChanged(e) {
    // console.log(this.name);
    // firebase.auth().onAuthStateChanged(function(account) {
    //   console.log(account);
    // });
    switch (e.detail.location.pathname) {
      case EMPLOYEE_LIST:
        this.selected = 0;
        break;
      case NEW_EMPLOYEE:
        this.selected = 1;
        break;
      default:
        this.selected = null;
    }
  }
}

customElements.define(StarterApp.is, StarterApp);
