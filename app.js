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
    
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        })
        data.total[type] = sum;
        
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
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
        
        deleteItem: function(type, id){
            var ids, index;
            
            ids = data.allItems[type].map(function(current) {
                return current.id;        
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function() {
        
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');    

            // calculate the budget: income - expenses
            data.budget = data.total.inc - data.total.exp;

            // calculate the percentage of income that we spent
            if (data.total.inc > 0) {
             data.percentage = Math.round((data.total.exp / data.total.inc) * 100);    
            } else {
             data.percentage = -1;
            }
            

        }, 
        
        getBudget: function(){
          return {
              budget: data.budget,
              totalInc: data.total.inc,
              totalExp: data.total.exp,
              percentage: data.percentage
          }  
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };
    
    return {
        getInput: function(){
            
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: function(obj, type){
            var html;
            // Create HTML string with placholder text
        
            if (type === 'inc'){
               element = DOMstrings.incomeContainer;   
            
               html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            // insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        deleteListItem: function(selectorID) {
            
            var el = document.getElementById(selectorID); 
            el.parentNode.removeChild(el);
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
        
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            
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
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
    };
    
    var updateBudget = function(){
        
        // 1. Calculate the budget
        budgetCTRL.calculateBudget();
        // 2. Return the budget
        var budget = budgetCTRL.getBudget();
        // 3. Display the budget on the UI
        uiCTRL.displayBudget(budget);
        
    }
    
    var ctrlAddItem = function() {
        var input, newItem;
        

        // 1. Get the field input data
        input = uiCTRL.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
        
            // 2. Add the item to the budget controller
            newItem = budgetCTRL.addItem(input.type, input.description, input.value);

            // 3. Add the item to te UI
            uiCTRL.addListItem(newItem, input.type);

            // 4. Clear the fields after adding an item
            uiCTRL.clearFields();
            // 5. Calculate and update budget
            updateBudget();
        }
        
        
    };
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.id;
        if (itemID) {
            
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            console.log(type, ID);
            
            // 1. Delete the item from the data structure
            budgetCTRL.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            uiCTRL.deleteListItem(itemID)
            
            // 3. Update and show the new budget
            updateBudget();
        }
        
    };
    
    return {
        init: function(){
            setupEventListeners();
            updateBudget();
        }
    }
    
})(budgetController, UIController);

controller.init();