import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-input/paper-input.js';
import './fruit-available.js';
import '../assets/icons-svg.js';
import '../styles/shared-styles.js';

// imports for use firebase
// import { auth } from '../access/firebase.js';
/**
 *
 */
class FruitLover extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles">
        :host {
            display: block;
        }
        .user-image {
            width: 30px; 
            height: 30px;
            border-radius: 50%;
            display: inline-block;
        }
      </style>
      <div class="container flex-vertical">
          <div class="flex-horizontal flex-center-align">
            <iron-image class="user-image" sizing="contain" src={{lover.image}}></iron-image>
            {{lover.name}}
          </div>
          <div class="flex-horizontal">
            <div class="flex-vertical flexchild">
              <fruit-available icon="my-fruit:apple"></fruit-available>
              <fruit-available icon="my-fruit:pear"></fruit-available>
              <fruit-available icon="my-fruit:orange"></fruit-available>
              <fruit-available icon="my-fruit:banana"></fruit-available>
            </div>
            <div class="flex-vertical flex3child">
              <div class="flex-center-justified">Amount to pay</div>
            </div>
          </div>
          
      </div>
    `;
  }

  static get is() {
    return 'fruit-lover';
  }

  _countFruit(event) {
    // console.log(event.target.id, this.lover.user);
  }

  ready() {
    super.ready();
    // this.set('currentLover', auth.currentUser);
  }

  static get properties() {
    return {
      lover: { type: Object, notify: true }
    };
  }
}
customElements.define(FruitLover.is, FruitLover);
