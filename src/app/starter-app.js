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
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '../styles/shared-styles.js';

// views and routers
import '../views/login-lover.js';
import '../components/menu-header-user.js';
import { EMPLOYEE_LIST, NEW_EMPLOYEE } from '../routes/urls';
import { onLocationChanged } from '../routes/utils';

// imports for use firebase
import { auth } from '../access/firebase.js';
// icons
import '@vaadin/vaadin-lumo-styles/icons.js';
import '../assets/icons-svg.js';

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
      <template is="dom-if" if="{{!logged}}" restamp="true">
        <login-lover></login-lover>
      </template>
      <template is="dom-if" if="{{logged}}" restamp="true">
        <app-drawer-layout fullbleed narrow="{{narrow}}">
          <!-- Drawer content -->
          <app-drawer slot="drawer" swipe-open="[[narrow]]">
            <app-toolbar class="header-menu">
              <menu-header-user lover={{user}}></menu-header-user>
            </app-toolbar>
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
                  Fruit Retail APP
                </div>
                <div>
                  <paper-icon-button icon="my-icon:exit-to-app" on-click="_singOut"></paper-icon-button>
                </div>
              </app-toolbar>
            </app-header>
            <main>
              <!-- view content -->
            </main>
          </app-header-layout>
        </app-drawer-layout>
      </template>
    `;
  }
  static get is() {
    return 'starter-app';
  }

  static get properties() {
    return {
      selected: Number,
      logged: { type: Boolean, value: false, notify: true },
      user: { type: Object, notify: true }
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
    const self = this;
    self.removeAttribute('unresolved');
    onLocationChanged(this.__onRouteChanged.bind(this));
    auth.onAuthStateChanged(function(account) {
      if (account) {
        self.set('logged', true);
        self.set('user', account);
        const callback = router => {
          router.init(self.shadowRoot.querySelector('main'));
        };
        import(/* webpackChunkName: "router" */ '../routes/router.js').then(
          callback
        );
      } else {
        self.set('logged', false);
        self.set('user', null);
      }
    });
  }

  _singOut(event) {
    auth.signOut();
  }

  __onRouteChanged(e) {
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
