
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
    setIsSubmitting(true);
    const newEntry: DiaryEntry = {
      id: new Date().toISOString(),
      ...data,
    };

    try {
      await addEntry(newEntry);
      setEntries(prev => [newEntry, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
      toast({
        title: t({ en: "Entry Added", hi: "प्रविष्टि जोड़ी गई", ml: "എൻട്രി ചേർത്തു", ta: "பதிவு சேர்க்கப்பட்டது", te: "నమోదు జోడించబడింది", kn: "ಪ್ರವೇಶವನ್ನು ಸೇರಿಸಲಾಗಿದೆ", bn: "এন্ট্রি যোগ করা হয়েছে", mr: "नोंद जोडली", gu: "પ્રવિષ્ટિ ઉમેરાઈ", pa: "ਇੰਦਰਾਜ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ" }),
        description: t({ en: "Your farm diary has been updated.", hi: "आपकी फार्म डायरी अपडेट कर दी गई है।", ml: "നിങ്ങളുടെ ഫാം ഡയറി അപ്ഡേറ്റ് ചെയ്തു.", ta: "உங்கள் பண்ணை நாட்குறிப்பு புதுப்பிக்கப்பட்டது.", te: "మీ వ్యవసాయ డైరీ నవీకరించబడింది.", kn: "ನಿಮ್ಮ ಫಾರ್ಮ್ ಡೈರಿ ನವೀಕರಿಸಲಾಗಿದೆ.", bn: "আপনার খামার ডায়েরি আপডেট করা হয়েছে।", mr: "तुमची फार्म डायरी अपडेट केली आहे.", gu: "તમારી ફાર્મ ડાયરી અપડેટ કરવામાં આવી છે.", pa: "ਤੁਹਾਡੀ ਫਾਰਮ ਡਾਇਰੀ ਅਪਡੇਟ ਕੀਤੀ ਗਈ ਹੈ।" }),
      });
      form.reset({ crop: "", details: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t({ en: "Error", hi: "त्रुटि", ml: "പിശക്", ta: "பிழை", te: "లోపం", kn: "ದೋಷ", bn: "ত্রুটি", mr: "त्रुटी", gu: "ભૂલ", pa: "ਗਲਤੀ" }),
        description: t({ en: "Failed to add entry. Please try again.", hi: "प्रविष्टि जोड़ने में विफल। कृपया पुन: प्रयास करें।", ml: "എൻട്രി ചേർക്കുന്നതിൽ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.", ta: "பதிவைச் சேர்ப்பதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.", te: "నమోదును జోడించడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.", kn: "ಪ್ರವೇಶವನ್ನು ಸೇರಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", bn: "এন্ট্রি যোগ করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।", mr: "नोंद जोडण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.", gu: "પ્રવિષ્ટિ ઉમેરવામાં નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.", pa: "ਇੰਦਰਾਜ ਸ਼ਾਮਲ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header
        title={t({ en: "Farm Diary", hi: "फार्म डायरी", ml: "ഫാം ഡയറി", ta: "பண்ணை நாட்குறிப்பு", te: "ఫార్మ్ డైరీ", kn: "ಫಾರ್ಮ್ ಡೈರಿ", bn: "খামার ডায়েরি", mr: "फार्म डायरी", gu: "ફાર્મ ડાયરી", pa: "ਫਾਰਮ ਡਾਇਰੀ" })}
        description={t({
          en: "Keep a log of your farming activities.",
          hi: "अपनी खेती की गतिविधियों का लॉग रखें।",
          ml: "നിങ്ങളുടെ കാർഷിക പ്രവർത്തനങ്ങളുടെ ഒരു ലോഗ് സൂക്ഷിക്കുക.",
          ta: "உங்கள் விவசாய நடவடிக்கைகளின் பதிவை வைத்திருங்கள்.",
          te: "మీ వ్యవసాయ కార్యకలాపాల లాగ్ ఉంచండి.",
          kn: "ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳ ದಾಖಲೆಯನ್ನು ಇರಿಸಿ.",
          bn: "আপনার কৃষি কার্যক্রমের একটি লগ রাখুন।",
          mr: "तुमच्या शेतीच्या कामांची नोंद ठेवा.",
          gu: "તમારી ખેતીની પ્રવૃત્તિઓનો લોગ રાખો.",
          pa: "ਆਪਣੀਆਂ ਖੇਤੀ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦਾ ਇੱਕ ਲਾਗ ਰੱਖੋ।"
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
                  {t({ en: "Add New Entry", hi: "नई प्रविष्टि जोड़ें", ml: "പുതിയ എൻട്രി ചേർക്കുക", ta: "புதிய பதிவைச் சேர்க்கவும்", te: "కొత్త నమోదును జోడించు", kn: "ಹೊಸ ನಮೂದನ್ನು ಸೇರಿಸಿ", bn: "নতুন এন্ট্রি যোগ করুন", mr: "नवीन नोंद जोडा", gu: "નવી પ્રવિષ્ટિ ઉમેરો", pa: "ਨਵਾਂ ਇੰਦਰਾਜ ਸ਼ਾਮਲ ਕਰੋ" })}
                </CardTitle>
                <CardDescription>
                  {t({
                    en: "Log an activity to keep track of your farm.",
                    hi: "अपने खेत का ट्रैक रखने के लिए एक गतिविधि लॉग करें।",
                    ml: "നിങ്ങളുടെ ഫാമിന്റെ ട്രാക്ക് സൂക്ഷിക്കാൻ ഒരു പ്രവർത്തനം ലോഗ് ചെയ്യുക.",
                    ta: "உங்கள் பண்ணையைக் கண்காணிக்க ஒரு செயல்பாட்டைப் பதிவு செய்யவும்.",
                    te: "మీ వ్యవసాయాన్ని ట్రాక్ చేయడానికి ఒక కార్యాచరణను లాగ్ చేయండి.",
                    kn: "ನಿಮ್ಮ ಫಾರ್ಮ್ ಅನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಒಂದು ಚಟುವಟಿಕೆಯನ್ನು ಲಾಗ್ ಮಾಡಿ.",
                    bn: "আপনার খামারের ট্র্যাক রাখতে একটি কার্যকলাপ লগ করুন।",
                    mr: "तुमच्या फार्मचा मागोवा ठेवण्यासाठी एक क्रियाकलाप लॉग करा.",
                    gu: "તમારા ફાર્મનો ટ્રેક રાખવા માટે પ્રવૃત્તિ લોગ કરો.",
                    pa: "ਆਪਣੇ ਖੇਤ ਦਾ ਧਿਆਨ ਰੱਖਣ ਲਈ ਇੱਕ ਗਤੀਵਿਧੀ ਨੂੰ ਲੌਗ ਕਰੋ।"
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">{t({ en: "Date", hi: "तारीख", ml: "തീയതി", ta: "தேதி", te: "తేదీ", kn: "ದಿನಾಂಕ", bn: "তারিখ", mr: "तारीख", gu: "તારીખ", pa: "ਮਿਤੀ" })}</Label>
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
                              <span>{t({ en: "Pick a date", hi: "एक तारीख चुनें", ml: "ഒരു തീയതി തിരഞ്ഞെടുക്കുക", ta: "ஒரு தேதியைத் தேர்ந்தெடுக்கவும்", te: "ఒక తేదీని ఎంచుకోండి", kn: "ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ", bn: "একটি তারিখ নির্বাচন করুন", mr: "एक तारीख निवडा", gu: "તારીખ પસંદ કરો", pa: "ਇੱਕ ਮਿਤੀ ਚੁਣੋ" })}</span>
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
                  <Label htmlFor="activity">{t({ en: "Activity", hi: "गतिविधि", ml: "പ്രവർത്തനം", ta: "செயல்பாடு", te: "కార్యాచరణ", kn: "ಚಟುವಟಿಕೆ", bn: "কার্যকলাপ", mr: "क्रियाकलाप", gu: "પ્રવૃત્તિ", pa: "ਗਤੀਵਿਧੀ" })}</Label>
                  <Controller
                    name="activity"
                    control={form.control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder={t({ en: "Select an activity", hi: "एक गतिविधि चुनें", ml: "ഒരു പ്രവർത്തനം തിരഞ്ഞെടുക്കുക", ta: "ஒரு செயல்பாட்டைத் தேர்ந்தெடுக்கவும்", te: "ఒక కార్యాచరణను ఎంచుకోండి", kn: "ಒಂದು ಚಟುವಟಿಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", bn: "একটি কার্যকলাপ নির্বাচন করুন", mr: "एक क्रियाकलाप निवडा", gu: "પ્રવૃત્તિ પસંદ કરો", pa: "ਇੱਕ ਗਤੀਵਿਧੀ ਚੁਣੋ" })} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planting">{t({ en: "Planting", hi: "रोपण", ml: "നടീൽ", ta: "நடுதல்", te: "నాటడం", kn: "ನೆಡುವುದು", bn: "রোপণ", mr: "लागवड", gu: "વાવેતર", pa: "ਪੌਦੇ ਲਗਾਉਣਾ" })}</SelectItem>
                          <SelectItem value="Spraying">{t({ en: "Spraying", hi: "छिड़काव", ml: "തളിക്കൽ", ta: "தெளித்தல்", te: "స్ప్రేయింగ్", kn: "ಸಿಂಪಡಿಸುವುದು", bn: "স্প্রে করা", mr: "फवारणी", gu: "છંટકાવ", pa: "ਸਪਰੇਅ ਕਰਨਾ" })}</SelectItem>
                          <SelectItem value="Harvesting">{t({ en: "Harvesting", hi: "कटाई", ml: "വിളവെടുപ്പ്", ta: "அறுவடை", te: "పంటకోత", kn: "ಕೊಯ್ಲು", bn: "ফসল কাটা", mr: "कापणी", gu: "લણણી", pa: "ਵਾਢੀ" })}</SelectItem>
                          <SelectItem value="General">{t({ en: "General Note", hi: "सामान्य नोट", ml: "പൊതുവായ കുറിപ്പ്", ta: "பொது குறிப்பு", te: "సాధారణ గమనిక", kn: "ಸಾಮಾನ್ಯ ಟಿಪ್ಪಣಿ", bn: "সাধারণ নোট", mr: "सामान्य नोंद", gu: "સામાન્ય નોંધ", pa: "ਆਮ ਨੋਟ" })}</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.activity && <p className="text-sm text-destructive">{form.formState.errors.activity.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop">{t({ en: "Crop", hi: "फ़सल", ml: "വിള", ta: "பயிர்", te: "పంట", kn: "ಬೆಳೆ", bn: "ফসল", mr: "पीक", gu: "પાક", pa: "ਫਸਲ" })}</Label>
                  <Input id="crop" {...form.register("crop")} placeholder={t({ en: "e.g., Tomato", hi: "उदा., टमाटर", ml: "ഉദാ., തക്കാളി", ta: "எ.கா., தக்காளி", te: "ఉదా., టమోటా", kn: "ಉದಾ., ಟೊಮೇಟೊ", bn: "উদাঃ, টমেটো", mr: "उदा. टोमॅटो", gu: "ઉદા., ટામેટા", pa: "ਉਦਾ., ਟਮਾਟਰ" })} />
                  {form.formState.errors.crop && <p className="text-sm text-destructive">{form.formState.errors.crop.message}</p>}
                </div>
                 <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">{t({ en: "Quantity", hi: "मात्रा", ml: "അളവ്", ta: "அளவு", te: "పరిమాణం", kn: "ಪ್ರಮಾಣ", bn: "পরিমাণ", mr: "प्रमाण", gu: "જથ્થો", pa: "ਮਾਤਰਾ" })}</Label>
                    <Input id="quantity" type="number" {...form.register("quantity")} placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">{t({ en: "Unit", hi: "इकाई", ml: "യൂണിറ്റ്", ta: "அலகு", te: "యూనిట్", kn: "ಘಟಕ", bn: "একক", mr: "एकक", gu: "એકમ", pa: "ਇਕਾਈ" })}</Label>
                    <Input id="unit" {...form.register("unit")} placeholder={t({ en: "kg, Liters, etc.", hi: "किग्रा, लीटर, आदि", ml: "കിലോ, ലിറ്റർ, തുടങ്ങിയവ.", ta: "கிலோ, லிட்டர், முதலியன.", te: "కిలో, లీటర్లు, మొదలైనవి.", kn: "ಕೆಜಿ, ಲೀಟರ್, ಇತ್ಯಾದಿ.", bn: "কেজি, লিটার, ইত্যাদি।", mr: "किलो, लिटर, इत्यादी.", gu: "કિલો, લિટર, વગેરે.", pa: "ਕਿਲੋ, ਲੀਟਰ, ਆਦਿ"})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">{t({ en: "Details / Notes", hi: "विवरण / नोट्स", ml: "വിശദാംശങ്ങൾ / കുറിപ്പുകൾ", ta: "விவரங்கள் / குறிப்புகள்", te: "వివరాలు / గమనికలు", kn: "ವಿವರಗಳು / ಟಿಪ್ಪಣಿಗಳು", bn: "বিবরণ / নোট", mr: "तपशील / नोंदी", gu: "વિગતો / નોંધો", pa: "ਵੇਰਵੇ / ਨੋਟਸ" })}</Label>
                  <Textarea id="details" {...form.register("details")} placeholder={t({ en: "Add notes about the activity...", hi: "गतिविधि के बारे में नोट्स जोड़ें...", ml: "പ്രവർത്തനത്തെക്കുറിച്ചുള്ള കുറിപ്പുകൾ ചേർക്കുക...", ta: "செயல்பாடு பற்றிய குறிப்புகளைச் சேர்க்கவும்...", te: "కార్యాచరణ గురించి గమనికలను జోడించండి...", kn: "ಚಟುವಟಿಕೆಯ ಬಗ್ಗೆ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿ...", bn: "কার্যকলাপ সম্পর্কে নোট যোগ করুন...", mr: "क्रियाकलापाबद्दल नोंदी जोडा...", gu: "પ્રવૃત્તિ વિશે નોંધો ઉમેરો...", pa: "ਗਤੀਵਿਧੀ ਬਾਰੇ ਨੋਟ ਸ਼ਾਮਲ ਕਰੋ..." })} />
                  {form.formState.errors.details && <p className="text-sm text-destructive">{form.formState.errors.details.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t({ en: "Save Entry", hi: "प्रविष्टि सहेजें", ml: "എൻട്രി സംരക്ഷിക്കുക", ta: "பதிவை சேமி", te: "నమోదును సేవ్ చేయండి", kn: "ಪ್ರವೇಶವನ್ನು ಉಳಿಸಿ", bn: "এন্ট্রি সংরক্ষণ করুন", mr: "नोंद जतन करा", gu: "પ્રવિષ્ટિ સાચવો", pa: "ਇੰਦਰਾਜ ਸੁਰੱਖਿਅਤ ਕਰੋ" })}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Timeline Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <List />
                  {t({ en: "Activity Log", hi: "गतिविधि लॉग", ml: "പ്രവർത്തന ലോഗ്", ta: "செயல்பாட்டு பதிவு", te: "కార్యాచరణ లాగ్", kn: "ಚಟುವಟಿಕೆ ಲಾಗ್", bn: "কার্যকলাপ লগ", mr: "क्रियाकलाप लॉग", gu: "પ્રવૃત્તિ લોગ", pa: "ਗਤੀਵਿਧੀ ਲੌਗ" })}
              </CardTitle>
              <CardDescription>
                {t({ en: "Your recorded farming activities.", hi: "आपकी दर्ज की गई खेती की गतिविधियाँ।", ml: "നിങ്ങളുടെ രേഖപ്പെടുത്തിയ കാർഷിക പ്രവർത്തനങ്ങൾ.", ta: "உங்கள் பதிவுசெய்யப்பட்ட விவசாய நடவடிக்கைகள்.", te: "మీ రికార్డ్ చేయబడిన వ్యవసాయ కార్యకలాపాలు.", kn: "ನಿಮ್ಮ ದಾಖಲಿತ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳು.", bn: "আপনার রেকর্ড করা কৃষি কার্যক্রম।", mr: "तुमच्या नोंदवलेल्या शेतीच्या क्रियाकलाप.", gu: "તમારી નોંધાયેલ ખેતી પ્રવૃત્તિઓ.", pa: "ਤੁਹਾਡੀਆਂ ਦਰਜ ਕੀਤੀਆਂ ਖੇਤੀ ਗਤੀਵਿਧੀਆਂ।" })}
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
                                            <p className="text-sm mt-1 font-medium">{t({en: "Amount:", hi: "मात्रा:", ml: "അളവ്:", ta: "அளவு:", te: "పరిమాణం:", kn: "ಪ್ರಮಾಣ:", bn: "পরিমাণ:", mr: "प्रमाण:", gu: "જથ્થો:", pa: "ਮਾਤਰਾ:"})} {entry.quantity} {entry.unit}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                            <NotebookText className="w-16 h-16 mb-4"/>
                            <p>{t({ en: "No diary entries yet.", hi: "अभी तक कोई डायरी प्रविष्टि नहीं है।", ml: "ഇതുവരെ ഡയറി എൻട്രികളൊന്നുമില്ല.", ta: "இன்னும் டைரி பதிவுகள் இல்லை.", te: "ఇంకా డైరీ నమోదులు లేవు.", kn: "ಇನ್ನೂ ಡೈರಿ ನಮೂдуಗಳಿಲ್ಲ.", bn: "এখনও কোন ডায়েরি এন্ট্রি নেই।", mr: "अजून डायरी नोंदी नाहीत.", gu: "હજી સુધી કોઈ ડાયરી પ્રવિષ્ટિ નથી.", pa: "ਅਜੇ ਤੱਕ ਕੋਈ ਡਾਇਰੀ ਇੰਦਰਾਜ ਨਹੀਂ ਹੈ।" })}</p>
                            <p className="text-sm">{t({ en: "Add an entry to get started.", hi: "शुरू करने के लिए एक प्रविष्टि जोड़ें।", ml: "ആരംഭിക്കുന്നതിന് ഒരു എൻട്രി ചേർക്കുക.", ta: "தொடங்குவதற்கு ஒரு பதிவைச் சேர்க்கவும்.", te: "ప్రారంభించడానికి ఒక నమోదును జోడించండి.", kn: "ಪ್ರಾರಂಭಿಸಲು ಒಂದು ನಮೂದನ್ನು ಸೇರಿಸಿ.", bn: "শুরু করতে একটি এন্ট্রি যোগ করুন।", mr: "सुरुवात करण्यासाठी एक नोंद जोडा.", gu: "શરૂ કરવા માટે એક પ્રવિષ્ટિ ઉમેરો.", pa: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਇੱਕ ਇੰਦਰਾਜ ਸ਼ਾਮਲ ਕਰੋ।"})}</p>
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
