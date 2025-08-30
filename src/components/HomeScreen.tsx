import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FocusTimer } from "./FocusTimer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Target, TrendingUp, Award, Zap } from "lucide-react";
import { OnboardingData } from "./OnboardingScreen";

interface HomeScreenProps {
  userData: OnboardingData;
  onSettingsClick: () => void;
}

export function HomeScreen({ userData, onSettingsClick }: HomeScreenProps) {
  const [focusedToday] = useState(125); // minutes
  const dailyGoalMinutes = userData.dailyHours * 60;
  const progress = (focusedToday / dailyGoalMinutes) * 100;

  const getFocusEmoji = (focus: string) => {
    switch (focus) {
      case "studying": return "📚";
      case "work": return "💼";
      case "fitness": return "💪";
      default: return "🎯";
    }
  };

  const motivationalQuotes = [
    "Focus is the gateway to thinking clearly.",
    "Concentrate all your thoughts upon the work at hand.",
    "Success is the result of preparation, hard work, and learning from failure.",
    "The successful warrior is the average person with laser-like focus.",
  ];

  const todayQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="min-h-screen gradient-calm p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">FocusFi</h1>
            <div className="w-8 h-8 rounded-full gradient-bg animate-pulse-focus"></div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onSettingsClick}>
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarFallback className="gradient-hero text-primary-foreground font-semibold">
                {userData.focus.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Timer Section */}
          <div className="lg:col-span-2 space-y-6">
            <FocusTimer />
            
            {/* Motivational Card */}
            {userData.motivation && (
              <Card className="border-0 shadow-focus bg-card/95 backdrop-blur-sm animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-accent mb-2">Daily Motivation</h3>
                      <p className="text-muted-foreground italic">"{todayQuote}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Daily Goal Card */}
            <Card className="border-0 shadow-focus bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5 text-primary" />
                  Today's Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {getFocusEmoji(userData.focus)} {userData.focus.charAt(0).toUpperCase() + userData.focus.slice(1)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {userData.dailyHours} hours target
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-muted-foreground text-center">
                    {Math.floor(focusedToday / 60)}h {focusedToday % 60}m / {userData.dailyHours}h
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-focus bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-primary-soft/20">
                    <div className="text-xl font-bold text-primary">7</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary-soft/20">
                    <div className="text-xl font-bold text-secondary">18</div>
                    <div className="text-xs text-muted-foreground">Sessions</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-accent-soft/20 text-center">
                  <div className="text-lg font-bold text-accent">42h 30m</div>
                  <div className="text-xs text-muted-foreground">This Week</div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Card */}
            <Card className="border-0 shadow-glow bg-card/95 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-accent mb-1">Achievement Unlocked!</h3>
                <p className="text-sm text-muted-foreground">
                  Completed 7 days in a row 🔥
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}