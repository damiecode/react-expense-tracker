/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import ShowErrors from './errors';
import Loading from './loading';
import '../styles/summary.css';
import { addExpense } from '../actions/Index';

class AddExpensePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.ceil(Math.random() * 100),
      name: '',
      amount: '',
      createdAt: moment(),
      calendarFocus: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { addExpense } = this.props;
    const { name, amount, createdAt } = this.state;

    const expense = {
      name,
      amount: parseFloat(amount, 10),
      createdAt: createdAt.valueOf(),
    };
    e.preventDefault();
    addExpense(expense);
    this.reset();
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behaviour: 'smooth' });
    this.setState({
      id: Math.ceil(Math.random() * 100),
      name: '',
      amount: '',
      createdAt: '',
    });
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
              <h1 className="page-header__title">Add Expense</h1>
            </div>
          </div>

          <div className="content-container">
            <h1> Add Expense </h1>
            {form === 'expenseForm' && <ShowErrors errors={errors} />}
            <ExpenseForm onSubmit={this.onSubmit} />
          </div>
        </div>
      );
    const { user, redirectTo } = this.props;
    const { logged_in } = user;
    return logged_in ? renderMain : redirectTo('/login');
  }
}

AddExpensePage.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  status: PropTypes.instanceOf(Object).isRequired,
  addExpense: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  addExpense: expense => {
    dispatch(addExpense(expense));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
