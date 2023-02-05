import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  @Output() authTypeIsLogin = new EventEmitter<boolean>();

  showAuthBasedOnType(type: boolean) {
    this.authTypeIsLogin.emit(type);
  }
}
