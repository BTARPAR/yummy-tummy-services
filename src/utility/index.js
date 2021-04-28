const generateRandomNumber = (limit) => {
    return Math.floor(Math.random() * limit) + 1
}

const capFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generateFoodName = () => {
    const list1 = ['Thai Food', 'Ramen', 'Doughnuts', 'Korean Food', 'Sushi', 'Food Trucks', 'Tacos', 'Mini Kabob', 'Cha gio', 'Ricotta'];
    return capFirst(list1[getRandomInt(0, list1.length)]);
}

const foodType = () => {
    const list1 = ['Fast Food', 'Organic', 'Healthy', 'Diet', 'Homemade'];
    return capFirst(list1[getRandomInt(0, list1.length)]);
}

const spiceLevel = () => {
    const list1 = ['Mild', 'Medium', 'Spicy', 'Extra Spicy'];
    return capFirst(list1[getRandomInt(0, list1.length)]);
}

export const generateOrder = (serveFor) => {
    const items = Array(generateRandomNumber(20)).fill(0).map(() => generateFoodName())
    let total = 0
    const selected_items = items.reduce((acc, curr) => {
        const newPrice = Number(generateRandomNumber(40))
        total += newPrice
        const data = {
            item_name: curr,
            price: newPrice.toFixed(2),
            quantity: generateRandomNumber(serveFor),
            foodType: foodType(),
            spiceLevel: spiceLevel()
        }
        acc.push(data)
        return acc
    }, [])
    return {total, selected_items}
}

export const generateDate = () => {
    const m = new Date();
    return ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
        ("0" + m.getUTCDate()).slice(-2) + "/" + m.getUTCFullYear()
}