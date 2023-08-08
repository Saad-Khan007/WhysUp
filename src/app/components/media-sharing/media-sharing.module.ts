import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media/media.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { VideoPlayerComponent } from './video-player/video-player.component';



@NgModule({
  declarations: [
    MediaComponent,
    ImageViewerComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MediaSharingModule { }
