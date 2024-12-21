import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdatePageComponent } from './student-update-page.component';

describe('StudentUpdatePageComponent', () => {
  let component: StudentUpdatePageComponent;
  let fixture: ComponentFixture<StudentUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentUpdatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
