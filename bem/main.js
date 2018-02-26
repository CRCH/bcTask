/* eslint-env browser */
class CompTable {
  // @param: table-body-id selector for exmpl '#comp-table0'
  setMouseOverHandlers() {
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
      if (event.target.classList.contains('comp-table__block') &&
        !event.target.classList.contains('comp-table__button--add')) {
        this.showRemoveButtons(true);
        const curTarg = event.target;
        this.colRemove.style.left = `${curTarg.offsetLeft - 1}px`;
        this.rowRemove.style.top = `${curTarg.offsetTop - 1}px`;
        this.curX = Array.prototype.indexOf.call(curTarg.parentNode.childNodes, curTarg);
        this.curY = Array.prototype.indexOf.call(curTarg.parentNode.parentNode.childNodes, curTarg.parentNode);
      }
    });
  }
  setVars() {
    this.rowRemove = this.table.querySelector('.comp-table__button--rem-row');
    this.colRemove = this.table.querySelector('.comp-table__button--rem-col');
    this.rowAdd = this.table.querySelector('.comp-table__button--add-row');
    this.colAdd = this.table.querySelector('.comp-table__button--add-col');
    this.tableBody = this.table.querySelector('.comp-table__body');
    this.rowTpl = document.createElement('div');
    this.rowTpl.classList.add('comp-table__row');
    this.blockTpl = document.createElement('div');
    this.blockTpl.classList.add('comp-table__block');
  }
  showRemoveButtons(trig) {
    if (trig) {
      if (this.numRows > 1) {
        this.rowRemove.classList.remove('comp-table__button--hidden');
        this.rowRemove.style.display = 'block';
      }
      if (this.numCols > 1) {
        this.colRemove.classList.remove('comp-table__button--hidden');
        this.colRemove.style.display = 'block';
      }
    } else {
      if (this.numRows > 1) this.rowRemove.classList.add('comp-table__button--hidden');
      if (this.numCols > 1) this.colRemove.classList.add('comp-table__button--hidden');
    }
  }
  init() {
    for (let i = 0; i < this.numRows; i += 1) {
      this.tableBody.appendChild(this.rowTpl.cloneNode());
      for (let j = 0; j < this.numCols; j += 1) {
        const tmp = this.tableBody.querySelectorAll('.comp-table__row')[i];
        tmp.appendChild(this.blockTpl.cloneNode());
      }
    }
  }
  setClickHandlers() {
    this.colRemove.addEventListener('click', () => {
      this.colRemove.style.display = 'none';
      const target = this.curX;
      this.tableBody.querySelectorAll('.comp-table__row').forEach(x => x.children[target].remove());
      this.numCols -= 1;
    });

    this.rowRemove.addEventListener('click', () => {
      this.rowRemove.style.display = 'none';
      const target = this.curY;
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

  constructor(id, numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.table = document.currentScript.ownerDocument.querySelector(id);
    this.setVars();
    this.init();
    this.setClickHandlers();
    this.setMouseOverHandlers();
  }
}
(() => {
  const table0 = new CompTable('#comp-table0', 4, 4);
  const table1 = new CompTable('#comp-table1', 4, 4);
})();

