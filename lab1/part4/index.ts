import { getRandomArbitrary } from "../../utils/getRandomArbitrary";

export class GeneticAlgorithm<T> {
  private currentPopulation: T[];
  private fitness: (child: T) => number;
  private crossover: (parent1: T, parent2: T) => T[];
  private pickoff: (population: T[]) => T[];
  private mutagen: (child: T) => T;
  private iterations: number;
  constructor(
    basePopulation: T[],
    fitness: (child: T) => number,
    crossover: (parent1: T, parent2: T) => T[],
    pickoff: (population: T[]) => T[],
    mutagen: (child: T) => T,
    iterations: number
  ) {
    this.currentPopulation = basePopulation;
    this.fitness = fitness;
    this.crossover = crossover;
    this.pickoff = pickoff;
    this.mutagen = mutagen;
    this.iterations = iterations;
  }
  private update_population() {
    // cross
    let p1i = getRandomArbitrary(0, this.currentPopulation.length);
    let p2i = getRandomArbitrary(0, this.currentPopulation.length);
    while (p2i == p1i) {
      p2i = getRandomArbitrary(0, this.currentPopulation.length);
    }
    const parent_1 = this.currentPopulation[p1i];
    const parent_2 = this.currentPopulation[p2i];
    const child = this.crossover(parent_1, parent_2);
    this.currentPopulation.push(child[0]);
    // this.currentPopulation.push(child[1]);

    // mutation
    const iToMutate = getRandomArbitrary(0, this.currentPopulation.length);
    const newEl = this.mutagen(this.currentPopulation[iToMutate]);
    this.currentPopulation[iToMutate] = newEl;
  }
  public runGenerator() {
    // скрещивание
    // мутация
    // отбор

    let last_score = Infinity;
    let attempt = 0;
    while (attempt < this.iterations) {
      console.log(last_score);
      this.update_population();

      // filter
      // let smallestI = 0;
      // let smallest_fitness = 0;
      this.currentPopulation.forEach((el, i) => {
        const cur_fitness = this.fitness(el);
        if (cur_fitness < last_score) {
          last_score = cur_fitness;
        }
        // if (cur_fitness > smallest_fitness) {
        //   smallestI = i;
        //   smallest_fitness = cur_fitness;
        // }
      });
      // this.currentPopulation = [
      //   ...this.currentPopulation.slice(0, smallestI),
      //   ...this.currentPopulation.slice(
      //     smallestI + 1,
      //     this.currentPopulation.length
      //   ),
      // ];

      // console.log("l", this.currentPopulation.length);
      attempt++;
    }
    console.log(last_score);
    return this.currentPopulation.sort(
      (a, b) => this.fitness(a) - this.fitness(b)
    )[0];
  }
}
