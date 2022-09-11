import {pokemonAlphabeticalOrder,pokemonShiny,calculationPokemon,multFilterPokemon} from '../src/data.js';

let pokemonsDataMock = [
    {
    "name": "bulbasaur",
    "img": "https://www.serebii.net/pokemongo/pokemon/001.png",
    "pokemon-rarity": "normal",
    "type": [
      "grass",
      "poison"
    ], 
    "egg": "2 km"},
    {
    "name": "squirtle",
    "img": "https://www.serebii.net/pokemongo/pokemon/007.png",
    "pokemon-rarity": "normal",
    "type": [
      "water"
    ], 
    "egg": "2 km"
    },

    {
    "name": "articuno",
    "img": "https://www.serebii.net/pokemongo/pokemon/144.png",
    "pokemon-rarity": "legendary",
    "type": [
      "ice",
      "flying"
    ], 
    "egg": "not in eggs"
    },

    {
    "name": "zubat",
    "img": "https://www.serebii.net/pokemongo/pokemon/041.png",
    "pokemon-rarity": "normal",
    "type": [
      "poison",
      "flying"
    ], 
    "egg": "2 km"
  }];

describe('Testing filters', () => {
  it('Must return all water pokemon', () => {
    const waterPokemons = multFilterPokemon(pokemonsDataMock,'type','water');
    const isTypeWater = waterPokemons.map((item) => { 
      return item.type.includes('water')
    });

    expect(isTypeWater).not.toContain(false);
  });

  it('Must return rarity pokemon', () => {
    const legendaryPokemons = multFilterPokemon(pokemonsDataMock,'pokemon-rarity','legendary');
    const isRarity = legendaryPokemons.map((item) => { 
      return item["pokemon-rarity"].includes('legendary')
    });

    expect(isRarity).not.toContain(false);
  });

  
  it('Must return pokemonByEgg', () => {
    const pokemonsByEgg = multFilterPokemon(pokemonsDataMock,'egg','2 km');
    const comeFromEggs = pokemonsByEgg.map((item) => { 
      return item.egg.includes('2 km')
    });

    expect(comeFromEggs).not.toContain(false);
  });


  it('Must return pokemonByName', () => {
    const namedPokemon = multFilterPokemon(pokemonsDataMock,'name','bulbasaur');
    const isItFounded = namedPokemon.map((item) => { 
      return item.name === 'bulbasaur';
    });

    expect(isItFounded).not.toContain(false);
  });

  it('Must return pokemon z-a', () => {

    let names = [];

    const ordered = pokemonAlphabeticalOrder(pokemonsDataMock,'z-a');
    ordered.map((item) => { 
      names.push(item.name);
    });

    let isStartingWithZ = names[0].startsWith('z') && names[names.length-1].startsWith('a');

    expect(true).toEqual(isStartingWithZ);
  });

  it('Must return pokemon a-z', () => {

    let names = [];

    const ordered = pokemonAlphabeticalOrder(pokemonsDataMock,'a-z');
    ordered.map((item) => { 
      names.push(item.name);
    });

    let isStartingWithA = names[0].startsWith('a') && names[names.length-1].startsWith('z');

    expect(true).toEqual(isStartingWithA);
  });

  it('Must return shiny pokemon', () => {
    const shinys = pokemonShiny(pokemonsDataMock,"https://www.serebii.net/pokemongo/pokemon/shiny/");
    const isShinyImg = shinys.map((item) => { 
      return item.img.includes('/pokemon/shiny/')
    });

    expect(isShinyImg).not.toContain(false);
  });


  it('Must return pokemon percentage', () => {
    const pokemonSelected = multFilterPokemon(pokemonsDataMock,"type","flying")
    const calculated = calculationPokemon(pokemonsDataMock.length,pokemonSelected.length);
    const isCorrectCalculation = calculated == 50.00;

    expect(true).toEqual(isCorrectCalculation);
  });
})
