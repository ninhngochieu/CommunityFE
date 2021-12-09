import {Component, Input, OnInit, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements ControlValueAccessor {

  @Input()
  label!: string;
  @Input() type = "text"
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  getControl(){
    return this.ngControl.control as FormControl;
  }

  test() {
    console.log(this.getControl())
  }
}
