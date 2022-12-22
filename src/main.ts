import { Entity, lables, reproduce } from "./Entity";

const dad = new Entity(true); // 남
const mom = new Entity(false); // 여

console.log("시작 개체");
dad.show();
mom.show();

let entities = [mom, dad];

const getRandomReprod = () => {
  const male = entities
    .filter((e) => e.genome[5].includes(0)) // 랜덤한 남자의 생식세포
    .sort(() => 0.5 - Math.random())[0]
    .getReprodCell();
  const female = entities
    .filter((e) => !e.genome[5].includes(0)) // 랜덤한 남자의 생식세포
    .sort(() => 0.5 - Math.random())[0]
    .getReprodCell();

  return reproduce(male, female);
};

for (let i = 0; i < 10; i++) {
  // 10 번 반복
  // n번째 반복 => 2 ^ (n-1) 번 번식
  const babies: Entity[] = []; // 새로 태어날 아기들
  for (let j = 0; j < Math.pow(2, i); j++) {
    babies.push(getRandomReprod());
  }

  entities = [...entities, ...babies]; // 개체군에 합류
}

console.log();
console.log();
console.log("최종 개체수 : " + entities.length);
console.log(
  "성비(남/여) = " +
    Math.round(
      (entities.filter((e) => e.genome[5].includes(0)).length /
        entities.filter((e) => !e.genome[5].includes(0)).length) *
        100
    ) /
      100
);

for (let i = 0; i < 5; i++) {
  const sup =
    Math.round(
      (entities.map((v) => v.genome[i].includes(0)).filter((v) => v).length /
        entities.length) *
        100
    ) / 10;
  const inf = Math.round((1 - sup / 10) * 100) / 10;

  console.log(
    lables[i][0] + lables[i][1] + "\t우성: 열성 = " + sup + " : " + inf
  );
}
