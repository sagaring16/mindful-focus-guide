import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { OnboardingScreen, OnboardingData } from "@/components/OnboardingScreen";
import { HomeScreen } from "@/components/HomeScreen";

const queryClient = new QueryClient();

type AppState = "welcome" | "onboarding" | "home";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>("welcome");
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  const handleStartJourney = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    setCurrentScreen("home");
  };

  const handleSettingsClick = () => {
    // Future: settings screen
    console.log("Settings clicked");
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onStartJourney={handleStartJourney} />;
      case "onboarding":
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case "home":
        return userData ? (
          <HomeScreen userData={userData} onSettingsClick={handleSettingsClick} />
        ) : null;
      default:
        return <WelcomeScreen onStartJourney={handleStartJourney} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="font-sans antialiased">
          {renderCurrentScreen()}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
