class Calculator{
    constructor(pervOper, currOper){
        this.pervOper = pervOper;
        this.currOper = currOper;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand.toString() + operation.toString();
        this.currentOperand = '';
    }

    computation() {
        let compute;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(curr)) return;

        switch(this.operation) {
            case '+':
                compute = prev + curr;
                break;
            case '-':
                compute = prev - curr;
                break;
            case '*':
                compute = prev * curr;
                break;
            case '÷':
                if(curr === '0') return
                compute = prev / curr;
                break;
            default:
                return;
        }

        this.currentOperand = compute;
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }
        else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currOper.innerText = this.getDisplayNumber(this.currentOperand);
        this.pervOper.innerText = this.getDisplayNumber(this.previousOperand);
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const pervOper = document.querySelector('[data-previous-operand]');
const currOper = document.querySelector('[data-current-operand]');

const calc = new Calculator(pervOper, currOper);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calc.computation();
    calc.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calc.clear();
    calc.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calc.delete();
    calc.updateDisplay();
})