const Modal = {
    open(){
        //abrir modal
        //adicionar classe active no modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
        
    },
    close(){
        //fechar o modal
        //remover a classe active
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
}


const Transaction = {
    all: Transaction,
    add(transaction){
        Transaction.all.push(transactions)
    },

    remove(index) { 
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
       let income = 0;

       Transaction.all.forEach(transaction => {
           if( transaction.amount > 0 ) {
               income += transaction.amount;
           }
       })
        return income;

    },
    expenses() {
        let expense = 0;

        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0 ) {
                expense += transaction.amount;
            }
        })
         return expense;

    },
    total () {
       return Transaction.incomes() + Transaction.expenses();
    }

}
   

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transactions, index) {
        
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transactions)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ?  "income" :
        "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="excluir transações">
            </td>
        </tr>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())

        
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }



}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value)/100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
 
    }
}

const Form = {
    validateField() {},
    submit(event) {
        event.preventDefault()
        Form.validateField()
    }
}

const App = {
    init()   {
    
        Transaction.all.forEach(transaction =>{
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()


    },
    reload() {
        DOM.clearTransactions()
        App.init()


    }, 
}

App.init()

