class Ticket {
    /*private*/ destination: string;
    /*private*/ price: number;
    /*private*/ status: string;

    constructor(destination: string, price: number, status: string) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }

    // get Price(): number {
    //     return this.price;
    // }

    // get Destination(): string {
    //     return this.destination;
    // }

    // get Status(): string {
    //     return this.status;
    // }
}

function sortTickets(tickets: string[], criteria: string): Ticket[] {
    const currentTickets: Ticket[] = tickets.map(str => {
        const parts = str.split('|');

        return new Ticket(
            parts[0],
            Number(parts[1]),
            parts[2]
        )
    });

    currentTickets.sort((a, b) => {
        let valueA: number | string;
        let valueB: number | string;

        if (criteria === 'price') {
            // if we access properties using getters, we need to use them like this:
            // a.Price and b.Price
            valueA = a.price;
            valueB = b.price;
        } else if (criteria === 'destination') {
            valueA = a.destination;
            valueB = b.destination;
        } else if (criteria === 'status') {
            valueA = a.status;
            valueB = b.status;
        } else {
            valueA = a.destination;
            valueB = b.destination;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB);
        } else {
            return (valueA as number) - (valueB as number);
        }
    })

    return currentTickets;
}

const result = sortTickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'destination');

console.log(result);