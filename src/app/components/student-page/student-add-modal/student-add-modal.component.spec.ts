import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddModalComponent } from './student-add-modal.component';

describe('StudentAddModalComponent', () => {
  let component: StudentAddModalComponent;
  let fixture: ComponentFixture<StudentAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAddModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
