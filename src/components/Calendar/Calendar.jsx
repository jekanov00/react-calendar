import React, { Component } from 'react';
import * as dateFns from 'date-fns';
import './Calendar.css';

export class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: dateFns.add(new Date(), {
        months: 0,
        days: 0,
      }),
    };
  }

  getMonthCalendar = () => {
    const { currentDate } = this.state;
    const weeksArr = [];
    let daysArr = [],
      k = 0,
      key = 0;
    for (let i = 0; i < dateFns.getWeeksInMonth(currentDate); i++) {
      for (let j = 0; j < 7; j++) {
        key++;
        if (
          (i === 0 && j < dateFns.getDay(dateFns.startOfMonth(currentDate))) ||
          k >= dateFns.getDaysInMonth(currentDate)
        ) {
          daysArr.push(<p key={key}></p>);
        } else if (k + 1 === dateFns.getDate(currentDate)) {
          ++k;
          daysArr.push(
            <p key={key} className={'currentDayCalendar'}>
              {k}
            </p>
          );
        } else {
          ++k;
          daysArr.push(<p key={key}>{k}</p>);
        }
      }
      weeksArr.push(
        daysArr.map(day => {
          return day;
        })
      );
      daysArr = [];
    }

    return weeksArr.map((week, index) => {
      return (
        <div key={index} className={'daysContainer'}>
          {week}
        </div>
      );
    });
  };

  render() {
    const { currentDate } = this.state;

    return (
      <div className={'calendar'}>
        <div className={'currentDate'}>
          <h3 className={'currentWeekDay'}>{dateFns.format(currentDate, 'cccc')}</h3>
          <h2 className={'currentDay'}>{dateFns.getDate(currentDate)}</h2>
        </div>
        <div className={'calendarRight'}>
          <h3 className={'currentMonth'}>{dateFns.format(currentDate, 'LLLL y')}</h3>
          <div className={'calendarMain'}>
            <div className={'week'}>
              <p className={'weekDay'}>S</p>
              <p className={'weekDay'}>M</p>
              <p className={'weekDay'}>T</p>
              <p className={'weekDay'}>W</p>
              <p className={'weekDay'}>T</p>
              <p className={'weekDay'}>F</p>
              <p className={'weekDay'}>S</p>
            </div>
            <div className={'days'}>{this.getMonthCalendar()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
