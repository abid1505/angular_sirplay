import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sirplay_task';
  onActivate(event: any){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
  }
  scrollToContact() {
    const contactElement = document.querySelector('#contact'); // Use the ID of the target element
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
