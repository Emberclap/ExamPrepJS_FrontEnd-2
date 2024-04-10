function solve(input) {

    const astronautsNumber = input.shift();
    const astronauts = [];

    for (let i = 0; i < astronautsNumber; i++) {
        const [name, oxygenLvl, energy] = input.shift().split(' ');
        astronauts.push({ name, oxygenLvl: Number(oxygenLvl), energy: Number(energy) });
    }

    while (input != 'End') {
        const line = input.shift();
        const [command, astronautName, value] = line.split(' - ');
        const amount = Number(value);

        let astronaut = astronauts.find(x => x.name === astronautName);
        if (command === 'End' || !astronaut) {
            break;
        }

        if (command === 'Explore') {
            if (astronaut.energy >= amount) {
                const energyLeft = astronaut.energy -= amount;
                console.log(`${astronaut.name} has successfully explored a new area and now has ${energyLeft} energy!`);
            }
            else {
                console.log(`${astronaut.name} does not have enough energy to explore!`);
            }
        }
        else if (command === 'Refuel') {
            let currentEnergy = astronaut.energy;
            if (currentEnergy + amount > 200) {
                console.log(`${astronaut.name} refueled their energy by ${200 - currentEnergy}!`);
                astronaut.energy = 200;
            }
            else {
                console.log(`${astronaut.name} refueled their energy by ${amount}!`);
                astronaut.energy = currentEnergy + amount;
            }
        }
        else if (command === 'Breathe') {
            let currentOxygen = astronaut.oxygenLvl
            if (currentOxygen + amount > 100) {
                astronaut.oxygenLvl = 100;
                console.log(`${astronaut.name} took a breath and recovered ${100 - currentOxygen} oxygen!`)
            } else {
                console.log(`${astronaut.name} took a breath and recovered ${amount} oxygen!`)
                astronaut.oxygenLvl = currentOxygen += amount;
            }

        }
    }
    Object.values(astronauts).forEach(astronaut => {
        console.log(`Astronaut: ${astronaut.name}, Oxygen: ${astronaut.oxygenLvl}, Energy: ${astronaut.energy}`);

    })
}
solve(['3',
    'John 50 120',
    'Kate 80 180',
    'Rob 70 150',
    'Explore - John - 50',
    'Refuel - Kate - 30',
    'Breathe - Rob - 20',
    'End'])
solve(['4',
    'Alice 60 100',
    'Bob 40 80',
    'Charlie 70 150',
    'Dave 80 180',
    'Explore - Bob - 60',
    'Refuel - Alice - 30',
    'Breathe - Charlie - 50',
    'Refuel - Dave - 40',
    'Explore - Bob - 40',
    'Breathe - Charlie - 30',
    'Explore - Alice - 40',
    'End'])