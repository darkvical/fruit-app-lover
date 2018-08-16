import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';

import firebase from '../../node_modules/firebase/app';
import { auth } from '../access/firebase.js';

// Styles and icons imports
import '../assets/icons-svg.js';
import '../styles/shared-styles.js';

class LoginLover extends PolymerElement {
  static get template() {
    return html`
            <style include="shared-styles">
                :host {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    display: block;
                    position: absolute;
                }
                paper-button.custom {
                    color: black !important;
                    background-color: var(--paper-indigo-50);
                }
                iron-icon.center-value {
                    padding-top: 5px;
                }
                .full-screen {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background-color: lightgrey;
                }
                .center-bottom {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    bottom: 0px;
                    right: 25%;
                    left: 50%;
                    margin-left:-150px;
                }
                .flex-center-align {
                    @apply --layout-horizontal;
                    @apply --layout-center;
                }
                .flex-center-justified {
                    @apply --layout-horizontal;
                    @apply --layout-center-justified;
                }
            </style>
            <iron-image class="full-screen" sizing="cover" preload src="../assets/images/principal.jpg"></iron-image>
            
            <div class="flex-center-justified">
                <iron-image style="margin-top: 5px; width: 150px; height: 50px;" sizing="contain" preload src="../assets/images/logo_retail.png"></iron-image>
            </div>
            <div class="flex-center-justified flex-center-align center-bottom">
                <div class="flex-center-align">
                    <paper-button raised on-click="_signInWithGoogle" class="custom">
                        <iron-icon class="center-value" icon="my-icon:google"></iron-icon>Ingresar con google
                    </paper-button>
                </div>
            </div>
            
        `;
  }

  static get is() {
    return 'login-lover';
  }

  static get properties() {
    return {
      name: String
    };
  }

  _signInWithGoogle(event) {
    if (!auth.currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
      auth
        .getRedirectResult()
        .then(function(result) {})
        .catch(function(error) {
          // error.code //error.message //error.credential
          if (error.code === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.'
            );
          } else {
            alert('error : ' + error.message);
          }
        });
    }
  }
}
customElements.define(LoginLover.is, LoginLover);
