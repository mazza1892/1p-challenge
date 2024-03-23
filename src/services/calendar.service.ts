import { TableInterface } from '../interfaces/table.interface';

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
export default class CalendarService {
    static daysArray: number[] = [];

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
     * @param value The amount to save each day
     */
    public static initDaysOfTheYearObject(year: number, value: number): void {
        let totalNumberOfDays = 365;
        let totalAmount = 0;
        this.daysArray = [];
        let amount = value;

        // Check if the year is a leap year
        if (CalendarService.isLeapYear(year)) {
            totalNumberOfDays = 366;
        }

        // Guard in case user leaves the input empty
        if (value < 1 || !value) {
            amount = 1;
        }

        // Populate the days array
        for (let i = 1; i <= totalNumberOfDays; i += 1) {
            totalAmount += amount;
            this.daysArray.push(totalAmount);
        }
    }

    /**
     * Returns the total projected savings
     * @returns {number}
     */
    public static getTotalProjectedSavings(): number {
        if (this.daysArray.length > 0) {
            return this.daysArray.reduce((a, b) => a + b, 0) / 100;
        }
        return 0;
    }

    /**
     * Converts the amount to the selected currency
     * @param amount
     * @param divisor
     * @returns {number}
     */
    public static convertToCurrency(amount: number, divisor: number): number {
        const currency = amount / divisor;
        return Math.round(currency * 1e2) / 1e2;
    }

    /**
     * Calculates the date
     * @param startDate
     * @param currentDay
     * @returns {Date}
     */
    public static calculateDate(startDate: Date, currentDay: number): Date {
        const targetDate = new Date(startDate);

        if (currentDay !== 1) {
            targetDate.setDate(startDate.getDate() + (currentDay - 1));
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
        const data: TableInterface[] = [];
        let runningTotal = 0;

        this.daysArray.forEach((value) => {
            const day = this.daysArray.indexOf(value) + 1;
            const date = this.calculateDate(startDate, day);
            const amount = Math.round((value / 100) * 1e2) / 1e2;
            runningTotal += amount;

            data.push({
                day,
                date,
                amount: amount.toFixed(2),
                runningTotal: runningTotal.toFixed(2),
            });
        });

        this.tableData = data;
        return data;
    }

    /**
     * Sorts the table data and returns the last occurrence of each month
     * @param data
     * @returns {TableInterface[]} returns the sorted array
     */
    public static sortTableData(data: TableInterface[]): TableInterface[] {
        const monthsSequence: [number, number][] = [];
        let months: TableInterface[] = [];
        const result: TableInterface[] = [];

        const firstDate = {
            day: data[0].date.getDate(),
            month: data[0].date.getMonth(),
            year: data[0].date.getFullYear(),
        };

        const counter = firstDate.day === 1 ? 12 : 13;

        /**
         *  Create a sequence of months based on the start date,
         *  particularly important if spanning multiple years
         */
        for (let i = 0; i < counter; i += 1) {
            if (firstDate.month === 12) {
                firstDate.month = 0;
                firstDate.year += 1;
            }

            monthsSequence.push([firstDate.month, firstDate.year]);
            firstDate.month += 1;
        }

        monthsSequence.forEach((date) => {
            data.forEach((item) => {
                const current = {
                    month: item.date.getMonth(),
                    year: item.date.getFullYear(),
                };

                if (current.month === date[0] && current.year === date[1]) {
                    months.push(item);
                }
            });

            result.push(months[months.length - 1]); // Push the last occurrence of the month
            months = []; // Reset the array to contain only a single month
        });

        return result;
    }
}
