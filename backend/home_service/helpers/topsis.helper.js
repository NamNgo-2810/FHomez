exports.sort = (location, data, weights) => {
    // estimate the ideal
    const ideal = {
        price: Math.min(...data.map((home) => home.price)),
        area: Math.max(...data.map((home) => home.area)),
        distance: Math.min(
            ...data.map((home) => {
                return Math.sqrt(
                    Math.pow(home.latitude - location.latitude, 2) +
                        Math.pow(home.longtitude - location.longtitude, 2)
                );
            })
        ),
    };

    // normalization

    for (let item of data) {
        const distance = Math.sqrt(
            Math.pow(item.latitude - location.latitude, 2) +
                Math.pow(item.longtitude - location.longtitude, 2)
        );
        item.normedPrice = (1 / (ideal.price * item.price)) * weights.price;
        item.normedArea = (item.area / ideal.area) * weights.area;
        item.normedLocation =
            (1 / (ideal.distance * distance)) * weights.location;
    }

    const best = {
        normedPrice: Math.max(...data.map((item) => item.normedPrice)),
        normedArea: Math.max(...data.map((item) => item.normedArea)),
        normedLocation: Math.max(...data.map((item) => item.normedLocation)),
    };

    // calculate the distances
    for (let item of data) {
        item.distanceToTheBest = Math.sqrt(
            Math.pow(item.normedPrice - best.normedPrice, 2) +
                Math.pow(item.normedArea - best.normedArea, 2) +
                Math.pow(item.normedLocation - best.normedLocation, 2)
        );
    }

    return data.sort((a, b) => {
        return a.distanceToTheBest - b.distanceToTheBest;
    });
};
