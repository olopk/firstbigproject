// BUDGET CONTROLLER
var budgetController = (function() {
        
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
})();


  var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

// UI CONTROLLER
var UIController = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBTN: '.add__btn'
        
    };
    
    return {
        getInput: function(){
            
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function(){
            return DOMstrings; 
        }    
    };
    
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCTRL, uiCTRL){
    
    var setupEventListeners = function(){
        
        var DOM = uiCTRL.getDOMstrings();
        
        document.querySelector(DOM.inputBTN).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();    
            }
        });
    };
    
    
    
    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = uiCTRL.getInput();
        // 2. Add the item to the budget controller
        // 3. Add the item to te UI
        // 4. Calculate the budget
        // 5. Display the budget
    }
    
    return {
        init: function(){
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();