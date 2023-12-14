import moment from 'moment-timezone';



export class DateAdapter {

    static getActualDate = (): string => {
        let timeZone: string = 'America/Mexico_City';
        const actualDate = moment().tz(timeZone).format('YYYY-MM-DD');
        console.log(actualDate)
        return actualDate;
    }

}

