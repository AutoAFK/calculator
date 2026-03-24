const app = document.querySelector("#app");
const screen = document.querySelector(".screen");
const operationsSigns = "+-*/";

const calculatorObj = {
    sum: 0,
    screenText: '',

    updateScreenText(text = ''){
        if(operationsSigns.includes(text)){
            text = ` ${text} `
        }
        this.screenText += text;
        screen.textContent = this.screenText;
    },

    equal(){
        let [left,op,right] = this.screenText.split(" ");
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
                this.sum = Number.parseFloat((left / right)).toFixed(2);                
                break;
        }
        this.screenText = this.sum;
        this.updateScreenText();
    },

    displayError(error){
        this.screenText = error;
        this.updateScreenText();
        // Reset to default in case the user enter a number if the error
        // is displayed.
        this.screenText = '';
    },

    clear(){
        this.screenText = '';
        this.updateScreenText();
    },
}

app.addEventListener('click', (event) => {
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
            calc.updateScreenText(target);
            break;
    }
})