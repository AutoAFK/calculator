const app = document.querySelector("#app");
const screen = document.querySelector(".screen");

const operationsSigns = "+-x/";
const isOpeartion = (text) => operationsSigns.includes(text);

const calculatorObj = {
    sum: 0,
    screenText: '',
    opCount: 0,

    appendScreenText(text){
        if(typeof text !== "string") return;
        if(operationsSigns.includes(text)){
            text = ` ${text} `
            this.opCount++;
        }
        if(text !== ''){
            this.screenText += text;
        }
        this.updateScreen();
    },

    updateScreen(){
        screen.textContent = this.screenText;
    },

    equal(){
        let [left,op,right] = this.screenText.trim().split(" ");
        left = Number(left);
        right = Number(right);

        switch(op){
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
                if(right === 0){
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
    },

    displayError(error){
        this.screenText = error;
        this.updateScreen();
        // Reset to default in case the user enter a number if the error
        // is displayed.
        this.screenText = '';
    },

    hasOperation(){
        return this.opCount >= 1;
    },

    clear(){
        this.screenText = '';
        this.sum = 0;
        this.opCount = 0;
        this.updateScreen();
    },
}

app.addEventListener('click', (event) => {
    if(event.target.tagName !== 'BUTTON') return;
    const target = event.target.id;
    const calc = calculatorObj;

    switch(target){
        case 'clear':
            calc.clear();
            break;
        case '=':
            calc.equal();
            break;
        default:
            if(isOpeartion(target) && calc.hasOperation()){
                calc.equal();
            }
            calc.appendScreenText(target);
            break;
    }
})