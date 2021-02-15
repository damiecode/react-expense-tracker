export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSE',
  expenses,
});
