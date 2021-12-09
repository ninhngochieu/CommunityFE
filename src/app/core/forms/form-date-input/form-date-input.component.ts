import {Component, Input, OnInit, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-form-date-input',
  templateUrl: './form-date-input.component.html',
  styleUrls: ['./form-date-input.component.css']
})
export class FormDateInputComponent implements ControlValueAccessor{

  @Input()
  label!: string;
  @Input()
  maxDate!: Date;
  bsConfig!: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY'
    }
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
}
