import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitterService } from './twitter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TwitterService]
})
export class TwitterModule { }
