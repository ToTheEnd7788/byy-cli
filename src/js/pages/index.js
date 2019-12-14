import Byy from "byy";

import "__scss/pages/index.scss";
import App from "__components/App";

new Byy({
  el: "app",
  render: h => h(App)
});