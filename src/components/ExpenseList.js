/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseListItem from './ExpenseListItem';
import viewExpenses from '../selectors/expenses';
import '../styles/visibility.css';
import '../styles/list.css';

const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    { props.expenses.length === 0 && <p>No expense!</p> }
    {
        props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
      }
  </div>
);

ExpenseList.propTypes = {
  expenses: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ expenses, filters }) => ({
  expenses: viewExpenses(expenses, filters),
});

export default connect(mapStateToProps)(ExpenseList);
