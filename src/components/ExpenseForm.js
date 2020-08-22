/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/form.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.expense ? props.expense.name : '',
      amount: props.expense ? (props.expense.amount).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocus: false,
      error: '',
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    e.preventDefault();
    const { name, amount, createdAt } = this.state;

    if (!name || !amount) {
      this.setState(() => ({ error: 'Please provide name and amount' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name,
        amount: parseFloat(amount, 10),
        createdAt: createdAt.valueOf(),
      });
    }
  }

  onDateChange(createdAt) {
    if (createdAt) this.setState(() => ({ createdAt }));
  }

  onFocusChange({ focused }) {
    this.setState(() => ({ calendarFocus: focused }));
  }

  render() {
    const {
      name, amount, createdAt, calendarFocus, error,
    } = this.state;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {error && <p className="form__error">{error}</p>}
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
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.instanceOf(Object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ExpenseForm;
