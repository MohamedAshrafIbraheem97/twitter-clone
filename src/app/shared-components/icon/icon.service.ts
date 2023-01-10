import { Injectable } from '@angular/core';

import { IconName } from './IconName';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  icons: Map<IconName, { icon: string; color: string }> = new Map([
    [
      IconName.LIKED,
      { color: '255,0,0', icon: '<i class="fa-solid fa-heart"></i>' },
    ],
    [
      IconName.LIKE,
      { color: '255,0,0', icon: '<i class="fa-regular fa-heart"></i>' },
    ],
    [
      IconName.RETWEET,
      { color: '80, 200, 120', icon: '<i class="fa-solid fa-retweet"></i>' },
    ],
    [
      IconName.REPLY,
      {
        color: '51, 224, 255',
        icon: '<i class="fa-regular fa-comment-dots"></i>',
      },
    ],
  ]);

  getIcon(iconName: IconName) {
    return this.icons.get(iconName);
  }
}
