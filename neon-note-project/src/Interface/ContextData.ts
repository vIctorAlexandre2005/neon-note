import { InstallPromptEvent } from "./pwa";

export interface ContextData {
    user: any;
    installPrompt: InstallPromptEvent | null;
};

export const defaultValueContextData = {
    user: null,
    installPrompt: null
}