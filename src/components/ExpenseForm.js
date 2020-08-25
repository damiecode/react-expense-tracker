/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import ShowErrors from './errors';
import Loading from './loading';
import { addExpense } from '../actions/Index';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/form.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: '',
      createdAt: moment(),
      calendarFocus: false,
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectForm = React.createRef();
  }

  onNameChange(e) {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onAmountChange(e) {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
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

  onDateChange(createdAt) {
    if (createdAt) this.setState(() => ({ createdAt }));
  }

  onFocusChange({ focused }) {
    this.setState(() => ({ calendarFocus: focused }));
  }

  reset() {
    this.selectForm.current.scrollIntoView({ behaviour: 'smooth' });
    this.setState({
      name: '',
      amount: '',
      createdAt: '',
    });
  }

  render() {
    const {
      name, amount, createdAt, calendarFocus,
    } = this.state;
    const { status } = this.props;
    const { isLoading, errors, form } = status;

    const renderMain = isLoading
      ? (
        <Loading />
      )
      : (
        <form className="form" ref={this.selectForm} onSubmit={this.onSubmit}>
          {form === 'expenseForm' && <ShowErrors errors={errors} />}
          <input
            type="text"
            className="text-input"
            placeholder="Name"
            value={name}
            onChange={this.onNameChange}
          />
          <input
            type="number"
            className="text-input"
            placeholder="Amount"
            value={amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={createdAt}
            onDateChange={this.onDateChange}
            focused={calendarFocus}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <div>
            <button className="button" type="submit">Save expense</button>
          </div>
        </form>
      );

    const { user, redirectTo } = this.props;
    const { logged_in } = user;
    return logged_in ? renderMain : redirectTo('/login');
  }
}

ExpenseForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
