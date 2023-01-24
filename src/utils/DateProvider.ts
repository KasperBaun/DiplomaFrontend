export class DateProvider {

    static getCurrentDateString(): string {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // getMonth returns a 0-based value, so we need to add 1
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        //const seconds = currentDate.getSeconds();
        const mins = minutes > 0 ? minutes : '0' + minutes.toString();

        return `${day}/${month}/${year} ${hours}:${mins}`;/*:${seconds} `;*/
    }
}