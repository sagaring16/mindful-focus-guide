import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";

interface FocusTimerProps {
  sessionLength?: number; // in minutes
  breakLength?: number; // in minutes
}

export function FocusTimer({ sessionLength = 25, breakLength = 5 }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const totalTime = isBreak ? breakLength * 60 : sessionLength * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      setIsActive(false);
      if (!isBreak) {
        // Focus session completed, start break
        setSessionCount(sessionCount + 1);
        setIsBreak(true);
        setTimeLeft(breakLength * 60);
      } else {
        // Break completed, reset for new focus session
        setIsBreak(false);
        setTimeLeft(sessionLength * 60);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, sessionLength, breakLength, sessionCount]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(sessionLength * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-0 shadow-focus bg-card/95 backdrop-blur-sm">
      <CardContent className="p-8 text-center space-y-6">
        {/* Timer Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            {isBreak ? (
              <Coffee className="w-6 h-6 text-secondary" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary animate-pulse-focus" />
            )}
            <h2 className="text-xl font-semibold">
              {isBreak ? "Break Time" : "Focus Time"}
            </h2>
          </div>
          <p className="text-muted-foreground">
            Session {sessionCount + 1} • {sessionCount * sessionLength} min focused today
          </p>
        </div>

        {/* Timer Display */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto relative">
            {/* Circular Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={isBreak ? "text-secondary" : "text-primary"}
                style={{ transition: "stroke-dashoffset 0.3s ease" }}
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={progress} 
            className="h-2"
          />
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <Button
            variant={isActive ? "calm" : "focus"}
            size="lg"
            onClick={toggleTimer}
            className="px-8"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                {timeLeft === totalTime ? "Start" : "Resume"}
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={resetTimer}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Motivational Message */}
        {isActive && !isBreak && (
          <div className="p-4 rounded-lg bg-primary-soft/20 border border-primary/20 animate-fade-in-up">
            <p className="text-sm text-primary font-medium">
              🎯 You're in the zone! Stay focused and crush your goals.
            </p>
          </div>
        )}

        {isBreak && (
          <div className="p-4 rounded-lg bg-secondary-soft/20 border border-secondary/20 animate-fade-in-up">
            <p className="text-sm text-secondary font-medium">
              ☕ Great work! Take a breather and recharge for the next session.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}