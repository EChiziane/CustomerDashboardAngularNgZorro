import { Component } from '@angular/core';
import { getISOWeek } from 'date-fns';
import moment from 'moment';
import dayjs from 'dayjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  standalone:false
})
export class CalendarComponent{

  months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  selectedMonth: number | null = null;
  selectedDayType: string = '';


  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  highlightedDays = [10, 22];

  isHighlighted(date: Date): boolean {
    const day = new Date(date).getDate();
    return this.highlightedDays.includes(day);}

}
