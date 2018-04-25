// BUDGET CONTROLLER
var budgetController = (function() {
    // some code       
})();

// UI CONTROLLER
var UIController = (function(){
    
    return {
        getInput: function(){
            
            return {
                type: document.querySelector('.add__type').value, // will be either inc or exp
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            };
        }
    };
    
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCTRL, uiCTRL){
    var ctrlAddItem = function() {
        console.log('Enter was pressed');
        // 1. Get the field input data
        var input = uiCTRL.getInput();
        console.log(input);
        // 2. Add the item to the budget controller
        // 3. Add the item to te UI
        // 4. Calculate the budget
        // 5. Display the budget
    }
   
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();    
        }
    });
    
})(budgetController, UIController);