class MyTitle extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        h1 {
          font-size: 2.5rem;
          color: green;
          text-decoration-skip: ink;
        }
      </style>
      <h1>Hello World of Web Components!</h1>
    `;
  }
}

class IncapsulatedTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        h1 {
          font-size: 2.5rem;
          color: pink;
          text-decoration: pink solid underline;
          text-decoration-skip: ink;
        }
      </style>
      <h1 id='hidden-h'>Hello World of Web Components!</h1>
    `;
  }
}

class ClickableTitle extends HTMLElement {
  #counter: number = 0;
  hOneEl: HTMLElement | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const hOneEl = document.createElement("h1");
    this.hOneEl = hOneEl;
    hOneEl.textContent = "Click Me";
    this.shadowRoot!.appendChild(hOneEl);

    hOneEl.addEventListener("click", this.onClick);
  }

  onClick = (e) => {
    this.#counter++;
    this.hOneEl.textContent = `clicked ${this.#counter}!`;
  };

  disconnectedCallback() {
    this.hOneEl.removeEventListener("click", this.click);
  }

  _onClick() {}
}

class CustomTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const tmpl = document.querySelector(
      "#custom-title-template"
    ) as HTMLTemplateElement;
    if (tmpl) {
      this.shadowRoot!.appendChild(tmpl.content.cloneNode(true));
    }
  }
}

class CounterElement extends HTMLElement {
  _value: number = 0;
  _amount: number = 0;
  _spanElement: HTMLElement | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const sp = document.createElement("span");
    this._spanElement = sp;
    this.updateText();
    this.shadowRoot!.appendChild(sp);
  }

  updateText = () => {
    const total = this._value + this._amount;
    if (this._spanElement) this._spanElement.textContent = "Count: " + total;
  };

  static get observedAttributes() {
    return ["value", "amount"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      const intVal = parseInt(newValue);
      this["_" + name] = !isNaN(intVal) ? intVal : 0;
      this.updateText();
    }
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

class DisabledTitle extends HTMLElement {
  _isConnected: boolean;
  _isDisabled: boolean;

  constructor() {
    super();
    this._isConnected = false;
    this._isDisabled = false;
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        h1 {
          font-size: 2.5rem;
          color: pink;
          text-decoration: pink solid underline;
          text-decoration-skip: ink;
        }

        .disabled {
          color: gray;
          text-decoration: none;
        }
      </style>
      <h1 id="title">Disabled title!</h1>
    `;
    this._isConnected = true;
    this.updateState();
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === "disabled") {
      this._isDisabled = newVal === "";
      this.updateState();
    } else {
    }
  }

  updateState() {
    if (!this._isConnected) return;
    const title = this.shadowRoot!.getElementById("title");
    if (title) title.classList.toggle("disabled", this._isDisabled);
  }
}

// Create a class for the element
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }

  connectedCallback() {
    var wcParent = this.parentNode;
    if (!wcParent) return;

    function countWords(node: HTMLElement) {
      var text = node.innerText || node.textContent;
      let words = 0;
      if (text) words = text.split(/\s+/g).length;
      return words;
    }

    var count = "Words: " + countWords(wcParent as HTMLElement);

    // Create a shadow root
    var shadow = this.attachShadow({ mode: "open" });

    // Create text node and add word count to it
    var text = document.createElement("span");
    text.textContent = count;

    // Append it to the shadow root
    shadow.appendChild(text);

    // Update count when element content changes
    setInterval(function () {
      var count = "Words: " + countWords(wcParent as HTMLElement);
      text.textContent = count;
    }, 200);
  }
}

class HelloWorldElement extends HTMLElement {
  _name: string = "";

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._name = newValue;
  }

  connectedCallback() {
    this.name = this.getAttribute("name") || "World";
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this.setAttribute("name", name);
    this.render();
  }

  render() {
    this.textContent = `Hello ${this.name}`;
  }
}

const template = document.createElement("template");

template.innerHTML = `
    <style>
      button,
      span {
        font-size: 3rem;
        font-family: monospace;
        padding: 0 .5rem;
      }

      button {
        background: pink;
        color: black;
        border: 0;
        border-radius: 6px;
        box-shadow: 0 0 5px rgba(173, 61, 85, .5);
      }

      button:active {
        background: #ad3d55;
        color: white;
      }
    </style>
    <div>
      <button type="button" increment>+</button>
      <span></span>
      <button type="button" decrement>-</button>
    </div>
  `;

class MyCounter extends HTMLElement {
  incrementBtn: HTMLElement | null;
  decrementBtn: HTMLElement | null;
  displayVal: HTMLElement | null;

  constructor() {
    super();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));

    this.incrementBtn = this.shadowRoot!.querySelector("[increment]");
    this.decrementBtn = this.shadowRoot!.querySelector("[decrement]");
    this.displayVal = this.shadowRoot!.querySelector("span");
  }

  connectedCallback() {
    this.incrementBtn?.addEventListener("click", this.increment);
    this.decrementBtn?.addEventListener("click", this.decrement);

    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "1");
    }
  }

  increment() {
    // using +myVariable coerces myVariable into a number,
    // we do this because the attribute's value is received as a string
    const step = +this.step || 1;
    const newValue = +this.value + step;

    if (this.max) {
      this.value = (newValue > +this.max ? +this.max : +newValue) + "";
    } else {
      this.value = newValue + "";
    }
  }

  decrement() {
    const step = +this.step || 1;
    const newValue = +this.value - step;

    if (this.min) {
      this.value = (newValue <= +this.min ? +this.min : +newValue) + "";
    } else {
      this.value = newValue + "";
    }
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.displayVal.innerText = this.value;
  }

  get value() {
    return this.getAttribute("value");
  }

  get step() {
    return this.getAttribute("step");
  }

  get min() {
    return this.getAttribute("min");
  }

  get max() {
    return this.getAttribute("max");
  }

  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  set step(newValue) {
    this.setAttribute("step", newValue);
  }

  set min(newValue) {
    this.setAttribute("min", newValue);
  }

  set max(newValue) {
    this.setAttribute("max", newValue);
  }

  disconnectedCallback() {
    this.incrementBtn.removeEventListener("click", this.increment);
    this.decrementBtn.removeEventListener("click", this.decrement);
  }
}

window.customElements.define("my-title", MyTitle);
window.customElements.define("incapsulated-title", IncapsulatedTitle);
window.customElements.define("clickable-title", ClickableTitle);
window.customElements.define("custom-title", CustomTitle);
window.customElements.define("disabled-title", DisabledTitle);
window.customElements.define("hello-world-element", HelloWorldElement);
window.customElements.define("word-count", WordCount, { extends: "p" });
window.customElements.define("my-counter", MyCounter);
window.customElements.define("counter-element", CounterElement);
