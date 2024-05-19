
export interface DeshboardItem {
    selectionCount: any
    packageName: any
    map(arg0: (item: any) => void): unknown
    totalPriceForDay: number
    totalPriceForWeek: number
    totalPriceForMonth: number
    totalPriceForYear: number
    totalPriceForMonthSegments: number
    packageSelectionInMonth: number

    percentageChange: any
    totalPriceThisWeek: number
    totalPriceThisMonth: number
    totalPriceThisYear: number

    totalPriceForYesterday: number
    totalPriceLastMonth: number
    totalPriceLastYear: number
}