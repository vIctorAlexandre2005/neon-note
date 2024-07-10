export interface InstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}