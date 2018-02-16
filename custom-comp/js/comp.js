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
    return this.tableBody.querySelector('.row .block');
  }
  get rowTpl() {
    return this.tableBody.querySelector('.row');
  }


  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
  }

  redraw() {
    // this.shadowRoot.querySelectorAll('.row').forEach(x => x.remove());
    for (let i = 0; i < this.rows; i += 1) {
      this.tableBody.appendChild(this.rowTpl.cloneNode());
      for (let j = 0; j < this.cols; j += 1) {
        const tmp = this.shadowRoot.querySelectorAll('.row')[i];
        tmp.appendChild(this.blockTpl.cloneNode());

        MyComp.addEventListeners(tmp.lastElementChild, {
          event: 'mouseover',
          fnc: (e) => {
            let currentX;
            let currentY;
            this.tableBody.childNodes.forEach((item, iter) => {
              if (e.target.parentNode === item) { currentY = iter; }
            });

            e.target.parentNode.childNodes.forEach((item, iter) => {
              if (item === e.target) {
                currentX = iter;
              }
            });
            this.rowRemove.style.top = `${e.target.offsetTop}px`;
            this.colRemove.style.left = `${e.target.offsetLeft}px`;
            this.rowRemove.setAttribute('target', currentY);
            this.colRemove.setAttribute('target', currentX);
          },
        });
      }
    }
  }
  static addEventListeners(obj, ...arr) {
    arr.forEach((el) => {
      obj.addEventListener(el.event, el.fnc);
    });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(document.importNode(document.currentScript.ownerDocument.querySelector('template').content, true));
    this.redraw();
    MyComp.addEventListeners(
      this.tableBody, {
        event: 'mouseover',
        fnc: (e) => {
          if (this.tableBody.contains(e.relatedTarget) === false) {
            if (this.rows > 1) {
              this.rowRemove.classList.toggle('hidden');
              this.rowRemove.style.display = 'block';
            }
            if (this.cols > 1) {
              this.colRemove.classList.toggle('hidden');
              this.colRemove.style.display = 'block';
            }
          }
        },
      },

      {
        event: 'mouseout',
        fnc: (e) => {
          if (this.tableBody.contains(e.relatedTarget) === false) {
            setTimeout(() => {
              if (this.rows > 1) this.rowRemove.classList.toggle('hidden');
              if (this.cols > 1) this.colRemove.classList.toggle('hidden');
            }, 500);
          }
        },
      },
    );

    this.colRemove.addEventListener('click', () => {
      this.colRemove.style.display = 'none';
      const target = this.colRemove.getAttribute('target');
      this.tableBody.querySelectorAll('.row').forEach(x => x.children[target].remove());
      this.cols += 1;
    });

    this.rowRemove.addEventListener('click', () => {
      this.rowRemove.style.display = 'none';
      const target = this.rowRemove.getAttribute('target');
      this.tableBody.querySelectorAll('.row')[target].remove();
      this.rows += 1;
    });

    this.colAdd.addEventListener('click', () => {
      this.tableBody.querySelectorAll('.row').forEach((x) => {
        const prepBlock = this.blockTpl.cloneNode();
        MyComp.addEventListeners(prepBlock, {
          event: 'mouseover',
          fnc: (e) => {
            let currentX;
            let currentY;
            this.tableBody.childNodes.forEach((item, i) => {
              if (e.target.parentNode === item) { currentY = i; }
            });

            e.target.parentNode.childNodes.forEach((item, i) => {
              if (item === e.target) {
                currentX = i;
              }
            });
            this.rowRemove.style.top = `${e.target.offsetTop}px`;
            this.colRemove.style.left = `${e.target.offsetLeft}px`;
            this.rowRemove.setAttribute('target', currentY);
            this.colRemove.setAttribute('target', currentX);
          },
        });
        x.appendChild(prepBlock);
      });
      this.cols += 1;
    });

    this.rowAdd.addEventListener('click', () => {
      const rowTmp = this.tableBody.querySelector('.row').cloneNode(true);

      rowTmp.childNodes.forEach((x) => {
        x.addEventListener('mouseover', (e) => {
          let currentX;
          let currentY;
          this.tableBody.childNodes.forEach((item, i) => {
            if (e.target.parentNode === item) { currentY = i; }
          });

          e.target.parentNode.childNodes.forEach((item, i) => {
            if (item === e.target) {
              currentX = i;
            }
          });
          this.rowRemove.style.top = `${e.target.offsetTop}px`;
          this.colRemove.style.left = `${e.target.offsetLeft}px`;
          this.rowRemove.setAttribute('target', currentY);
          this.colRemove.setAttribute('target', currentX);
        });
      });
      this.tableBody.appendChild(rowTmp);
      this.rows += 1;
    });
  }
}
customElements.define('custom-comp', MyComp);
