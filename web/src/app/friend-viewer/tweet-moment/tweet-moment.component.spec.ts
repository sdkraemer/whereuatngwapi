import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetMomentComponent } from './tweet-moment.component';

describe('TweetMomentComponent', () => {
  let component: TweetMomentComponent;
  let fixture: ComponentFixture<TweetMomentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetMomentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
