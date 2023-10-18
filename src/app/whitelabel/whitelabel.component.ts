import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-whitelabel',
  templateUrl:'./whitelabel.component.html',
  styleUrls: ['./whitelabel.component.css']
})
export class WhitelabelComponent {
  constructor(private titleService: Title) {
  }
  ngOnInit() {
    this.titleService.setTitle('White label sports betting software with an integrated online casino');
  }

}
