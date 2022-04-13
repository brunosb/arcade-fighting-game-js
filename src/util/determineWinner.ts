import { Fighter } from "../Fighter";

type DetermineWinnerProps = {
  player: Fighter;
  enemy: Fighter;
  timerId: number;
};

type DecreaseTimerProps = {
  player: Fighter;
  enemy: Fighter;
};

function determineWinner({ player, enemy, timerId }: DetermineWinnerProps) {
  clearTimeout(timerId);
  (document.querySelector("#display-text")! as HTMLDivElement).style.display =
    "flex";

  if (player.health === enemy.health) {
    document.querySelector("#display-text")!.innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#display-text")!.innerHTML = "Player 1 Wins";
  } else if (player.health < enemy.health) {
    document.querySelector("#display-text")!.innerHTML = "Player 2 Wins";
  }
}

let timer = 60;
let timerId: number;
function decreaseTimer({ player, enemy }: DecreaseTimerProps) {
  timerId = setTimeout(() => decreaseTimer({ player, enemy }), 1000);
  if (timer > 0) {
    timer--;
    document.querySelector("#timer")!.innerHTML = timer.toString();
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

export { decreaseTimer, determineWinner, timerId };
