const SECONDS_COVERTER = 1000;
const MINUTES_COVERTER = 60 * SECONDS_COVERTER;
const HOURS_COVERTER = 60 * MINUTES_COVERTER;
const DAYS_COVERTER = 24 * HOURS_COVERTER;

export function milliDhms(t: number) {
    const d = Math.floor(t / DAYS_COVERTER);
    t = t - d * DAYS_COVERTER; // Only hours left
    const h = Math.floor(t / HOURS_COVERTER);
    t = t - h * HOURS_COVERTER; // only minutes left
    const m = Math.floor(t / MINUTES_COVERTER);
    t = t - m * MINUTES_COVERTER; // only seconds left
    const s = Math.floor(t / SECONDS_COVERTER);
    return {
        d,
        h,
        m,
        s
    }
}

export function dhmsToMilli(duration: ReturnType<typeof milliDhms>) {
    const { d, h, m, s } = duration;
    let t = 0;
    t = t + d * DAYS_COVERTER;
    t = t + h * HOURS_COVERTER;
    t = t + m * MINUTES_COVERTER;
    t = t + s * SECONDS_COVERTER;
    return t;
}