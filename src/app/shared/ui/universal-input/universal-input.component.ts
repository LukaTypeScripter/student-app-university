import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {MatFormField, MatInput} from "@angular/material/input";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UniversalInputComponent),
  multi: true,
};
@Component({
  selector: 'app-universal-input',
  standalone: true,
  imports: [
    MatInput,
    MatFormField
  ],
  templateUrl: './universal-input.component.html',
  styleUrl: './universal-input.component.scss',
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR]
})
export class UniversalInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  value: string = '';
  constructor() {}

  ngOnInit() {}

  onChanged: Function = () => {};
  onTouched: Function = () => {};
  onWriteValue: Function = () => {};

  registerOnChange(fn: Function) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  handleInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChanged(inputValue);
  }
}
