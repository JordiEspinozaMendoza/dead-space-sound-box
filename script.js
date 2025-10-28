const plasmaCutterSound = document.getElementById("plasma-cutter-sfx");
const twinkleSound = document.getElementById("twinkle-sfx");
const necromorphSounds = document.querySelectorAll(".necromorph-sfx");

const plasmaCutterButton = document.getElementById("plasma-cutter-sfx-button");
const necromorphButton = document.getElementById("necromorph-sfx-button");
const twinkleButton = document.getElementById("twinkle-sfx-button");

plasmaCutterButton.addEventListener("click", function () {
  playPlasmaCutterSound();
});

twinkleButton.addEventListener("click", function () {
  playTwinkleSound();
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

window.addEventListener("gamepadconnected", (e) => {
  function loop() {
    const gamepad = navigator.getGamepads()[e.gamepad.index];
    if (gamepad) {
      gamepad.buttons.forEach((btn, i) => {
        if (btn.pressed) {
          console.log(i);

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
          }
        }
      });
    }
    requestAnimationFrame(loop);
  }

  loop();
});
