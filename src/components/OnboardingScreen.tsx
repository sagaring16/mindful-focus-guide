import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, Target, Zap, BookOpen, Briefcase, Dumbbell } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  focus: string;
  motivation: boolean;
  dailyHours: number;
}

const focusOptions = [
  { id: "studying", label: "Studying", icon: BookOpen },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "fitness", label: "Fitness", icon: Dumbbell },
  { id: "general", label: "General Productivity", icon: Target },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    focus: "",
    motivation: true,
    dailyHours: 4,
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const canProceed = () => {
    if (step === 1) return data.focus !== "";
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-calm">
      <div className="w-full max-w-lg animate-fade-in-up">
        <Card className="border-0 shadow-focus bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold">
              Tell us about you!
            </CardTitle>
            <div className="flex gap-2 justify-center mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-center">
                  What's your main focus?
                </h3>
                <RadioGroup
                  value={data.focus}
                  onValueChange={(value) => setData({ ...data, focus: value })}
                  className="space-y-3"
                >
                  {focusOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <option.icon className="w-5 h-5 text-primary" />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-center">
                  Do you need motivation?
                </h3>
                <RadioGroup
                  value={data.motivation ? "yes" : "no"}
                  onValueChange={(value) => setData({ ...data, motivation: value === "yes" })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="yes" id="yes" />
                    <Zap className="w-5 h-5 text-accent" />
                    <Label htmlFor="yes" className="flex-1 cursor-pointer">
                      Yes, keep me motivated!
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="no" id="no" />
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <Label htmlFor="no" className="flex-1 cursor-pointer">
                      No, just track my focus
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-center">
                  Daily focus goal?
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-primary">
                      {data.dailyHours}
                    </span>
                    <span className="text-lg text-muted-foreground ml-2">
                      hours
                    </span>
                  </div>
                  <Slider
                    value={[data.dailyHours]}
                    onValueChange={(value) => setData({ ...data, dailyHours: value[0] })}
                    max={12}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 hour</span>
                    <span>12 hours</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full"
            >
              {step === 3 ? "Start Focusing" : "Continue"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}