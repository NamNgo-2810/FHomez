exports.sort = (location, data, weights) => {
    const ideal = {
        price: Math.max(...data.map((home) => home.price)),
        area: Math.max(...data.map((home) => home.area)),
        location: Math.min(
            ...data.map((home) => {
                return Math.sqrt(
                    Math.pow(home.latitude - location.latitude, 2) +
                        Math.pow(home.longtitude - location.longtitude, 2)
                );
            })
        ),
    };
};
