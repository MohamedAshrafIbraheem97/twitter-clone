import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { IconName } from './IconName';
import { IconService } from './icon.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass'],
})
export class IconComponent implements OnInit {
  @Input() iconName: any;

  defaultColor: string = '0,0,0';
  defaultBackgroundColor: string = '0,0,0,0';
  numberOfLikes: number = 0;
  iconDetails: any;
  isTweetLiked: boolean = false;

  constructor(private iconService: IconService) {}

  ngOnInit(): void {
    // setting icon on the initialization
    this.iconDetails = this.iconService.getIcon(this.iconName);
  }

  // to handle the like and unlike actions
  onLike(parentDiv: any) {
    if (this.iconName === IconName.LIKE || this.iconName === IconName.LIKED) {
      if (!this.isTweetLiked) {
        this.isTweetLiked = true;
        this.numberOfLikes++;
        this.iconDetails.icon = this.iconService.getIcon(IconName.LIKED)?.icon;
        this.changeColor(
          parentDiv.firstElementChild,
          this.iconDetails.color,
          this.iconDetails.color,
          false
        );
      } else {
        this.isTweetLiked = false;
        this.iconDetails.icon = this.iconService.getIcon(IconName.LIKE)?.icon;
        this.numberOfLikes--;
      }
    }
  }

  // to change color and background-color of the icon only
  changeColor(
    icon: any,
    textColor: string,
    backgroundColor: string,
    isBgColorTransparent: boolean
  ) {
    icon.style.color = `rgba(${textColor})`;
    icon.style.backgroundColor = isBgColorTransparent
      ? `rgba(${backgroundColor})`
      : `rgba(${backgroundColor},.2)`;
  }

  onMouseEnter(parentDiv: any) {
    let icon = parentDiv.firstElementChild;

    if (this.numberOfLikes != 0) {
      let numberNextToIcon = parentDiv.lastElementChild;
      this.changeColor(
        numberNextToIcon,
        this.iconDetails.color,
        this.defaultBackgroundColor,
        true
      );
    }

    this.changeColor(
      icon,
      this.iconDetails.color,
      this.iconDetails.color,
      false
    );
  }

  onMouseLeave(parentDiv: any) {
    let icon = parentDiv.firstElementChild;
    let numberNextToIcon: any;

    if (this.numberOfLikes != 0) {
      numberNextToIcon = parentDiv.lastElementChild;

      this.changeColor(
        numberNextToIcon,
        this.defaultColor,
        this.defaultBackgroundColor,
        true
      );
    }

    if (this.isTweetLiked) {
      this.changeColor(
        icon,
        this.iconDetails.color,
        this.defaultBackgroundColor,
        true
      );

      this.changeColor(
        numberNextToIcon,
        this.iconDetails.color,
        this.defaultBackgroundColor,
        true
      );
    } else {
      this.changeColor(
        icon,
        this.defaultColor,
        this.defaultBackgroundColor,
        true
      );
    }
  }
}
