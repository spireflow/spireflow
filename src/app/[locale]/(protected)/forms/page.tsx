"use client";

import * as React from "react";
import { PageWrapper } from "../../../../components/common/PageWrapper";
import { Card } from "../../../../components/common/Card";
import { Input } from "../../../../components/shadcn/input";
import { Label } from "../../../../components/shadcn/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/shadcn/select";
import { Textarea } from "../../../../components/shadcn/textarea";
import { Checkbox } from "../../../../components/shadcn/checkbox";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/shadcn/radio-group";
import { Switch } from "../../../../components/shadcn/switch";
import { Button } from "../../../../components/shadcn/button";
import {
  Check,
  ChevronsUpDown,
  UploadCloud,
  Eye,
  EyeOff,
  Mail,
} from "lucide-react";
import { CalendarIcon } from "../../../../assets/icons/CalendarIcon";
import { cn } from "../../../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/shadcn/popover";
import { useTheme } from "next-themes";
import { Slider } from "../../../../components/shadcn/slider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HexColorPicker } from "react-colorful";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/shadcn/form";

// Mock data for selects
const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

// Form Schema for Validation Example using Yup
const formSchema = yup.object({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters.")
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required"),
});

export default function FormsPage() {
  const [date, setDate] = React.useState<Date>(new Date(2025, 3, 23)); // 23.04.2025
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [comboboxValue, setComboboxValue] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [color, setColor] = React.useState("#4bbf7d");
  const [openColorPicker, setOpenColorPicker] = React.useState(false);
  const { theme } = useTheme();
  const datePickerRef = React.useRef(null);

  // Form definition
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: yup.InferType<typeof formSchema>) {
    console.log(values);
  }


  return (
    <PageWrapper pageName="Forms" hidePaper>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Input Fields */}
          <Card isHeaderDividerVisible addTitleMargin title="Input Fields">
            <div className="flex flex-col gap-6">
              <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
                <Label htmlFor="email">Default Input</Label>
                <Input type="text" id="email" placeholder="Default Input" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
                <Label htmlFor="active">Active Input</Label>
                <Input
                  type="text"
                  id="active"
                  placeholder="Active Input"
                  className="border-ringBorder"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
                <Label htmlFor="password">Password Input</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-secondaryText" />
                    ) : (
                      <Eye className="h-4 w-4 text-secondaryText" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
                <Label htmlFor="error">Error Input</Label>
                <Input
                  type="text"
                  id="error"
                  placeholder="Error Input"
                  className="border-red-500 focus-visible:ring-red-500"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input
                  disabled
                  type="text"
                  id="disabled"
                  placeholder="Disabled Input"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
                <Label htmlFor="email-icon">Input with Icon</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-[0.725rem] h-4 w-4 text-secondaryText" />
                  <Input type="email" placeholder="Email" className="pl-8" />
                </div>
              </div>
            </div>
          </Card>

          {/* Select Inputs */}
          <Card isHeaderDividerVisible addTitleMargin title="Select Inputs">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 w-1/2">
                <Label>Select Option</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3 w-1/2">
                <Label>Combobox (Searchable)</Label>
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="w-full justify-between"
                    >
                      {comboboxValue
                        ? frameworks.find(
                            (framework) => framework.value === comboboxValue
                          )?.label
                        : "Select framework..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setComboboxValue(
                                  currentValue === comboboxValue
                                    ? ""
                                    : currentValue
                                );
                                setOpenCombobox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  comboboxValue === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </Card>

          {/* Textarea */}
          <Card isHeaderDividerVisible addTitleMargin title="Textarea">
            <div className="grid w-full gap-[0.8rem]">
              <Label htmlFor="message">Description</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                rows={6}
              />
            </div>
          </Card>

          {/* Color Picker */}
          <Card
            isHeaderDividerVisible
            addTitleMargin
            title="Color Picker"
          >
            <div className="flex flex-col gap-6">
              <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
                <Label>Pick a Color</Label>
                <Popover open={openColorPicker} onOpenChange={setOpenColorPicker}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[11.34rem] justify-start text-left font-normal pl-2"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded-md border border-inputBorder"
                          style={{ backgroundColor: color }}
                        />
                        <div className="text-sm">{color}</div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="start">
                    <div className="flex flex-col gap-3">
                      <HexColorPicker color={color} onChange={setColor} />
                      <Input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="font-mono px-2 [width:12.5rem]"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </Card>

          {/* Form Validation Example */}
          <Card
            isHeaderDividerVisible
            addTitleMargin
            title="Form Validation"
          >
            <div className="text-sm text-secondaryText mb-6">
              Using react-hook-form and yup for validation.
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* File Upload */}
          <Card isHeaderDividerVisible addTitleMargin title="File Upload">
            <div>
              <Label className="mb-4 block">Dropzone</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-inputBorder border-dashed rounded-lg cursor-pointer bg-dropzoneBg hover:bg-dropzoneBgHover"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-4 text-secondaryText" />
                    <p className="mb-2 text-sm text-secondaryText">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-secondaryText">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </Card>

          {/* Checkboxes */}
          <Card isHeaderDividerVisible addTitleMargin title="Checkboxes">
            <div className="flex flex-col gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Default Checkbox</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checked" defaultChecked />
                <Label htmlFor="checked">Checked Checkbox</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-check" disabled />
                <Label htmlFor="disabled-check">Disabled Checkbox</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-checked" disabled defaultChecked />
                <Label htmlFor="disabled-checked">
                  Disabled Checked Checkbox
                </Label>
              </div>
            </div>
          </Card>

          {/* Radio Buttons */}
          <Card isHeaderDividerVisible addTitleMargin title="Radio Buttons">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Default Radio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Secondary Radio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                  disabled
                />
                <Label htmlFor="option-three">Disabled Radio</Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Toggles */}
          <Card isHeaderDividerVisible addTitleMargin title="Toggle Switch">
            <div className="flex flex-col gap-6">
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Default Switch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="checked-switch" defaultChecked />
                <Label htmlFor="checked-switch">Checked Switch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-switch" disabled />
                <Label htmlFor="disabled-switch">Disabled Switch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-checked-switch" disabled defaultChecked />
                <Label htmlFor="disabled-checked-switch">
                  Disabled Checked Switch
                </Label>
              </div>
            </div>
          </Card>

          {/* Date Picker */}
          <Card isHeaderDividerVisible addTitleMargin title="Date Picker">
            <div className="flex flex-col gap-[0.8rem]">
              <Label>Select Date</Label>
              <div className="flex relative h-[2.3rem] w-[10rem]">
                <DatePicker
                  ref={datePickerRef}
                  selected={date}
                  onChange={(date) => date && setDate(date)}
                  className="pl-3 p-2 text-sm bg-inputBg hover:bg-inputBgHover w-full h-[2.3rem] border rounded-md border-inputBorder text-primaryText placeholder-secondaryText hover:border-inputBorderHover transition"
                  placeholderText="Pick a date"
                />
                <div
                  // @ts-ignore
                  onClick={() => datePickerRef.current.setOpen(true)}
                  className="absolute right-2 top-[0.5rem] stroke-gray-400 fill-gray-400 text-gray-400 hover:stroke-secondaryText cursor-pointer"
                >
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </Card>

          {/* Sliders */}
          <Card isHeaderDividerVisible addTitleMargin title="Sliders">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-[0.8rem]">
                <Label>Default Slider</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
              <div className="flex flex-col gap-[0.8rem]" style={{ marginTop: "1rem" }}>
                <Label>Range Slider</Label>
                <Slider defaultValue={[25, 75]} max={100} step={1} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
