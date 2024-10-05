import { InstallPromptEvent } from "./pwa";

export interface ContextData {
    user: any;
    installPrompt: InstallPromptEvent | null;
    isMobile: boolean;
};

export const defaultValueContextData = {
    user: null,
    installPrompt: null,
    isMobile: false
}