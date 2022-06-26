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
  successes = 0;
  ones = 0;
  edgeroll = false;

  constructor() {
    this.phys = Number(localStorage.getItem('phys'));
    this.mental = Number(localStorage.getItem('mental'));
    this.dice = Number(localStorage.getItem('dice'));
    this.limit = Number(localStorage.getItem('limit'));
    this.calculateHandicap();

    this.roll(1000, true);

  }
  startTimer() {
    this.result = '';
    this.edgeroll = false;
    this.timerCounter = 0;
    this.interval = setInterval(() => {
      this.timerCounter++;
      /* console.log(this.timerCounter); */
      if (this.timerCounter == 4) {
        this.roll(this.dice);
        clearInterval(this.interval);
      }
    }, 200);
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
  roll(rollingDice:number, debug?:boolean) {
    this.ones = 0;
    this.successes = 0;
    let pool = [];
    let debugarray = [0,0,0,0,0,0,0];
    for (let i = 0; i < rollingDice; i++) {
      let tmpnum = this.getRandomDice();
      debugarray[tmpnum]++;
      tmpnum == 1 ? this.ones++ : '';
      tmpnum > 4 ? this.successes++ : '';
      pool.push(tmpnum);
    }
    console.log('Erfolge:' + this.successes + ' Einser:' + this.ones);
    if(debug){
      console.log(debugarray);
      console.log('Statistische Auswertung 1000 Würfel 1:' + debugarray[1]/10 + '% 2:' + debugarray[2]/10 + '% 3:' + debugarray[3]/10 + '% 4:' + debugarray[4]/10 + '% 5:' + debugarray[5]/10 + '% 6:' + debugarray[6]/10 + '% ')
    }
    if (this.ones > rollingDice / 2) {
      if (this.successes == 0) {
        this.result = 'KRIT';
      } else {
        this.result = 'P(' + this.successes + ')';
      }
      return;
    } else {
      this.successes > this.limit
        ? (this.result = this.limit + '')
        : (this.result = this.successes + '');
    }
    if(debug){
      this.result = 0+'';
      this.successes = 0;
      this.ones = 0;
    }
  }
  edgeReroll() {
    this.edgeroll = true;
    let rerollpool = this.dice - this.successes;
    console.log('Rerolling Dice: ' + rerollpool);
    let pool = [];
    let tmpsuccesses = 0;
    let tmpones = 0;

    for (let i = 0; i < rerollpool; i++) {
      let tmpnum = this.getRandomDice();
      tmpnum == 1 ? tmpones++ : '';
      tmpnum > 4 ? tmpsuccesses++ : '';
      pool.push(tmpnum);
    }
    console.log('Neue Erfolge:' + tmpsuccesses + 'Neue Einser:' + tmpones);

    this.successes = this.successes + tmpsuccesses;
    this.ones = this.ones + tmpones;

    if (this.ones > this.dice / 2) {
      if (this.successes == 0) {
        this.result = 'KRIT';
      } else {
        this.result = 'P(' + this.successes + ')';
      }
      return;
    } else {
      this.successes > this.limit
        ? (this.result = this.limit + '')
        : (this.result = this.successes + '');
    }
  }
  getRandomDice() {
    return Math.floor(Math.random() * (7 - 1)) + 1;
  }
}
