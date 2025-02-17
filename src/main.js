import "./styles/style.scss";

import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div class="bg-bodyLight">
    Content
  </div>
`;

setupCounter(document.querySelector("#counter"));
