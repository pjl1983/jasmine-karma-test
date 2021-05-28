import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should start with 0'`, () => {
    expect(component.count).toEqual(0);
  });

  it('should increment by one when button clicked', fakeAsync(() => {
    fixture.detectChanges();
    let buttonElement = fixture.debugElement.query(By.css('#increase-count'));
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.count).toBe(1);
    });
  }));

  it('should set variable to selected list item', fakeAsync(() => {
    fixture.detectChanges();
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#cars')).nativeElement;
    select.click();
    fixture.detectChanges();
    const selectedValue = select.options[1];
    select.value = selectedValue.value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.carType).toBe(selectedValue.innerHTML.toLowerCase());
    });
  }));
});
