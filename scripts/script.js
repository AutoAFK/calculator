const operations = document.querySelector(".btn-operations");
const screen = document.querySelector("#screen");
const operationsSigns = "+-*/";
let [left, right] = [0, 0];

/* iteration is used to see if its the first 
that the user have clicked on ethier one of the 
operations.

On the firts round notning will happen and it will
just display it on the screen. After the first round
it will evaluate the operation and then enter it to the
screen.
*/
let iteration = 0;

operations.addEventListener('click', (event) => {
    const target = event.target;

    switch (target.id) {
        case 'clear':
            [left, right] = 0;
            screen.textContent = "";
            iteration = 0;
            break;
        case 'plus':
            break;
        case 'minus':
            break;
        case 'multiplication':
            break;
        case 'division':
            break;
        case 'equal':
            break;
        default:

            break;
    }
})