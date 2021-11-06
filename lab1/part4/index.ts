export class GeneticAlgorithm<T> {
  private currentPopulation: T[];
  private fitness: (child: T) => number;
  private crossover: (child1: T, child2: T) => T[];
  private pickoff: (population: T[]) => T[];
  private mutagen: (child: T) => T;
  private iterations: number;
  constructor(
    basePopulation: T[],
    fitness: (child: T) => number,
    crossover: (child1: T, child2: T) => T[],
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
  public runGenerator() {
    // отбор
    // скрещивание
    // мутация
    //проверка условий остановки
    let i = 0;
    let key = this.currentPopulation[0];
    let keyFitness = this.fitness(key);
    while (i < this.iterations) {
      let newKey = this.mutagen(key);
      let newFitness = this.fitness(newKey);
      while (newFitness >= keyFitness) {
        newKey = this.mutagen(key);
        newFitness = this.fitness(newKey);
      }

      key = newKey;
      keyFitness = newFitness;
      console.info(keyFitness);
      // console.info(key);
      i++;
    }
    return key;
  }
}
