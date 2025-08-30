import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-image.jpg";

interface WelcomeScreenProps {
  onStartJourney: () => void;
}

export function WelcomeScreen({ onStartJourney }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-calm">
      <div className="w-full max-w-md animate-fade-in-up">
        <Card className="border-0 shadow-focus bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            {/* Hero Image */}
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="FocusFi - Peaceful workspace" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Logo and Title */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                Welcome to FocusFi!
              </h1>
              <p className="text-muted-foreground text-lg">
                Your personal AI coach for productivity
              </p>
            </div>
            
            {/* Features Preview */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Smart Pomodoro Timer</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span>AI-Powered Motivation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span>Focus Analytics</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onStartJourney}
              className="w-full"
            >
              Start Focus Journey
            </Button>
            
            {/* Subtle Footer */}
            <p className="text-xs text-muted-foreground/70">
              Join thousands who've improved their focus
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}