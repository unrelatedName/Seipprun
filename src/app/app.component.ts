import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dice = 1;
  limit = 1;
  result: string = '0';
  phys = 0;
  mental = 0;
  timerCounter = 0;
  timeLeft = 60;
  interval;

  constructor() {
    this.phys = Number(localStorage.getItem('phys'));
    this.mental = Number(localStorage.getItem('mental'));
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.timerCounter++;
      console.log(this.timerCounter);
      if (this.timerCounter > 2) {
        clearInterval(this.interval);
        this.roll();
      }
    }, 500);
  }
  stopTimer() {
    this.timerCounter = 0;
    clearInterval(this.interval);
  }
  setDice(dice) {
    this.dice = dice;
  }
  setLimit(limit) {
    this.limit = limit;
  }
  setPhys(phys) {
    if (phys == this.phys) {
      this.phys--;
    } else {
      this.phys = phys;
    }
    localStorage.setItem('phys', this.phys + '');
  }
  setMental(mental) {
    if (mental == this.mental) {
      this.mental--;
    } else {
      this.mental = mental;
    }
    localStorage.setItem('mental', this.mental + '');
  }
  handicap() {
    return (Math.floor(this.phys / 3) + Math.floor(this.mental / 3)) * -1;
  }
  rollstart() {}
  roll() {
    let ones = 0;
    let successes = 0;
    let pool = [];
    for (let i = 0; i < this.dice; i++) {
      let tmpnum = this.getRandomDice();

      tmpnum == 1 ? ones++ : '';
      tmpnum > 4 ? successes++ : '';
      pool.push(tmpnum);
    }
    console.log('Erfolge:' + successes + ' Einser:' + ones);
    if (ones > this.dice / 2) {
      if (successes == 0) {
        this.result = 'KRIT';
      } else {
        this.result = 'Patzer(' + successes + ')';
      }
      return;
    } else {
      successes > this.limit
        ? (this.result = this.limit + '')
        : (this.result = successes + '');
    }
  }
  getRandomDice() {
    return Math.floor(Math.random() * (7 - 1)) + 1;
  }
}
