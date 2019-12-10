import "__scss/pages/index";

import App from "__components/App";

class TestOne {
  constructor(name) {
    this.name = name;
  }

  __init() {
    console.log(11111, this.name);
  }
};

console.log(App);
console.log(TestOne);