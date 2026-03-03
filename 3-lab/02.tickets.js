var Ticket = /** @class */ (function () {
    function Ticket(destination, price, status) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
    Object.defineProperty(Ticket.prototype, "Price", {
        get: function () {
            return this.price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ticket.prototype, "Destination", {
        get: function () {
            return this.destination;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ticket.prototype, "Status", {
        get: function () {
            return this.status;
        },
        enumerable: false,
        configurable: true
    });
    return Ticket;
}());
function sortTickets(tickets, criteria) {
    var currentTickets = tickets.map(function (str) {
        var parts = str.split('|');
        return new Ticket(parts[0], Number(parts[1]), parts[2]);
    });
    currentTickets.sort(function (a, b) {
        var valueA;
        var valueB;
        if (criteria === 'price') {
            valueA = a.Price;
            valueB = b.Price;
        }
        else if (criteria === 'destination') {
            valueA = a.Destination;
            valueB = b.Destination;
        }
        else if (criteria === 'status') {
            valueA = a.Status;
            valueB = b.Status;
        }
        else {
            valueA = a.Destination;
            valueB = b.Destination;
        }
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB);
        }
        else {
            return valueA - valueB;
        }
    });
    return currentTickets;
}
var result = sortTickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'destination');
console.log(result);
