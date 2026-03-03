"use client";

import { CheckboxesForm } from "./CheckboxesForm";
import { ColorPickerForm } from "./ColorPickerForm";
import { DatePickerForm } from "./DatePickerForm";
import { FileUploadForm } from "./FileUploadForm";
import { FormValidationForm } from "./FormValidationForm";
import { InputFieldsForm } from "./InputFieldsForm";
import { RadioButtonsForm } from "./RadioButtonsForm";
import { SelectInputsForm } from "./SelectInputsForm";
import { SlidersForm } from "./SlidersForm";
import { TextareaForm } from "./TextareaForm";
import { ToggleSwitchForm } from "./ToggleSwitchForm";

/**
 * Layout container for the forms demo page.
 * Displays all form variants in a responsive two-column grid.
 *
 * @component
 */
export const FormsView = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
      <h1 className="sr-only">Forms</h1>
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        <InputFieldsForm />
        <SelectInputsForm />
        <TextareaForm />
        <ColorPickerForm />
        <FormValidationForm />
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        <FileUploadForm />
        <CheckboxesForm />
        <RadioButtonsForm />
        <ToggleSwitchForm />
        <DatePickerForm />
        <SlidersForm />
      </div>
    </div>
  );
};
