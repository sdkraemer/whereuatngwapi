import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendViewerComponent } from './friend-viewer.component';

describe('FriendViewerComponent', () => {
  let component: FriendViewerComponent;
  let fixture: ComponentFixture<FriendViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
