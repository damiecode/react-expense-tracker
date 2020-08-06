import moment from 'moment';

export default (expenses) => {

  let backgroundColor =[];

  for(let i=0;i<31;i++){
    backgroundColor.push("#35B996" );
  }

  const viewData={};
  viewData.labels=[];
  viewData.datasets=[{}];
  viewData.datasets[0].data=[]; 
  viewData.datasets[0].label='Expenses';
  viewData.datasets[0].backgroundColor=backgroundColor;
  
                                
  expenses.forEach((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = moment().startOf('month').isSameOrBefore(createdAtMoment, 'day') ;
    const endDateMatch = moment().endOf('month').isSameOrAfter(createdAtMoment, 'day');
    
    if(startDateMatch && endDateMatch){
      const date=createdAtMoment.format("DD");
      const position=viewData.labels.indexOf(date);

      if(position >-1 ){
        viewData.datasets[0].data[position] += (expense.amount);
      }else{
        viewData.datasets[0].data.push(expense.amount);
        viewData.labels.push(date);
        for(let j=1 ; j<viewData.labels.length; j++){
          let key=viewData.labels[j];
          let key2=viewData.datasets[0].data[j];

          let i=0;
          for ( i = j - 1; i >= 0 && (viewData.labels[i] > key); i-- ) {
            viewData.labels[i+1]=viewData.labels[i];
            viewData.datasets[0].data[i+1]=viewData.datasets[0].data[i];
          }
          viewData.labels[i+1]=key;
          viewData.datasets[0].data[i+1]=key2;
        }
      } 
    }
  })

  return viewData;
};
