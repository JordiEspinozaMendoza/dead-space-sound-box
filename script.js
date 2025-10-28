const plasmaCutterSound = document.getElementById("plasma-cutter-sfx");
const twinkleSound = document.getElementById("twinkle-sfx");
const necromorphSounds = document.querySelectorAll(".necromorph-sfx");
const quarantineAlarmSound = document.getElementById("quarantine-alarm-sfx");
const makeUsWholeAgainSound = document.getElementById("make-us-whole-again-sfx");
const plasmaCutterButton = document.getElementById("plasma-cutter-sfx-button");
const necromorphButton = document.getElementById("necromorph-sfx-button");
const twinkleButton = document.getElementById("twinkle-sfx-button");
const quarantineAlarmButton = document.getElementById("quarantine-alarm-button");
const makeUsWholeAgainButton = document.getElementById("make-us-whole-again-button");

plasmaCutterButton.addEventListener("click", function () {
  playPlasmaCutterSound();
});

twinkleButton.addEventListener("click", function () {
  playTwinkleSound();
});

quarantineAlarmButton.addEventListener("click", function () {
  playQuarantineAlarmSound();
});

makeUsWholeAgainButton.addEventListener("click", function () {
  playMakeUsWholeAgainSound();
});

let lastNecromorphIndex = null;

necromorphButton.addEventListener("click", function () {
  const randomIndex = Math.floor(Math.random() * necromorphSounds.length);
  playNecromorphSound(randomIndex);
});

const playPlasmaCutterSound = () => {
  plasmaCutterSound.currentTime = 0;
  plasmaCutterSound.play();
};

const playQuarantineAlarmSound = () => {
  quarantineAlarmSound.currentTime = 0;
  quarantineAlarmSound.play();
}

const playMakeUsWholeAgainSound = () => {
  makeUsWholeAgainSound.currentTime = 0;
  makeUsWholeAgainSound.play();
};

let lastPlayed = 0;

const playNecromorphSound = (index) => {
  const now = performance.now();
  if (now - lastPlayed < 200) return; // 200ms cooldown
  lastPlayed = now;

  if (index === lastNecromorphIndex) {
    index = (index + 1) % necromorphSounds.length;
  }

  const selectedSound = necromorphSounds[index].cloneNode();
  selectedSound.currentTime = 0;
  selectedSound.volume = 0.4;
  selectedSound.play();

  lastNecromorphIndex = index;
};

const playTwinkleSound = () => {
  twinkleSound.currentTime = 0;
  twinkleSound.play();
};

window.addEventListener("gamepadconnected", function (e) {
  const gamepad = e.gamepad;
  console.log(`Gamepad connected at index ${gamepad.index}: ${gamepad.id}.
              ${gamepad.buttons.length} buttons, ${gamepad.axes.length} axes.`);
  document.getElementById(
    "gamepad-status"
  ).textContent = `Gamepad connected: ${gamepad.id}`;
  loop();
});

window.addEventListener("gamepaddisconnected", (e) => {
  console.log("Gamepad disconnected:", e.gamepad.id);
});

function loop() {
  const gamepads = navigator.getGamepads();
  for (const gamepad of gamepads) {
    if (!gamepad) continue;

    gamepad.buttons.forEach((btn, i) => {
      if (btn.pressed) {
        console.log(`Button ${i} pressed`);
        switch (i) {
          case 7: // ZR Button
            playPlasmaCutterSound();
            break;
          case 8: // R Button
            const randomIndex = Math.floor(
              Math.random() * necromorphSounds.length
            );
            playNecromorphSound(randomIndex);
            break;
          case 3: // Y Button
            playTwinkleSound();
            break;
          case 2: // B Button
            playQuarantineAlarmSound();
            break;
          case 0: // A Button
            playMakeUsWholeAgainSound();
            break;
          default:
            break;
        }
      }
    });
  }

  requestAnimationFrame(loop);
}

loop();