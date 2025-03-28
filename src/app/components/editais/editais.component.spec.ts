import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaisComponent } from './editais.component';

describe('EditaisComponent', () => {
  let component: EditaisComponent;
  let fixture: ComponentFixture<EditaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
