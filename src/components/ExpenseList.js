/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseListItem from './ExpenseListItem';
import viewExpenses from '../selectors/expenses';
import Loading from './loading';
import '../styles/visibility.css';
import '../styles/list.css';
import { fetchExpenses } from '../actions/Index';

const ExpenseList = ({
  status, user, expenses, fetchExpenses, redirectTo,
}) => {
  useEffect(() => {
    fetchExpenses(expenses);
  }, [expenses, fetchExpenses]);

  const { isLoading } = status;
  const renderMain = isLoading
    ? (
      <Loading />
    )
    : (
      <div className="content-container">
        <div className="list-header">
          <div className="show-for-mobile">Expenses</div>
          <div className="show-for-desktop">Expense</div>
          <div className="show-for-desktop">Amount</div>
        </div>
        { expenses.length === 0 && <p>No expense!</p> }
        {
        expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
      }
      </div>
    );
  const { logged_in } = user;
  return logged_in ? renderMain : redirectTo('/login');
};

ExpenseList.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  expenses: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  fetchExpenses: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { expenses, filters } = state;
  return (
    {
      expenses: viewExpenses(expenses, filters),
      status: state.status,
      user: state.user,
    }
  );
};

const mapDispatchToProps = dispatch => ({
  fetchExpenses: () => {
    dispatch(fetchExpenses());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
