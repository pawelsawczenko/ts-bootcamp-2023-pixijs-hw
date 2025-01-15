import { Application, Assets, Container, Sprite, Texture } from "pixi.js";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

export async function createGame() {
  const body = document.querySelector("body");
  const app = new Application<HTMLCanvasElement>({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "red",
  });
  body.appendChild(app.view);

  let isBtnActive = true;

  Assets.add("background", "/assets/background.jpg");
  Assets.add("background-portrait", "/assets/background-portrait.jpg");
  Assets.add("btnActive", "/assets/btn-active.png");
  Assets.add("btnInactive", "/assets/btn-inactive.png");
  Assets.add("sym1", "/assets/SYM1.png");
  Assets.add("sym3", "/assets/SYM3.png");
  Assets.add("sym4", "/assets/SYM4.png");
  Assets.add("sym5", "/assets/SYM5.png");
  Assets.add("sym6", "/assets/SYM6.png");
  Assets.add("sym7", "/assets/SYM7.png");

  const texture = await Assets.load<Texture>([
    "background",
    "background-portrait",
    "btnActive",
    "btnInactive",
    "sym1",
    "sym3",
    "sym4",
    "sym5",
    "sym6",
    "sym7",
  ]);

  const background = Sprite.from(texture.background);
  const btn = Sprite.from(texture.btnActive);
  const sym1 = Sprite.from(texture.sym1);
  const sym3 = Sprite.from(texture.sym3);
  const sym4 = Sprite.from(texture.sym4);
  const sym5 = Sprite.from(texture.sym5);
  const sym6 = Sprite.from(texture.sym6);
  const sym7 = Sprite.from(texture.sym7);

  const container = new Container();
  container.width = GAME_WIDTH / 2;
  container.height = GAME_HEIGHT / 2;

  app.stage.addChild(background);
  app.stage.addChild(btn);
  app.stage.addChild(container);

  container.addChild(sym1);
  container.addChild(sym3);
  container.addChild(sym4);
  container.addChild(sym5);
  container.addChild(sym6);
  container.addChild(sym7);

  container.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);

  btn.anchor.set(0.5, 0.5);
  btn.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
  btn.interactive = true;
  btn.cursor = "pointer";
  btn.on("pointerdown", onClick);

  sym1.anchor.set(0.5, 0.5);
  sym3.anchor.set(0.5, 0.5);
  sym4.anchor.set(0.5, 0.5);
  sym5.anchor.set(0.5, 0.5);
  sym6.anchor.set(0.5, 0.5);
  sym7.anchor.set(0.5, 0.5);

  const yFarPoint = 230;
  const yCenterPoint = 0;

  const xFarPoint = 130;
  const xCenterPoint = 240;

  sym7.position.set(xFarPoint, -yFarPoint);
  sym1.position.set(xCenterPoint, yCenterPoint);
  sym3.position.set(xFarPoint, yFarPoint);

  sym4.position.set(-xFarPoint, yFarPoint);
  sym5.position.set(-xCenterPoint, yCenterPoint);
  sym6.position.set(-xFarPoint, -yFarPoint);

  let rotationRatio = 1;

  app.ticker.add((delta) => {
    const speed = 0.01 * rotationRatio * delta;
    container.rotation += speed;
    sym1.rotation -= speed;
    sym3.rotation -= speed;
    sym4.rotation -= speed;
    sym5.rotation -= speed;
    sym6.rotation -= speed;
    sym7.rotation -= speed;
  });

  function onClick() {
    isBtnActive = !isBtnActive;
    rotationRatio = isBtnActive ? 1 : 4;
    btn.texture = isBtnActive ? texture.btnActive : texture.btnInactive;
  }
}
