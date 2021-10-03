import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'voxel-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {

  @Input() set max(value: number) {
    this.list = Array(value).fill(false);
  }
  @Input() value: number = 0;

  public list: boolean[] = [];
}
