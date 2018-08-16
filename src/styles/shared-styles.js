import '@vaadin/vaadin-lumo-styles/color';
import '@vaadin/vaadin-lumo-styles/sizing';
import '@vaadin/vaadin-lumo-styles/spacing';
import '@vaadin/vaadin-lumo-styles/style';
import '@vaadin/vaadin-lumo-styles/typography';
import '@polymer/paper-styles/color';

const $template = document.createElement('template');

$template.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style include="lumo-color lumo-typography">
      h2 {
        margin: var(--lumo-space-m) 0;
      }
      .card {
        margin: var(--lumo-space-m);
        padding: var(--lumo-space-m);
        border-radius: var(--lumo-border-radius);
        background: var(--lumo-base-color);
        box-shadow: var(--lumo-box-shadow-s);
      }
      app-header {
        color: #FFFFFF;
        background-color: var(--paper-pink-a700);
      }
      vaadin-button {
        color: var(--light-divider-opacity);
        margin-right: var(--lumo-space-m);
        background: var(--paper-pink-a700);
      }
      .header-menu {
        color: #FFFFFF;
        background-color: var(--paper-pink-a700);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($template.content);
