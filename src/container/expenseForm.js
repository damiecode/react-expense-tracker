import React, {Component} from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/form.css';

export default class ExpenseForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.expense ? props.expense.name : '',
      amount: props.expense ? (props.expense.amount).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocus:false,
      error: '',
    };
    this.onNameChange=this.onNameChange.bind(this);
    this.onAmountChange=this.onAmountChange.bind(this);
    this.onDateChange=this.onDateChange.bind(this);
  }
  
  onNameChange(e){ 
    const name = e.target.value;
    this.setState(()=>({name}));

  }
  onAmountChange(e){ 
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
      this.setState(()=>({amount}));
    }
  }

  onSubmit= (e) => {
    e.preventDefault();

    if( !this.state.name || !this.state.amount ){
      this.setState(() => ({error: "Please provide name and amount"})) //set error
    }
    else{
      this.setState(() => ({error: ""}));
      this.props.onSubmit({
        name: this.state.name,
        amount: parseFloat(this.state.amount, 10),
        createdAt: this.state.createdAt.valueOf(),
      });
    }
  }

  onDateChange= (createdAt) =>{
    if(createdAt)
      this.setState(()=>({createdAt}));
  }

  onFocusChange =({focused}) =>{
    this.setState(()=>({calendarFocus: focused}));
  }

  render() {
    return (
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <input
            type="text"
            className="text-input"
            placeholder="name"
            autoFocus
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            type="number"
            className="text-input"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocus}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <div>
            <button className="button">Save expense</button>
          </div>
          
        </form>
    )
  }
}
