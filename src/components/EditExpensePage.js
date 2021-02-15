/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ExpenseForm from './ExpenseForm';
import ShowErrors from './errors';
import Loading from './loading';
import { updateExpense, removeExpense } from '../actions/Index';

class EditExpensePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: '',
      createdAt: moment(),
      calendarFocus: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { updateExpense } = this.props;
    const { name, amount, createdAt } = this.state;

    const expense = {
      name,
      amount: parseFloat(amount, 10),
      createdAt: createdAt.valueOf(),
    };
    e.preventDefault();
    updateExpense(expense);
    this.reset();
  }

  delete(e) {
    const { removeExpense } = this.props;
    const { name, amount, createdAt } = this.state;
    const expense = {
      name,
      amount: parseFloat(amount, 10),
      createdAt: createdAt.valueOf(),
    };
    e.preventDefault();
    removeExpense(expense);
    this.reset();
  }

  render() {
    const { status } = this.props;
    const { isLoading, errors, form } = status;

    const renderMain = isLoading
      ? (
        <Loading />
      )
      : (
        <div>
          <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">Edit Expense</h1>
            </div>
          </div>

          <div className="content-container">
            {form === 'modalForm' && <ShowErrors errors={errors} />}
            <ExpenseForm
              onSubmit={this.onSubmit}
            />
            <button
              className="button"
              type="submit"
              onSubmit={removeExpense}
            >
              Remove Expense
            </button>
          </div>
        </div>
      );
    const { user, redirectTo } = this.props;
    const { logged_in } = user;
    return logged_in ? renderMain : redirectTo('/login');
  }
}

EditExpensePage.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  updateExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  status: state.status,
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  updateExpense: expense => {
    dispatch(updateExpense(expense));
  },
  removeExpense: expense => {
    dispatch(removeExpense(expense));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
