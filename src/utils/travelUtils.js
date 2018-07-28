import {dijkstra} from './shortestGraphAlgorithm';

export const getCities = (deals) => {
    const cities = {
        departure: [],
        arrival: []
    };

    deals.forEach(tripDetails => {
        cities.departure.push(tripDetails.departure);
        cities.arrival.push(tripDetails.arrival);
    });

    const uniqueDeparture = Array.from(new Set(cities.departure));
    const uniqueArrival = Array.from(new Set(cities.arrival));

    return {departure: uniqueDeparture, arrival:uniqueArrival};
};

export const getShortestRoute = (deals, departure, arrival, tripType) => {
    const cheapestGraph = getConnectedRoutesAsGraph(deals, departure, arrival, tripType);
    return dijkstra(cheapestGraph);
};

export const getConnectedRoutesAsGraph = (deals, departure, arrival, tripType) => {
    let graph = {
        start: {},
        finish: {}
    };

    deals.forEach(deal => {
        if(arrival === deal.arrival && deal.departure === departure) {

            if(tripType.toUpperCase() === 'CHEAPEST') {
                updateCostOfTrip(graph, 'start', 'finish', deal);
            } else {
                updateTravelTimeOfTrip(graph, 'start', 'finish', deal);
            }

        }
        else if(deal.departure === departure ) {
            if(tripType.toUpperCase() === 'CHEAPEST') {
                updateCostOfTrip(graph, 'start', deal.arrival, deal);
            } else {
                updateTravelTimeOfTrip(graph, 'start', deal.arrival, deal);
            }
        }
    });

    let thereIsMoreKeys =  true;
    let keys = Object.keys(graph.start);

    if (keys.includes('finish')) {
        return graph;
    }

    while(thereIsMoreKeys) {
        getPath(deals, keys, graph, departure, arrival, tripType);

        keys = [];

        Object.keys(graph).forEach(key => {
            if(!(key === 'start' || key === 'finish')) {
                if(graph[key]) {
                    Object.keys(graph[key]).forEach(keyOfKey => {
                        if(keyOfKey === 'finish') {
                            thereIsMoreKeys = false;
                        }
                        if(!graph[keyOfKey] && keyOfKey !== departure) {
                            keys.push(keyOfKey);
                        }
                    })
                }
            }
        });

        if(keys.length > 0){
            keys = Array.from(new Set(keys));
        } else {
            thereIsMoreKeys = false;
        }
    }

    return graph;
};

export const getPath = (deals, keys, graph, originalDeparture, originalDestination, tripType) => {
    keys.forEach(key => {
        if(!graph[key] && originalDestination !== key) {
            graph[key] = {};
        }

        deals.forEach(deal => {
            if(deal.departure === key && originalDeparture !== deal.arrival && originalDestination !== deal.arrival) {
                if(tripType.toUpperCase() === 'CHEAPEST') {
                    updateCostOfTrip(graph, key, deal.arrival, deal);
                } else {
                    updateTravelTimeOfTrip(graph, key, deal.arrival, deal);
                }
            } else if (deal.departure === key && originalDeparture !== deal.arrival && originalDestination === deal.arrival) {
                if(tripType.toUpperCase() === 'CHEAPEST') {
                    updateCostOfTrip(graph, key, 'finish', deal);
                } else {
                    updateTravelTimeOfTrip(graph, key, 'finish', deal);
                }
            }
        });
    });
};

const updateCostOfTrip = (graph, key, arrival, deal) => {
    if(graph[key][arrival]) {
        const cost = graph[key][arrival];

        if(cost > (deal.cost)) {
            graph[key][arrival] = deal.cost;
        }
    } else {
        graph[key][arrival] = deal.cost;
    }
};

const updateTravelTimeOfTrip = (graph, key, arrival, deal) => {
    if(graph[key][arrival]) {
        const time = graph[key][arrival];

        const dealTime = Number(deal.duration.h + deal.duration.m);
        if(time > dealTime) {
            graph[key][arrival] = dealTime;
        }
    } else {
        graph[key][arrival] =  Number(deal.duration.h + deal.duration.m);
    }
};

export const getConnectedRoutes = (deals, shortestRoute, departure, arrival, travelType) => {
    let routes = [];
    shortestRoute.path.forEach((city, index) => {
        if(city === 'start') {
            const relevantArrival = (shortestRoute.path[index + 1] === 'finish' ? arrival : shortestRoute.path[index + 1] );

            const relevantDeals = deals.filter(deal => {
                return deal.departure === departure && deal.arrival === relevantArrival;
            });

            if(travelType.toUpperCase() === 'CHEAPEST') {
                relevantDeals.sort(compareCosts)
            } else {
                relevantDeals.sort(compareTime);
            }

            routes.push(relevantDeals[0])
        }  else {
            if(shortestRoute.path.length > index + 1) {
                const relevantArrival = shortestRoute.path[index + 1] === 'finish' ? arrival : shortestRoute.path[index + 1];

                const relevantDeals = deals.filter(deal => {
                    return deal.departure === city && deal.arrival === relevantArrival;
                });

                if(travelType.toUpperCase() === 'CHEAPEST') {
                    relevantDeals.sort(compareCosts)
                }
                else {
                    relevantDeals.sort(compareTime);
                }

                routes.push(relevantDeals[0])
            }
        }
    });

    return routes;
};

export const findRoutesToArrival = (deals, departure, arrival, tripType) => {
    const shortestRoutes = getShortestRoute(deals, departure, arrival, tripType);
    return getConnectedRoutes(deals, shortestRoutes, departure, arrival, tripType)
};

function compareCosts(a,b) {
    if (a.cost < b.cost)
        return -1;
    if (a.cost > b.cost)
        return 1;
    return 0;
}

const compareTime = (a, b) => {
    const timeA = Number(a.duration.h + a.duration.m);
    const timeB = Number(b.duration.h + b.duration.m);

    if(timeA < timeB)
        return -1;
    if(timeA > timeB)
        return 1;

    // Give preference to that one that costs less
    if(timeA === timeB) {
        if (a.cost < b.cost)
            return -1;
        if (a.cost > b.cost)
            return 1;
    }

    return 0;

};