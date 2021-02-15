import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({
  expense, removeExpense,
}) => (
  <Link className="list-item" to={`/edit/${expense.id}`}>
    <div>
      <h3 className="list-item__title">{expense.name}</h3>
      <span className="list-item__sub-title">{ moment(expense.createdAt).format('Do MMMM YYYY')}</span>
    </div>
    <h3 className="list-item__data">{numeral(expense.amount).format('$0,0.00')}</h3>
    <button type="submit" onClick={() => removeExpense(expense)}>
      delete
    </button>
  </Link>
);

ExpenseListItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default ExpenseListItem;
