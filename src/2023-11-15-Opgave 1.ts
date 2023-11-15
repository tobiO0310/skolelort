process.stdin.on("data", (data) => {
    const number = Number(data.toString());
    if (isFinite(number) && number % 2 === 0) {
        console.log(`Tallet ${number} er et lige tal`);
    } else if (isFinite(number)) {
        console.log(`Tallet ${number} er et ulige tal`);
    } else {
        process.exit(0);
    }
});
