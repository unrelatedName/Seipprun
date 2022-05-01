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
  timerCounter = 6;
  timeLeft = 60;
  interval;
  handicap = 0;

  constructor() {
    this.phys = Number(localStorage.getItem('phys'));
    this.mental = Number(localStorage.getItem('mental'));
    this.dice = Number(localStorage.getItem('dice'));
    this.limit = Number(localStorage.getItem('limit'));
    this.calculateHandicap();
  }
  startTimer() {
    this.result = '';
    this.timerCounter = 0;
    this.interval = setInterval(() => {
      this.timerCounter++;
      console.log(this.timerCounter);
      if (this.timerCounter == 4) {
        this.roll();
      }
      if (this.timerCounter > 6) {
        clearInterval(this.interval);
      }
    }, 300);
  }
  stopTimer() {
    /*     this.timerCounter = 0;
    clearInterval(this.interval); */
  }
  setDice(dice) {
    this.dice = dice;
    localStorage.setItem('dice', this.dice + '');
  }
  setLimit(limit) {
    this.limit = limit;
    localStorage.setItem('limit', this.limit + '');
  }
  setPhys(phys) {
    if (phys == this.phys) {
      this.phys--;
    } else {
      this.phys = phys;
    }
    localStorage.setItem('phys', this.phys + '');
    this.calculateHandicap();
  }
  setMental(mental) {
    if (mental == this.mental) {
      this.mental--;
    } else {
      this.mental = mental;
    }
    localStorage.setItem('mental', this.mental + '');
    this.calculateHandicap();
  }

  calculateHandicap() {
    this.handicap =
      (Math.floor(this.phys / 3) + Math.floor(this.mental / 3)) * -1;
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
  edgeReroll() {}
  getRandomDice() {
    return Math.floor(Math.random() * (7 - 1)) + 1;
  }
}
