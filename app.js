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
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        total: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val){
            var newItem, ID;
    
            // create an id for a new item
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;    
            } else {
                ID = 0;
            }
            
            
            // create a new item, based on type - exp or inc
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);    
            }
            else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            
            // push it into our data structure
            data.allItems[type].push(newItem);
            
            // return a new element
            return newItem;
    
        },
        
        testing: function(){
            console.log(data);
        }
    
    }                    
                        
})();

// UI CONTROLLER
var UIController = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBTN: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
        
    };
    
    return {
        getInput: function(){
            
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        
        addListItem: function(obj, type){
            var html;
            // Create HTML string with placholder text
        
            if (type === 'inc'){
               element = DOMstrings.incomeContainer;   
            
               html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            // insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        clearFields: function() {
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(current, index, array) {
                current.value = "";            
            })
            
            fieldsArray[0].focus();
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
    
    var updateBudget = function(){
        
        // 1. Calculate the budget
        
        // 2. Return the budget
        
        // 3. Display the budget on the UI
        
    }
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        
        // 1. Get the field input data
        input = uiCTRL.getInput();
        
        // 2. Add the item to the budget controller
        newItem = budgetCTRL.addItem(input.type, input.description, input.value);
        
        // 3. Add the item to te UI
        uiCTRL.addListItem(newItem, input.type);
        
        // 4. Clear the fields after adding an item
        uiCTRL.clearFields();
        // 5. Calculate and update budget
        
        updateBudget();  

    }
    
    return {
        init: function(){
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();