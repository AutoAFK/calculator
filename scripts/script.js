const app = document.querySelector("#app");
const screen = document.querySelector(".screen");
const decimalPointButton = document.querySelector("#decimalPoint")

const operationsSigns = "+-x/";
const isOpeartion = (text) => operationsSigns.includes(text);

const calculatorObj = {
    sum: 0,
    screenText: '',
    opCount: 0,

    appendScreenText(text) {
        if (typeof text !== "string") return;
        if (operationsSigns.includes(text)) {
            text = ` ${text} `
            this.opCount++;
            if (decimalPointButton.disabled) {
                this.setDecimalButtonDisabledValue(false);
            }
        }
        if (text !== '') {
            this.screenText += text;
        }
        this.updateScreen();
    },

    updateScreen() {
        screen.textContent = this.screenText;
    },

    equal() {
        let [left = 0, op = '+', right = 0] = this.screenText.trim().split(" ");

        left = !left ? 0 : left == '.' ? 0 : left;
        op = op || '+';
        right = !right ? 0 : right == '.' ? 0 : right;

        left = Number.parseFloat(left);
        right = Number.parseFloat(right);

        switch (op) {
            case '+':
                this.sum = left + right;
                break;
            case '-':
                this.sum = left - right;
                break;
            case 'x':
                this.sum = left * right;
                break;
            case '/':
                if (right === 0) {
                    this.displayError('Cannot divide by zero.');
                    return;
                }
                this.sum = Number.parseFloat((left / right)).toPrecision(2);
                break;
        }
        this.sum = String(this.sum).trim();
        this.screenText = this.sum;
        this.opCount = 0;
        this.updateScreen();
        if (Number.isInteger(this.sum)) {
            this.setDecimalButtonDisabledValue(false);
        } else {
            this.setDecimalButtonDisabledValue(true);
        }
    },

    displayError(error) {
        this.screenText = error;
        this.updateScreen();
        // Reset to default in case the user enter a number if the error
        // is displayed.
        this.screenText = '';
    },

    hasOperation() {
        return this.opCount >= 1;
    },

    setDecimalButtonDisabledValue(bool) {
        decimalPointButton.disabled = bool;
    },

    clear() {
        this.screenText = '';
        this.sum = 0;
        this.opCount = 0;
        this.updateScreen();
        this.setDecimalButtonDisabledValue(false);
    },
}

app.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;
    const target = event.target;
    const calc = calculatorObj;

    switch (target.id) {
        case 'decimalPoint':
            calc.appendScreenText(".");
            calc.setDecimalButtonDisabledValue(true);
            break;
        case 'clear':
            calc.clear();
            break;
        case '=':
            calc.equal();
            break;
        default:
            if (isOpeartion(target.id) && calc.hasOperation()) {
                calc.equal();
            }
            calc.appendScreenText(target.id);
            break;
    }
})