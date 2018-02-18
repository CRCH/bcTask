/* eslint-env browser */


class CompTable {
  // @param: table-body-id selector for exmpl '#comp-table0'
  static addEventListeners(obj, ...arr) {
    arr.forEach((el) => {
      obj.addEventListener(el.event, el.fnc);
    });
  }
  constructor(id, numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.table = document.currentScript.ownerDocument.querySelector(id);
    this.rowRemove = this.table.querySelector('.comp-table__button--rem-row');
    this.colRemove = this.table.querySelector('.comp-table__button--rem-col');
    this.rowAdd = this.table.querySelector('.comp-table__button--add-row');
    this.colAdd = this.table.querySelector('.comp-table__button--add-col');
    this.tableBody = this.table.querySelector('.comp-table__body');
    this.rowTpl = document.createElement('div');
    this.rowTpl.classList.add('comp-table__row');
    this.blockTpl = document.createElement('div');
    this.blockTpl.classList.add('comp-table__block');
    let timeout;
    for (let i = 0; i < this.numRows; i += 1) {
      this.tableBody.appendChild(this.rowTpl.cloneNode());
      for (let j = 0; j < this.numCols; j += 1) {
        const tmp = this.tableBody.querySelectorAll('.comp-table__row')[i];
        tmp.appendChild(this.blockTpl.cloneNode());
      }
    }

    this.tableBody.addEventListener('mouseover', (event) => {
      let curX;
      let curY;
      clearTimeout(timeout);
      if (event.target.classList.contains('comp-table__block') &&
        !event.target.classList.contains('comp-table__button--add')) {
        if (this.numRows > 1) {
          this.rowRemove.classList.remove('comp-table__button--hidden');
          this.rowRemove.style.display = 'block';
        }
        if (this.numCols > 1) {
          this.colRemove.classList.remove('comp-table__button--hidden');
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

    CompTable.addEventListeners(this.tableBody, {
      event: 'mouseout',
      fnc: (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (this.numRows > 1) this.rowRemove.classList.add('comp-table__button--hidden');
          if (this.numCols > 1) this.colRemove.classList.add('comp-table__button--hidden');
        }, 500);

        if (this.tableBody.contains(e.relatedTarget)) {
          clearTimeout(timeout);
        }
      },
    });
    CompTable.addEventListeners(this.colRemove, {
      event: 'mouseover',
      fnc: () => {
        clearTimeout(timeout);
      },
    }, {
      event: 'mouseout',
      fnc: (event) => {
        if (!this.tableBody.parentElement.contains(event.relatedTarget)) {
          timeout = setTimeout(() => {
            this.colRemove.classList.add('comp-table__button--hidden');
            this.rowRemove.classList.add('comp-table__button--hidden');
          }, 500);
        }
      },
    });
    CompTable.addEventListeners(this.rowRemove, {
      event: 'mouseover',
      fnc: () => {
        clearTimeout(timeout);
      },
    }, {
      event: 'mouseout',
      fnc: (event) => {
        if (!this.tableBody.parentElement.contains(event.relatedTarget)) {
          timeout = setTimeout(() => {
            this.colRemove.classList.add('comp-table__button--hidden');
            this.rowRemove.classList.add('comp-table__button--hidden');
          }, 500);
        }
      },
    });

    this.colRemove.addEventListener('click', () => {
      this.colRemove.style.display = 'none';
      const target = this.colRemove.getAttribute('target');
      this.tableBody.querySelectorAll('.comp-table__row').forEach(x => x.children[target].remove());
      this.numCols -= 1;
    });

    this.rowRemove.addEventListener('click', () => {
      this.rowRemove.style.display = 'none';
      const target = this.rowRemove.getAttribute('target');
      this.tableBody.querySelectorAll('.comp-table__row')[target].remove();
      this.numRows -= 1;
    });

    this.colAdd.addEventListener('click', () => {
      this.tableBody.querySelectorAll('.comp-table__row').forEach((x) => {
        const prepBlock = this.blockTpl.cloneNode();
        x.appendChild(prepBlock);
      });
      this.numCols += 1;
    });

    this.rowAdd.addEventListener('click', () => {
      const rowTmp = this.tableBody.querySelector('.comp-table__row').cloneNode(true);
      this.tableBody.appendChild(rowTmp);
      this.numRows += 1;
    });
  }
}

(() => {
  const table0 = new CompTable('#comp-table0', 4, 4);
  const table1 = new CompTable('#comp-table1', 4, 4);
})();