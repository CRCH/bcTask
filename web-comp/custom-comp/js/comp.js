/* eslint-env browser */
class MyComp extends HTMLElement {
  set cols(v) {
    this.setAttribute('cols', v);
  }
  set rows(v) {
    this.setAttribute('rows', v);
  }
  get cols() {
    return this.getAttribute('cols') ? this.getAttribute('cols') : 1;
  }
  get rows() {
    return this.getAttribute('rows') ? this.getAttribute('rows') : 1;
  }
  get rowRemove() {
    return this.shadowRoot.querySelector('.rem-row');
  }
  get colRemove() {
    return this.shadowRoot.querySelector('.rem-col');
  }
  get colAdd() {
    return this.shadowRoot.querySelector('.add-col');
  }
  get rowAdd() {
    return this.shadowRoot.querySelector('.add-row');
  }
  get tableBody() {
    return this.shadowRoot.querySelector('.comp-table-body');
  }
  get blockTpl() {
    return this.shadowRoot.querySelector('template').content.querySelector('.block');
  }
  get rowTpl() {
    return this.shadowRoot.querySelector('template').content.querySelector('.row');
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }
  setClickEvents() {
    this.colRemove.addEventListener('click', () => {
      this.colRemove.style.display = 'none';
      const target = this.curX;
      this.tableBody.querySelectorAll('.row').forEach(x => x.children[target].remove());
      this.cols = parseInt(this.cols, 10) - 1;
    });

    this.rowRemove.addEventListener('click', () => {
      this.rowRemove.style.display = 'none';
      const target = this.curY;
      this.tableBody.querySelectorAll('.row')[target].remove();
      this.rows = parseInt(this.rows, 10) - 1;
    });

    this.colAdd.addEventListener('click', () => {
      this.tableBody.querySelectorAll('.row').forEach((x) => {
        const prepBlock = this.blockTpl.cloneNode();
        x.appendChild(prepBlock);
      });
      this.cols = parseInt(this.cols, 10) + 1;
    });

    this.rowAdd.addEventListener('click', () => {
      const rowTmp = this.tableBody.querySelector('.row').cloneNode(true);
      this.tableBody.appendChild(rowTmp);
      this.rows = parseInt(this.rows, 10) + 1;
    });
  }
  setMouseOverEvents() {
    const arrObj = [this.tableBody, this.rowRemove, this.colRemove];
    arrObj.forEach((el) => {
      el.addEventListener('mouseover', () => clearTimeout(this.timeout));
      el.addEventListener('mouseout', () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.showRemoveButtons(false);
        }, 500);
      });
    });
    arrObj[0].addEventListener('mouseover', (event) => {
      clearTimeout(this.timeout);
      if (event.target.classList.contains('block') &&
        !event.target.classList.contains('add')) {
        this.showRemoveButtons(true);
        const curTarg = event.target;
        this.colRemove.style.left = `${curTarg.offsetLeft - 1}px`;
        this.rowRemove.style.top = `${curTarg.offsetTop - 1}px`;
        this.curX = Array.prototype.indexOf.call(curTarg.parentNode.childNodes, curTarg);
        this.curY = Array.prototype.indexOf.call(curTarg.parentNode.parentNode.childNodes, curTarg.parentNode);
      }
    });
  }

  init() {
    this.shadowRoot.appendChild(document.importNode(document.currentScript.ownerDocument.querySelector('template').content, true));
    for (let i = 0; i < this.rows; i += 1) {
      this.tableBody.appendChild(this.rowTpl.cloneNode());
      for (let j = 0; j < this.cols; j += 1) {
        const tmp = this.shadowRoot.querySelectorAll('.row')[i];
        tmp.appendChild(this.blockTpl.cloneNode());
      }
    }
  }
  showRemoveButtons(trig) {
    if (trig) {
      if (this.rows > 1) {
        this.rowRemove.classList.remove('hidden');
        this.rowRemove.style.display = 'block';
      }
      if (this.cols > 1) {
        this.colRemove.classList.remove('hidden');
        this.colRemove.style.display = 'block';
      }
    } else {
      if (this.rows > 1) this.rowRemove.classList.add('hidden');
      if (this.cols > 1) this.colRemove.classList.add('hidden');
    }
  }
  connectedCallback() {
    this.init();
    this.setMouseOverEvents();
    this.setClickEvents();
  }
}
customElements.define('custom-comp', MyComp);
