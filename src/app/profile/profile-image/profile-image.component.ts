import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.sass'],
})
export class ProfileImageComponent {
  @Input() widthAndHeight: string = '';
}
