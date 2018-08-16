import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';

/**
 * @class MenuHeaderUser
 * @extends {PolymerElement}
 */
class MenuHeaderUser extends PolymerElement {
  static get template() {
    return html`
            <style include="shared-styles">
                :host {
                    display: block;
                }
                .user-image {
                    width: 50px; 
                    height: 50px;
                    border-radius: 50%;
                    display: inline-block;
                }
                .flex-horizontal {
                    @apply --layout-horizontal;
                }
                .flexchild {
                    @apply --layout-flex;
                    margin-left: 5px;
                }
                .flex-vertical {
                    @apply --layout-vertical;
                }
            </style>
            <div class="container flex-horizontal">
                <div>
                    <iron-image class="user-image" sizing="contain" src={{lover.photoURL}}></iron-image>
                </div>
                <div class="flexchild flex-vertical">
                    <div>{{lover.displayName}}</div>
                    <div style="font-size: 10px; margin-left: 2px;">{{lover.email}}</di>
                </div>
            </div>
            
        `;
  }

  ready() {
    super.ready();
  }

  static get is() {
    return 'menu-header-user';
  }

  static get properties() {
    return {
      lover: { type: Object, notify: true }
    };
  }
}

customElements.define(MenuHeaderUser.is, MenuHeaderUser);
