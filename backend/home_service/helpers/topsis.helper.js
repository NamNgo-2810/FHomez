exports.sort = (location, data, weights) => {
    data.map((home) => {
        home.distance = Math.sqrt(
            Math.pow((home.latitude - location.latitude) * 100, 2) +
                Math.pow((home.longitude - location.longitude) * 100, 2)
        );
    });

    console.table(data, [
        "motel_id",
        "price",
        "area",
        "distance",
        "latitude",
        "longitude",
    ]);
    console.table(weights);
    // estimate the ideal

    const ideal = {
        price: Math.min(...data.map((home) => home.price)),
        // price: price,
        area: Math.max(...data.map((home) => home.area)),
        // min distance luôn = 0 ra giá trị infinite nè bro 
        distance: Math.min(...data.map((home) => home.distance)),
    };

    console.log("\nCác giá trị lý tưởng (chưa chuẩn hóa):", ideal);

    // normalization

    data.map((home) => {
        home.normedPrice = (1 / (ideal.price * home.price)) * weights.price;
        home.normedArea = (home.area / ideal.area) * weights.area;
        console.log(ideal.distance,home.distance,weights.distance);
        home.normedDistance =
            (1 / (ideal.distance * home.distance)) * weights.distance;
    });

    console.log("\nChuẩn hóa các giá trị theo các trọng số:");
    console.table(data, [
        "motel_id",
        "normedPrice",
        "normedArea",
        "normedDistance",
    ]);

    const best = {
        price: Math.max(...data.map((item) => item.normedPrice)),
        area: Math.max(...data.map((item) => item.normedArea)),
        distance: Math.max(...data.map((item) => item.normedDistance)),
    };

    const worst = {
        price: Math.min(...data.map((item) => item.normedPrice)),
        area: Math.min(...data.map((item) => item.normedArea)),
        distance: Math.min(...data.map((item) => item.normedDistance)),
    };

    console.log("A*", best);
    console.log("A-", worst);

    // calculate the distances
    for (let item of data) {
        item.distanceToTheBest = Math.sqrt(
            Math.pow(item.normedPrice - best.price, 2) +
                Math.pow(item.normedArea - best.area, 2) +
                Math.pow(item.normedDistance - best.distance, 2)
        );
        item.distanceToTheWorst = Math.sqrt(
            Math.pow(item.normedPrice - worst.price, 2) +
                Math.pow(item.normedArea - worst.area, 2) +
                Math.pow(item.normedDistance - worst.distance, 2)
        );
        item.similarDegree =
            item.distanceToTheWorst /
            (item.distanceToTheBest + item.distanceToTheWorst);
    }

    console.log("\nKhoảng cách tới giải pháp lý tưởng và độ đo tương tự");
    console.table(data, [
        "motel_id",
        "distanceToTheBest",
        "distanceToTheWorst",
        "similarDegree",
    ]);

    console.log("\nTheo S*");
    console.table(
        data.sort((a, b) => {
            return a.distanceToTheBest - b.distanceToTheBest;
        }),
        ["motel_id", "price", "area", "distance", "distanceToTheBest"]
    );

    console.log("\nTheo S-");
    console.table(
        data.sort((a, b) => {
            return b.distanceToTheWorst - a.distanceToTheWorst;
        }),
        ["motel_id", "price", "area", "distance", "distanceToTheWorst"]
    );

    console.log("\nTheo C*");
    console.table(
        data.sort((a, b) => {
            return b.similarDegree - a.similarDegree;
        }),
        ["motel_id", "price", "area", "distance", "similarDegree"]
    );

    return data.sort((a, b) => {
        return a.distanceToTheBest - b.distanceToTheBest;
    });
};
