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

  static addEventListeners(obj, ...arr) {
    arr.forEach((el) => {
      obj.addEventListener(el.event, el.fnc);
    });
  }

  connectedCallback() {
    let timeout;
    this.shadowRoot.appendChild(document.importNode(document.currentScript.ownerDocument.querySelector('template').content, true));
    for (let i = 0; i < this.rows; i += 1) {
      this.tableBody.appendChild(this.rowTpl.cloneNode());
      for (let j = 0; j < this.cols; j += 1) {
        const tmp = this.shadowRoot.querySelectorAll('.row')[i];
        tmp.appendChild(this.blockTpl.cloneNode());
      }
    }

    this.tableBody.addEventListener('mouseover', (event) => {
      let curX;
      let curY;
      clearTimeout(timeout);
      if (event.target.classList.contains('block') &&
        !event.target.classList.contains('add')) {
        if (this.rows > 1) {
          this.rowRemove.classList.remove('hidden');
          this.rowRemove.style.display = 'block';
        }
        if (this.cols > 1) {
          this.colRemove.classList.remove('hidden');
          this.colRemove.style.display = 'block';
        }
        const curTarg = event.target;
        for (let i = 0; i < curTarg.parentNode.children.length; i += 1) {
          if (curTarg.parentNode.children[i] === curTarg) {
            curY = i;
          }
        }
        for (let i = 0; i < curTarg.parentNode.parentNode.children.length; i += 1) {
          if (curTarg.parentNode.parentNode.children[i] === curTarg.parentNode) {
            curX = i;
          }
        }
        this.colRemove.style.left = `${curTarg.offsetLeft - 1}px`;
        this.rowRemove.style.top = `${curTarg.offsetTop - 1}px`;
        this.rowRemove.setAttribute('target', curY);
        this.colRemove.setAttribute('target', curX);
      }
    });

    MyComp.addEventListeners(this.tableBody, {
      event: 'mouseout',
      fnc: (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (this.rows > 1) this.rowRemove.classList.add('hidden');
          if (this.cols > 1) this.colRemove.classList.add('hidden');
        }, 500);

        if (this.tableBody.contains(e.relatedTarget)) {
          clearTimeout(timeout);
        }
      },
    });
    MyComp.addEventListeners(this.colRemove, {
      event: 'mouseover',
      fnc: () => {
        clearTimeout(timeout);
      },
    }, {
      event: 'mouseout',
      fnc: (event) => {
        if (!this.tableBody.parentElement.contains(event.relatedTarget)) {
          timeout = setTimeout(() => {
            this.colRemove.classList.add('hidden');
            this.rowRemove.classList.add('hidden');
          }, 500);
        }
      },
    });
    MyComp.addEventListeners(this.rowRemove, {
      event: 'mouseover',
      fnc: () => {
        clearTimeout(timeout);
      },
    }, {
      event: 'mouseout',
      fnc: (event) => {
        if (!this.tableBody.parentElement.contains(event.relatedTarget)) {
          timeout = setTimeout(() => {
            this.colRemove.classList.add('hidden');
            this.rowRemove.classList.add('hidden');
          }, 500);
        }
      },
    });

    this.colRemove.addEventListener('click', () => {
      this.colRemove.style.display = 'none';
      const target = this.colRemove.getAttribute('target');
      this.tableBody.querySelectorAll('.row').forEach(x => x.children[target].remove());
      this.cols = parseInt(this.cols, 10) - 1;
    });

    this.rowRemove.addEventListener('click', () => {
      this.rowRemove.style.display = 'none';
      const target = this.rowRemove.getAttribute('target');
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
}
customElements.define('custom-comp', MyComp);