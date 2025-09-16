
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { mockDiaryEntries } from "@/lib/diary-data";
import { DiaryEntry, DiaryActivity } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  PlusCircle,
  Loader2,
  List,
  Leaf,
  SprayCan,
  Carrot,
  NotebookText,
} from "lucide-react";

// Mock data simulation
let diaryEntries: DiaryEntry[] = [...mockDiaryEntries];

const activityIcons: Record<DiaryActivity, React.ReactNode> = {
    Planting: <Leaf className="h-5 w-5 text-green-500" />,
    Spraying: <SprayCan className="h-5 w-5 text-blue-500" />,
    Harvesting: <Carrot className="h-5 w-5 text-orange-500" />,
    General: <NotebookText className="h-5 w-5 text-gray-500" />,
};

const diarySchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  activity: z.enum(["Planting", "Spraying", "Harvesting", "General"], {
    required_error: "Activity type is required.",
  }),
  crop: z.string().min(2, { message: "Crop name is required." }),
  details: z.string().min(5, { message: "Details must be at least 5 characters." }),
  quantity: z.preprocess(
    (a) => (a === '' ? undefined : parseFloat(String(a))),
    z.number().positive().optional()
  ),
  unit: z.string().optional(),
});

type DiaryFormValues = z.infer<typeof diarySchema>;

export default function FarmDiaryPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>(diaryEntries.sort((a, b) => b.date.getTime() - a.date.getTime()));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DiaryFormValues>({
    resolver: zodResolver(diarySchema),
    defaultValues: {
      crop: "",
      details: "",
    },
  });

  // Mock API call to add an entry
  const addEntry = async (data: DiaryEntry) => {
    return new Promise<DiaryEntry>((resolve) => {
      setTimeout(() => {
        // In a real app, this would be an API call to your backend
        diaryEntries = [data, ...diaryEntries];
        resolve(data);
      }, 500); // Simulate network delay
    });
  };

  const onSubmit = async (data: DiaryFormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: t({ en: "Authentication Required", hi: "प्रमाणीकरण आवश्यक है" }),
        description: t({ en: "Please sign in to save your diary entries.", hi: "कृपया अपनी डायरी प्रविष्टियों को सहेजने के लिए साइन इन करें।" }),
      });
      return;
    }

    setIsSubmitting(true);
    const newEntry: DiaryEntry = {
      id: new Date().toISOString(),
      ...data,
    };

    try {
      await addEntry(newEntry);
      setEntries(prev => [newEntry, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
      toast({
        title: t({ en: "Entry Added", hi: "प्रविष्टि जोड़ी गई" }),
        description: t({ en: "Your farm diary has been updated.", hi: "आपकी फार्म डायरी अपडेट कर दी गई है।" }),
      });
      form.reset({ crop: "", details: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t({ en: "Error", hi: "त्रुटि" }),
        description: t({ en: "Failed to add entry. Please try again.", hi: "प्रविष्टि जोड़ने में विफल। कृपया पुन: प्रयास करें।" }),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Farm Diary", hi: "फार्म डायरी" })}
        description={t({
          en: "Keep a log of your farming activities.",
          hi: "अपनी खेती की गतिविधियों का लॉग रखें।",
        })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Form Card */}
          <Card className="lg:col-span-1">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="text-primary" />
                  {t({ en: "Add New Entry", hi: "नई प्रविष्टि जोड़ें" })}
                </CardTitle>
                <CardDescription>
                  {t({
                    en: "Log an activity to keep track of your farm.",
                    hi: "अपने खेत का ट्रैक रखने के लिए एक गतिविधि लॉग करें।",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">{t({ en: "Date", hi: "तारीख" })}</Label>
                  <Controller
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t({ en: "Pick a date", hi: "एक तारीख चुनें" })}</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {form.formState.errors.date && <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity">{t({ en: "Activity", hi: "गतिविधि" })}</Label>
                  <Controller
                    name="activity"
                    control={form.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder={t({ en: "Select an activity", hi: "एक गतिविधि चुनें" })} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planting">{t({ en: "Planting", hi: "रोपण" })}</SelectItem>
                          <SelectItem value="Spraying">{t({ en: "Spraying", hi: "छिड़काव" })}</SelectItem>
                          <SelectItem value="Harvesting">{t({ en: "Harvesting", hi: "कटाई" })}</SelectItem>
                          <SelectItem value="General">{t({ en: "General Note", hi: "सामान्य नोट" })}</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.activity && <p className="text-sm text-destructive">{form.formState.errors.activity.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop">{t({ en: "Crop", hi: "फ़सल" })}</Label>
                  <Input id="crop" {...form.register("crop")} placeholder={t({ en: "e.g., Tomato", hi: "उदा., टमाटर" })} />
                  {form.formState.errors.crop && <p className="text-sm text-destructive">{form.formState.errors.crop.message}</p>}
                </div>
                 <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">{t({ en: "Quantity", hi: "मात्रा" })}</Label>
                    <Input id="quantity" type="number" {...form.register("quantity")} placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">{t({ en: "Unit", hi: "इकाई" })}</Label>
                    <Input id="unit" {...form.register("unit")} placeholder={t({ en: "kg, Liters, etc.", hi: "किग्रा, लीटर, आदि"})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">{t({ en: "Details / Notes", hi: "विवरण / नोट्स" })}</Label>
                  <Textarea id="details" {...form.register("details")} placeholder={t({ en: "Add notes about the activity...", hi: "गतिविधि के बारे में नोट्स जोड़ें..." })} />
                  {form.formState.errors.details && <p className="text-sm text-destructive">{form.formState.errors.details.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting || !user}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {user ? t({ en: "Save Entry", hi: "प्रविष्टि सहेजें" }) : t({ en: "Sign In to Save", hi: "सहेजने के लिए साइन इन करें" })}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Timeline Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <List />
                  {t({ en: "Activity Log", hi: "गतिविधि लॉग" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "Your recorded farming activities.", hi: "आपकी दर्ज की गई खेती की गतिविधियाँ।" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[550px] pr-4">
                    {entries.length > 0 ? (
                        <div className="relative pl-6 before:absolute before:inset-y-0 before:w-px before:bg-border before:left-0">
                            {entries.map(entry => (
                                <div key={entry.id} className="relative pb-8">
                                    <div className="absolute top-1 -left-[29px] h-6 w-6 rounded-full bg-secondary flex items-center justify-center border-2 border-primary">
                                       {activityIcons[entry.activity]}
                                    </div>
                                    <div className="p-4 rounded-lg bg-secondary/50">
                                        <p className="text-xs text-muted-foreground">{format(entry.date, "MMMM d, yyyy")}</p>
                                        <h4 className="font-semibold text-primary">{entry.activity} - {entry.crop}</h4>
                                        <p className="text-sm mt-1">{entry.details}</p>
                                        {entry.quantity && entry.unit && (
                                            <p className="text-sm mt-1 font-medium">{t({en: "Amount:", hi: "मात्रा:"})} {entry.quantity} {entry.unit}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                            <NotebookText className="w-16 h-16 mb-4"/>
                            <p>{t({ en: "No diary entries yet.", hi: "अभी तक कोई डायरी प्रविष्टि नहीं है।" })}</p>
                            <p className="text-sm">{t({ en: "Add an entry to get started.", hi: "शुरू करने के लिए एक प्रविष्टि जोड़ें।"})}</p>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

    