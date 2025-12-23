"use client";

import * as React from "react";
import { PageWrapper } from "../../../../components/common/PageWrapper";
import { Card } from "../../../../components/common/Card";
import { Button } from "../../../../components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/shadcn/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/shadcn/alert";
import { Badge } from "../../../../components/shadcn/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/shadcn/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../components/shadcn/command";
import { Progress } from "../../../../components/shadcn/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/shadcn/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/shadcn/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/shadcn/breadcrumb";
import { Separator } from "../../../../components/shadcn/separator";
import { Skeleton } from "../../../../components/shadcn/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/shadcn/tabs";
import { Input } from "../../../../components/shadcn/input";
import { Label } from "../../../../components/shadcn/label";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Home,
  Info,
  Mail,
  Plus,
  Settings,
  User,
  Bell,
  HelpCircle,
  MessageSquare,
  Loader2,
} from "lucide-react";

const UIElementsPage = () => {
  const [progress, setProgress] = React.useState(13);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper pageName="UI Elements" hidePaper>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Buttons */}
          <Card isHeaderDividerVisible addTitleMargin title="Buttons">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium">Button Variants</span>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium">Button Sizes</span>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium">Buttons with Icons</span>
              <div className="flex flex-wrap gap-3">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card isHeaderDividerVisible addTitleMargin title="Alerts">
          <div className="flex flex-col gap-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert using the default variant from
                Shadcn.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is a destructive alert indicating an error or warning.
              </AlertDescription>
            </Alert>
          </div>
        </Card>

        {/* Command */}
        <Card isHeaderDividerVisible addTitleMargin title="Command">
          <Command className="rounded-lg border border-inputBorder">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </CommandItem>
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Card>

        {/* Avatars */}
        <Card isHeaderDividerVisible addTitleMargin title="Avatars">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
            </div>

            <div>
              <span className="text-sm font-medium mb-2 block">
                Avatar Group
              </span>
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-primaryBg">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-primaryBg">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-primaryBg">
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-primaryBg">
                  <AvatarFallback className="text-xs">+5</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Card isHeaderDividerVisible addTitleMargin title="Tabs">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4 mt-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Account Information</h3>
                <p className="text-sm text-secondaryText leading-relaxed">
                  Manage your account settings and preferences here.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">Account is verified</span>
              </div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4 mt-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Password Settings</h3>
                <p className="text-sm text-secondaryText leading-relaxed">
                  Change your password and security settings.
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4 mt-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-secondaryText leading-relaxed">
                  Configure general application settings.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email notifications</span>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dark mode</span>
                  <Badge variant="secondary">Auto</Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Skeletons */}
        <Card isHeaderDividerVisible addTitleMargin title="Skeletons">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
        {/* Dialogs */}
        <Card isHeaderDividerVisible addTitleMargin title="Dialogs">
          <div className="flex gap-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a description of what this dialog does. It provides
                    additional context to the user.
                  </DialogDescription>
                </DialogHeader>
                <div className="pb-4">
                  <p className="text-base text-primaryText">
                    This is the main content area of the dialog. You can place
                    any content here.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Badges */}
        <Card isHeaderDividerVisible addTitleMargin title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Card>

        {/* Popover */}
        <Card isHeaderDividerVisible addTitleMargin title="Popover">
          <div className="flex gap-4 flex-wrap">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-secondaryText">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width" className="text-sm">
                        Width
                      </Label>
                      <Input
                        id="width"
                        className="col-span-2"
                        defaultValue="100%"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height" className="text-sm">
                        Height
                      </Label>
                      <Input
                        id="height"
                        className="col-span-2"
                        defaultValue="25px"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  User Profile
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-primaryText">
                        John Doe
                      </h4>
                      <p className="text-sm text-secondaryText">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Message
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Card>

        {/* Progress */}
        <Card isHeaderDividerVisible addTitleMargin title="Progress">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Loading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Complete</span>
                <span>100%</span>
              </div>
              <Progress value={100} />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Starting</span>
                <span>0%</span>
              </div>
              <Progress value={0} />
            </div>
          </div>
        </Card>

        {/* Tooltips */}
        <Card isHeaderDividerVisible addTitleMargin title="Tooltips">
          <TooltipProvider delayDuration={100}>
            <div className="flex gap-4 flex-wrap">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send Email</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Help Center</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </Card>

        {/* Breadcrumbs */}
        <Card isHeaderDividerVisible addTitleMargin title="Breadcrumbs">
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">
                    Components
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>UI Elements</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Electronics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Card>

        {/* Separators */}
        <Card isHeaderDividerVisible addTitleMargin title="Separators">
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium mb-4">
                Horizontal Separator
              </h4>
              <div className="space-y-3">
                <p className="text-sm">Content above separator</p>
                <Separator />
                <p className="text-sm">Content below separator</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Vertical Separator</h4>
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Item 1</div>
                <Separator orientation="vertical" />
                <div>Item 2</div>
                <Separator orientation="vertical" />
                <div>Item 3</div>
              </div>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UIElementsPage;
