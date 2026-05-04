export class Logger {
    private static readonly Colors = {
        RESET: "\x1b[0m",
        GRAY: "\x1b[90m",
        BLUE: "\x1b[34m",
        GREEN: "\x1b[32m",
        CYAN: "\x1b[36m",
        YELLOW: "\x1b[33m",
        RED: "\x1b[31m"
    } as const;

    private static getTime(): string {
        const date = new Date();
        const hh = date.getHours().toString().padStart(2, "0");
        const mm = date.getMinutes().toString().padStart(2, "0");
        const ss = date.getSeconds().toString().padStart(2, "0");
        const ms = date.getMilliseconds().toString().padStart(3, "0");
        return `${this.Colors.GRAY}[${hh}:${mm}:${ss}.${ms}]${this.Colors.RESET}`;
    }

    static info(...messages: any[]) {
        console.info(`${this.getTime()} ${this.Colors.BLUE}[INFO]${this.Colors.RESET}`, ...messages);
    }

    static infoGreen(...messages: any[]) {
        console.info(`${this.getTime()} ${this.Colors.GREEN}[INFO]`, ...messages, this.Colors.RESET);
    }

    static debug(...messages: any[]) {
        console.debug(`${this.getTime()} ${this.Colors.CYAN}[DEBUG]${this.Colors.RESET}`, ...messages);
    }

    static warn(...messages: any[]) {
        console.warn(`${this.getTime()} ${this.Colors.YELLOW}[WARN]${this.Colors.RESET}`, ...messages);
    }

    static error(...messages: any[]) {
        console.error(`${this.getTime()} ${this.Colors.RED}[ERROR]${this.Colors.RESET}`, ...messages);
    }

    static hook(...messages: any[]) {
        console.debug(`${this.getTime()} ${this.Colors.GRAY}[HOOK]`, ...messages, this.Colors.RESET);
    }
}
