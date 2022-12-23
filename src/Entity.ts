// 0 : 우성, 1 : 열성
// 0*0, 1*0, 0*1 : 우성발현(0), 1*1: 열성 발현(1)
// 1 : X, 0 : Y
// 1*1 : XX(여), 1*0, 0*1 : XY(남), YY (고려X)
export type Gene = 0 | 1;
export type Chromosome = Gene; // 염색 분체
export type HomoChrosomes = [Gene, Gene]; // 상동염색체

export const lables = [
  ["A", "a"],
  ["B", "b"],
  ["D", "d"],
  ["E", "e"],
  ["F", "f"],
  ["Y", "X"],
];

/// 랜덤한 0, 1을 반환
const getRandomGene = (): Gene => {
  return Math.floor(Math.random() * 2) as Gene;
};

export class Entity {
  public genome: HomoChrosomes[]; // 유전체

  // 상염색체 5개 + 성염색체 (2n = 12) 염색체 생성
  // male: 수컷인가? (True or False)
  constructor(male: boolean) {
    this.genome = [];

    // 5번 반복
    for (let i = 0; i < 5; i++) {
      // 랜덤하게 상동염색체 삽입
      this.genome.push([getRandomGene(), getRandomGene()]);
    }

    // 성염색체 X 하나는 필수
    // male 이면 XY, 아니면 XX
    this.genome.push([1, male ? (0 as Gene) : (1 as Gene)]);
  }

  // 보기 편하게 정리해주는 함수
  public show() {
    let result = "";

    this.genome.forEach((g, i) => {
      if (i != 5) result += `${lables[i][g[0]]}${lables[i][g[1]]} `;
      else
        result += ` ${lables[i][g[0]]}${lables[i][g[1]]} (${
          g.includes(0) ? " 남" : " 여"
        }) `;
    });

    console.log(result);
  }

  // 생식세포 생성
  public getReprodCell() {
    return this.genome.map((g) => g[getRandomGene()]);
  }
}

// 두 생색세포가 만나 번식
export const reproduce = (ch1: Gene[], ch2: Gene[]): Entity => {
  const entity = new Entity(false); // 더미 개체 생성
  entity.genome = ch1.map((c, i) => [c, ch2[i]]); // 두 염색분체의 정보 합치기

  return entity;
};

export const randomReproduce = (ch1: Gene[], male: boolean) => {
  // 임의의 생식세포 형성
  const ch2: Gene[] = [];
  for (let i = 0; i < 5; i++) ch2.push(getRandomGene());

  if (male) ch2.push(1);
  else ch2.push(Math.random() > 0.5 ? (1 as Gene) : (0 as Gene));

  const entity = new Entity(false); // 더미 개체 생성
  entity.genome = ch1.map((c, i) => [c, ch2[i]]); // 두 염색분체의 정보 합치기

  return entity;
};
