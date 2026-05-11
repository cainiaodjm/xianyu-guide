import fs from "fs";

const BASE_URL = "https://wiki.biligame.com/xyzwgame/api.php";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://wiki.biligame.com/",
};

// 第一步：获取所有咸将页面列表
async function fetchAllHeroes() {
  const heroes = [];
  let continueParam = "";

  while (true) {
    const url = `${BASE_URL}?action=query&list=allpages&apprefix=${encodeURIComponent("咸将/")}&aplimit=50&format=json${continueParam}`;
    const res = await fetch(url, { headers });
    const text = await res.text();
    const data = JSON.parse(text);

    const pages = data.query.allpages.filter(
      (p) => !p.title.includes("spine.json") && p.title.split("/").length === 2,
    );
    heroes.push(...pages);

    if (data.continue) {
      continueParam = `&apcontinue=${encodeURIComponent(data.continue.apcontinue)}`;
    } else {
      break;
    }
  }

  return heroes;
}

// 第二步：获取单个咸将的 wikitext 和图片列表
async function fetchHeroData(title) {
  const url = `${BASE_URL}?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|images&format=json`;
  const res = await fetch(url, { headers });
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    const wikitext = data.parse?.wikitext?.["*"] || "";
    const images = data.parse?.images || [];
    return { wikitext, images };
  } catch {
    console.log(`解析失败: ${title}`);
    return { wikitext: "", images: [] };
  }
}

// 第三步：获取图片真实 URL
async function fetchImageUrl(filename) {
  const url = `${BASE_URL}?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers });
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    const pages = data.query?.pages || {};
    const page = Object.values(pages)[0];
    return page?.imageinfo?.[0]?.url || "";
  } catch {
    return "";
  }
}

// 第四步：从 wikitext 提取关键数据
function parseHero(title, wikitext) {
  const name = title.replace("咸将/", "");

  const get = (key) => {
    const match = wikitext.match(
      new RegExp(`\\|\\s*${key}\\s*=\\s*([^|\\n}]+)`),
    );
    return match ? match[1].trim() : "";
  };

  return {
    id: name,
    name,
    faction: get("咸将阵营"),
    type: get("咸将职业"),
    rarity: get("咸将品质"),
    quote: get("武将台词"),
    atk: get("攻击"),
    hp: get("血量"),
    def: get("防御"),
    speed: get("速度"),
    activeSkill: get("主动技能"),
    activeSkillEffect: get("主动技能效果"),
    passiveSkill1: get("被动技能1"),
    passiveSkill1Effect: get("被动技能1效果"),
    passiveSkill2: get("被动技能2"),
    passiveSkill2Effect: get("被动技能2效果"),
    img: "",
  };
}

// 主函数
async function main() {
  console.log("开始获取咸将列表...");
  const heroPages = await fetchAllHeroes();
  console.log(`找到 ${heroPages.length} 个咸将`);

  const heroes = [];

  for (const page of heroPages) {
    console.log(`正在获取: ${page.title}`);

    const { wikitext, images } = await fetchHeroData(page.title);
    await new Promise((r) => setTimeout(r, 300));

    const hero = parseHero(page.title, wikitext);

    // 获取第一张图片的真实 URL
    if (images.length > 0) {
      hero.img = await fetchImageUrl(images[0]);
      await new Promise((r) => setTimeout(r, 200));
    }

    heroes.push(hero);
    console.log(
      `✓ ${hero.name} | ${hero.faction} | ${hero.rarity} | 图片: ${hero.img ? "✓" : "✗"}`,
    );
  }

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(
    "data/heroes.json",
    JSON.stringify(heroes, null, 2),
    "utf-8",
  );
  console.log(`\n完成！共 ${heroes.length} 个咸将，已保存到 data/heroes.json`);
}

main().catch(console.error);
