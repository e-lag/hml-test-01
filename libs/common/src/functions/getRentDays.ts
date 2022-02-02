export function getRentDays(periodBegin: Date, periodEnd: Date) {
    return Math.ceil((periodEnd.getTime() - periodBegin.getTime()) / (1000 * 60 * 60 * 24));
}
