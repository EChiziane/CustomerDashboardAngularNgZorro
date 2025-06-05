import {Component} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  standalone: false
})
export class CalendarComponent {

  months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  selectedMonth: number | null = null;
  selectedDayType: string = '';
  highlightedDays = [10, 22];

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  isHighlighted(date: Date): boolean {
    const day = new Date(date).getDate();
    return this.highlightedDays.includes(day);
  }

}
