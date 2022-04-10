import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  dice = 1;
  limit = 1;
  result: string = '0';
  phys = 0;
  mental=0;

  constructor(){
    this.phys = Number(localStorage.getItem('phys'));
    this.mental = Number(localStorage.getItem('mental'));
  }

  setDice(dice: number) {
    this.dice = dice;
  }

  setLimit(limit: number) {
    this.limit = limit;
  }

  setPhys(phys: number) {
    if(phys == this.phys ){
      this.phys--;
    }else{
      this.phys = phys;
    }
    localStorage.setItem('phys', this.phys+'');
  }

  setMental(mental: number) {
    if(mental == this.mental ){
      this.mental--;
    }else{
      this.mental = mental;
    }
    localStorage.setItem('mental', this.mental+'');
  }

  handicap():number{
    return (Math.floor(this.phys/3) + Math.floor(this.mental/3)) * -1;
  }

  roll() {
    let ones = 0;
    let successes = 0;
    let pool: number[] = [];
    for (let i = 0; i < this.dice; i++) {
      let tmpnum = this.getRandomDice();
      //console.log(tmpnum);
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

  getRandomDice(): number {
    return Math.floor(Math.random() * (7 - 1)) + 1;
  }
}
