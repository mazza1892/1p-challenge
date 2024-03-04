import {TableInterface} from "../interfaces/table.interface.ts";

/**
 * CalendarService
 * @class CalendarService
 * @description Service for year related operations
 * @export CalendarService
 * @example import {CalendarService} from "./services/calendar.service.ts";
 * @example CalendarService.isLeapYear(2020);
 * @example CalendarService.isLeapYear(2021);
 *
 */
export class CalendarService {
    static daysArray: any[] = [];
    static tableData: TableInterface[] = [];

    /*
     * Returns true if the year is a leap year, false otherwise.
     * @param {number} year
     * @returns {boolean}
     */
     public static isLeapYear(year: number): boolean {
            if (year % 4 === 0) {
                if (year % 100 === 0) {
                    return year % 400 === 0;
                }
                return true;
            }
            return false;
        }


    /**
     * Initializes the days of the year object
     * @param year
     */
    public static initDaysOfTheYearObject(year: number): void {
        let totalNumberOfDays = 365;
        this.daysArray = [];

        if(CalendarService.isLeapYear(year)) {
            totalNumberOfDays = 366;
        }

        for(let i = 1; i <= totalNumberOfDays; i++) {
            this.daysArray.push(i);
        }

    }


    /**
     * Returns the total projected savings
     * @returns {number}
     */
    public static getTotalProjectedSavings(): number {
        if(this.daysArray.length > 0) {
            return this.daysArray.reduce((a, b) => a + b, 0) / 100;
        }
        return 0
    }

    /**
     * Returns the number of days in a month
     * @param date
     * @returns {number}
     */
    public static getNumberOfDaysInMonth(date: Date): number {
        let month = date.getMonth();
        let year = date.getFullYear();
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Converts the amount to the selected currency
     * @param amount
     * @param divisor
     * @returns {number}
     */
    convertToCurrency(amount: number, divisor: number): number{
        const currency = amount / divisor;
        return parseInt(currency.toFixed(2))
    }


    /**
     * Calculates the date
     * @param startDate
     * @param currentDay
     * @returns {Date}
     */
    public static calculateDate(startDate: Date, currentDay: number ): Date {
        let targetDate = new Date(startDate);

        if(currentDay !== 1) {
            targetDate.setDate(startDate.getDate() + (currentDay-1));
        }

        return targetDate;
    }

    /**
     * Empties data array
     */
    public static clearPopulatedData(): void {
        this.tableData = [];
    }

    /**
     * Populates the data array
     * @param {Date} startDate
     * @returns {TableInterface[]}
     */
    public static populateData(startDate: Date): TableInterface[] {
        let data: TableInterface[] = [];
        let runningTotal = 0;

        this.daysArray.forEach((day) => {
            let date = this.calculateDate(startDate, day);
            let amount = day / 100;
            runningTotal = runningTotal + amount;

            data.push({
                day: day,
                date: date,
                // @ts-ignore
                amount: amount.toFixed(2),
                // @ts-ignore
                runningTotal: runningTotal.toFixed(2),
            });
        })


        this.tableData = data;
        return data;
    }



}


