/**
 * Builds public/data/allah99Duas.json from allah99.json:
 * Arabic + English lines are unique per name via category pools + numeric mixing.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const allahPath = path.join(root, "public/data/allah99.json");
const outPath = path.join(root, "public/data/allah99Duas.json");

const pools = {
  mercy: {
    test: /mercy|beneficent|forgiv|tawwab|gentle|kindness|compassion|pardon|clement/i,
    ar: [
      "ارحمني برحمتك ولا تكلني إلى نفسي طرفة عين.",
      "امنن عليّ برحمتك واغفر لي ما قدّمت وما أخّرت.",
      "ألِف بيني وبين طاعتك برحمتك يا أرحم الراحمين.",
      "ارحم ضعفي وتجاوز عن سيئاتي بجميل عفوك.",
      "اجعل رحمتك لي أوسع من ذنوبي وارزقني الإنابة.",
      "أذقني حلاوة رحمتك في الدنيا قبل الآخرة.",
      "لا تُؤاخذني بجرائري وكن لي برحمتك خير راحم.",
      "امسح عني ما أفسدته يداي برحمتك التي كتبت على نفسك.",
      "احفظني برحمتك من هواجس الذنب وضيق الصدر.",
      "قرّ عيني بلطفك ورحمتك حين أضيق.",
      "اجعل لي من رحمتك نصيبًا في كلّ خير تقرّبني إليك.",
      "أنت رحيم فاسترني رحمة لا يعقبها عذاب.",
    ],
    en: [
      "I beg You to let Your mercy cover my faults and lift me when I am low.",
      "Let Your mercy be wider than my mistakes, and soften my heart toward You.",
      "Do not leave me to myself; rescue me by mercy I could never deserve.",
      "Pour patience and repentance into me through the mercy this name promises.",
      "Let me taste the ease that comes when a servant trusts Your mercy alone.",
      "Clothe my family and my faith in the shade of Your mercy.",
      "When I fear my record, remind me that Your mercy outruns my forgetfulness.",
      "Let the meaning of this name settle in my chest until I am gentler with others.",
      "Grant me relief that only Your mercy can fashion, not my own plans.",
      "Make my end better than my beginning, by mercy that effaces what I regret.",
      "Let my nights and days be salted with gratitude for mercy I cannot measure.",
      "Unburden me from despair; let mercy be the door I keep returning to.",
    ],
  },
  knowledge: {
    test: /know|aware|wise|wisdom|hear|see|sight|learn|teach|well-acquainted/i,
    ar: [
      "ألهمني معرفة تنفعني وتبعدني عن الجهل المذموم.",
      "اكشف لي عن طريقك وأنت أعلم بما في السماوات والأرض.",
      "ارزقني بصيرة في ديني ولا تهتك بصيرتي بالمعاصي.",
      "أنت عليم فاكشف لي سرّ التوبة النصوح قبل فوات الأوان.",
      "ائتني علماً نافعاً وعملاً متّصلاً به يا أرحم الراحمين.",
      "وفّقني لما تحب وتحبني فيه وأنت خبير بضميري.",
      "انور قلبي بحكمتك حتى أميل إلى الحق بلا كبر.",
      "احفظني من العلم الذي لا يرفع صاحبه عندك.",
      "ائتني فهمًا في كتابك وأنت أسمع وأبصر.",
      "ثبّتني على طريقة أهل الإخلاص وأنت بالمرصاد.",
      "اجعل سمعي وبصري وقلبي معصومة لك بعدما أنعمت.",
      "لا تذرني لجهلي؛ علّمني ما ينجيني.",
    ],
    en: [
      "Teach me what benefits my soul, for You know what I hide and what I show.",
      "Let the light of this name clear my doubts without making me arrogant.",
      "Grant me understanding that obeys You—not knowledge that hardens my heart.",
      "Help me see my faults before You see them on the Last Day.",
      "Let my study of Your signs lead to humility, not argument.",
      "Guide my choices today with the awareness that nothing is hidden from You.",
      "Pair my hearing and sight with gratitude instead of ingratitude.",
      "Let me remember that Your knowledge embraces my future; ease my anxiety.",
      "Rescue me from pretending I know while I am still blind to my need of You.",
      "Make me truthful with You in secret, since You are the All-Knowing.",
      "Let my heart prefer what You love, for You are acquainted with its every fold.",
      "Bless me with discernment between a good step and a slippery one.",
    ],
  },
  power: {
    test: /mighty|power|strong|subduer|prevail|victorious|dominion|force|able|capable|irresistible|exalted|great|supreme|almighty/i,
    ar: [
      "أعزّني بطاعتك ولا تذلّني بمعصيتك.",
      "قوّني على شهوات نفسي فأنت القوّي المتين.",
      "احسم لي بالحقّ وأنت أقدر من كل ظالم.",
      "انصرني على عدّي بغير افتخار إن غلبت.",
      "اجعل عزّتي في خوفك وخشيتك لا في مظاهر العاجل.",
      "ثبّتني على دينك وقوّ ظهري بصدق الاعتماد عليك.",
      "لا تكّلني إلى من لا يغني عني قهره دون رضاك.",
      "أذِلّ لي في نفسي كلّ سلطان دون سلطانك.",
      "انصر الحقّ فيّ على الباطل حتى تطمئنّ نفسي.",
      "اجعل قدرتك لي معونة لا تكبرًا، بل خشيةً وأدبًا.",
      "احفظني ممن يتعسّف بي وأنت أقدر الناصرين.",
      "قرّبني من السند الحقّ دون أن أستعين بظلم.",
    ],
    en: [
      "Let Your power lift me without inflating my ego; keep me humble under Your might.",
      "When I feel powerless, remind me that no barrier survives Your will.",
      "Break my reliance on tyranny of habit; give me strength only You can grant.",
      "Let justice from You protect me when human strength would fail.",
      "Save me from misusing any strength You lend me over myself or others.",
      "Make my victory inner—over caprice—before any outward win.",
      "When fear of harm grips me, let trust in Your power steady my breath.",
      "Let Your subduing might tame what in me resists repentance.",
      "Do not let me boast in strength; let awe of You be my dignity.",
      "Grant me courage that asks help from You, not from wrongdoing.",
      "Let any ascent You give me be a staircase toward gratitude, not pride.",
      "Rescue me from feeling safe while disobeying, for You are irresistible.",
    ],
  },
  kingdom: {
    test: /king|lord|owner|possess|dominion|malik|mālik|wealth|riches/i,
    ar: [
      "مالك يوم الدين أقلّب قلبي للاستسلام لملكوتك.",
      "لا تسلّط على ملكي بالمعاصي ما يهتك عيبة المؤمن.",
      "اجعل ملكي قلبي لك وحده لا لغيرك.",
      "ارزقني قناعةً من غناك وعفّةً من ملك نفسي.",
      "انفعني بملكك الجميل واصرف عني سوء ما يملكه الباطل.",
      "قرّبني من خزائن رضاك لا من حرص الكنز الباطل.",
      "اجعلني ممن يملكون الجدّ فيما ينفعهم عندك.",
      "ثبّتني في طاعة مالك الحقّ دون ميل إلى بهيمة الهوى.",
      "اكفني بحلالك عن حرامك وأغنني بفضلك عن من سواك.",
      "لا تذرني لعرض الدنيا فأنسى ملك الآخرة.",
      "اجعل حكمك في نفسي قبل أن أطمح لحكم غيرك.",
      "وفّقني لإنفاق ما ملكتني في مرضاتك.",
    ],
    en: [
      "Rule my heart before any throne; let Your kingdom be my true loyalty.",
      "Free me from slavery to wealth; let sufficiency come from trusting You, the Owner.",
      "Let what I own be a trust that draws me nearer to You, not away.",
      "When I am tempted to control others, return me to humility before the True King.",
      "Make my inner court honest: no hidden idols beside Your Lordship.",
      "Bless lawful provision; distance me from gain that stains this name’s majesty.",
      "Let me fear losing Your pleasure more than losing any possession.",
      "Grant me generosity shaped by Your ownership, not by my ego.",
      "When power is offered to me, let this name remind me it all returns to You.",
      "Let my deadlines and debts not make me forget the Final Dominion.",
      "Keep my home and work under the ethics this name demands.",
      "Let contentment be my treasure since You are the Rich, the King.",
    ],
  },
  purity: {
    test: /pure|sacred|holiness|flawless|perfect|high|above|transcendent|free of|immaculate/i,
    ar: [
      "طهّرني من دنس الذنوب فأنت المقدّس المصوّر.",
      "ألبسني بهاء الطاعة كما تليق باسمك الطاهر.",
      "باعد بيني وبين الشبهات فإني أشهد أنك القدّوس.",
      "زكّ نيتي حتى أخلص لك وأنت المطلع على السرائر.",
      "اغسلني من عيوبي بماء التوبة ولا تردّني خائبًا.",
      "اجعلني من عبادك الذين لا يلوثهم الزيف.",
      "ثبّتني على الاستقامة فأنت السلام ومنك السلام.",
      "احفظ لساني وبصري عما لا يليق بذكر اسمك.",
      "أذهب عني رجس الشكّ إذا كبر في صدري.",
      "قرّبني من صفاء الخشوع لا من صفاء المظهر فقط.",
      "لا تشأنئني بذنبٍ بعد أن كنت قد نصحتني.",
      "ائتني خلقًا جميلًا يشهد لقلبٍ نقيّ بإذنك.",
    ],
    en: [
      "Purify my intentions until my deeds match the holiness this name calls for.",
      "Guard my senses; let nothing impure attach itself to a heart that invokes You.",
      "Lift me from hidden hypocrisy; You are transcendent above every flaw I hide.",
      "Let repentance scrub what shame tries to cover up before You.",
      "Make my inner life cleaner than my outer image, for You are the Pure.",
      "When I am tempted to justify sin, let awe of Your perfection stop me.",
      "Let peace inwardly reflect this name—not only calm slogans.",
      "Rescue me from performing religion for eyes that cannot purify me.",
      "Bless me with integrity small enough to hide yet large enough to save me.",
      "Let my speech honor the sanctity of calling upon a Holy Lord.",
      "Do not let me stain this name’s grandeur by persisting in what You forbid.",
      "Clothe me in modesty of character that befits pure devotion.",
    ],
  },
  justice: {
    test: /just|justice|judge|truth|equitable|right|straight/i,
    ar: [
      "احكم بيني وبين ضميري بالحقّ وأنت أعدل العادلين.",
      "ثبّتني على الحقّ ولا تميل بي إلى هوى التحريف.",
      "انصر الحقّ في لساني وقلبي ولا تكلني للجور.",
      "أظهر لي حقيقة نفسي حتى أتوب قبل أن تحكم عليّ.",
      "اجعل عدلك لي رحمة لا انحيازًا لنفسي على الحقّ.",
      "لا تخذلني حين أطلب الحقّ ويضيق بي الطريق.",
      "ائتني ثباتًا على الصدق معك ومع خلقك.",
      "احفظني من تشويه الحقّ بلسانٍ أنا مُحاسَب عليه.",
      "قرّبني من الميزان الحقّ يوم لا ينفع إلا صدق الخطب.",
      "ثبّت قدمي على سواسية الأخلاق بما يرضيك.",
      "اجعل شهادتي لله حقًّا لا مظنةَ فخر.",
      "انصر المظلومة نفسي من ظلمها نفسها.",
    ],
    en: [
      "Let Your justice refine me, not crush me—beginning with truth about myself.",
      "Keep me from bending truth for comfort; You alone judge with perfect balance.",
      "When I wrong others, let this name bring me to repair, not denial.",
      "Align my public words with my private heart before You judge both.",
      "Help me carry fairness in family and work as worship of the Just.",
      "Save me from self-pity that pretends to be justice.",
      "Let the straight path feel sweeter than shortcuts that twist the truth.",
      "Make me quick to admit fault because You love honesty in servants.",
      "Let Your equity comfort the weak part of me that fears being unseen.",
      "When I must decide for others, let this name be my standard, not mood.",
      "Rescue me from ‘fairness’ that ignores heaven’s scales.",
      "Let truth spoken gently heal what anger tries to ‘win.’",
    ],
  },
  provision: {
    test: /provid|sustain|gift|give|open|wealth|grant| enlarge|bestow/i,
    ar: [
      "ارزقني حلالًا طيّبًا يكفُفُوني عن الحرام.",
      "افتح لي أبواب رزقك الحلال من حيث لا أحتسب.",
      "ارزقني قناعةً تعادل كثرة العالم.",
      "لا تكلني إلى سواك في طلب الرزق فأذل.",
      "بارك لي في وقتي وعملي ومالي المطهر.",
      "ائتني رزقًا يقوّيني على طاعتك لا على معصيتك.",
      "اكفني بفضلك عن سؤال أهل الباطل.",
      "لا تجعل الدنيا أكبر همّي وقد كفيتني.",
      "انشر لي خيرًا خفيًا يظهر يومًا في ثوابك.",
      "أغثني إن ضاق الرزق فأنت خير الرازقين.",
      "اجعل بركتك في معيشي لا فيطرَفِ شهوةٍ فقط.",
      "قرّبني من شكر النعم لا من نكرانها.",
    ],
    en: [
      "Provide for me in ways that keep me grateful, not grasping.",
      "Bless my earnings so they help me obey You, not bury me in distraction.",
      "When doors narrow, open patience in me until lawful relief arrives.",
      "Let my table remind me of stewardship, not entitlement.",
      "Protect me from haram shortcuts dressed as ‘necessity.’",
      "Make sufficiency sweeter than excess that hardens the heart.",
      "Let what You grant me today fund integrity, not compromise.",
      "When I worry about tomorrow, anchor me in Your attribute of giving.",
      "Let family provision be blessed teamwork, not mutual harm.",
      "Save me from comparing my portion to anyone else’s scroll.",
      "Let gratitude guard my sleep after You satisfy a need.",
      "Make my spending a witness to this name, not a denial of it.",
    ],
  },
  guidance: {
    test: /guid|lead|direct|light|navigator|way|path|straight/i,
    ar: [
      "اهدني إلى صراطك المستقيم وثبّت قدمي.",
      "كن لي وليًا في ضلال الشبهات.",
      "اجعل نور اسمك لي سراجًا في ظلمة التردّد.",
      "ائتني توبة نصوحًا تهدي خطاي.",
      "لا تَرُدّني بعدما هديتني إلا إلى الخير.",
      "قرّبني من أهل الهدى وباعدني عن زخرف الضلال.",
      "ألهمني اختيارًا يرضيك فيما أشكك فيه.",
      "احفظني من الهوى المُضلّ بعد أن أذقتني حلاوة الهدى.",
      "ثبّت قلبي على الشرع لا على تقلّب المزاج.",
      "اجعل لي من كل ضيق مخرجًا بهدى منك.",
      "انقلني من التشتت إلى تركيز الوجهة.",
      "وزّعني على مراحل الخير دون إرهاقٍ يكسرني.",
    ],
    en: [
      "Lead my steps today; when two paths look alike, choose for me what pleases You.",
      "Let this name be light when anxiety crowds my horizon.",
      "If I stray, retrieve me gently; I am calling You by the Guide.",
      "Guide my family’s decisions toward mercy and honesty.",
      "Untangle my overthinking with a clear next step You approve.",
      "When leaders mislead, anchor me to truth without bitterness.",
      "Let my reading of Your signs end in action, not endless doubt.",
      "Save me from following trends that drift from the Straight Path.",
      "Place wise companions in my path without making me dependent on idols.",
      "Let night prayer be a compass, not a performance.",
      "When I fear choosing wrong, remind me You love the sincerely guided.",
      "Turn my hesitation into tawakkul paired with effort.",
    ],
  },
  punishment: {
    test: /punish|pain|harm|severe|retribution|avenge|triumph.*foe|abductor|misguid/i,
    ar: [
      "استرني من سيّئ ما يخاف المؤمنون ونقّني بالتوبة.",
      "اجعل اسمك لي حصنًا من مكائد الهوى والفشل.",
      "لا تسلّط علىّي ما يقصّر جانبي الإيمان.",
      "اصرف عنّي ما يرمي بي إلى الهلاك إِنّك سميع الدعاء.",
      "قرّبني من الأمان الذي لا يزول مع سخطك.",
      "احفظني من شرّ نفسي كما تحفظني من شرّ غيري.",
      "اختم لي بخير إذا مسّني ما يذكّر بعظمتك.",
      "املأ قلبي خشيةً تمنعني لا تعجزني.",
      "اجعل كلّ عقوبةٍ أصابتني تربيةً لا تيأس.",
      "ثبّتني على الاستغفار حين أهاب من عقوبتك.",
      "لا تذرني لضعف الإيمان حين تظلم النفوس.",
      "يرحمني اسمك إن كنت أحقّ بأسك.",
    ],
    en: [
      "Shield me from harm I bring upon myself through heedlessness.",
      "Let fear of Your rightful severity keep me tender, not cynical.",
      "When consequences come, turn them into lessons that return me to You.",
      "Protect my loved ones from trials that would shake faith cruelly.",
      "Do not let hardship make me deny the truth of this name.",
      "Rescue me from self-destructive patterns masked as ‘freedom.’",
      "Let the awe this name inspires end in repentance, not despair.",
      "When enemies surround, let my refuge be lawful trust in You alone.",
      "Save me from asking You to harm others out of my wounded ego.",
      "Let hardship polish me; do not let it shatter my hope.",
      "Remind me severity belongs to justice, not personal revenge.",
      "Keep bitterness from hijacking prayers tied to this attribute.",
    ],
  },
  general: {
    test: () => true,
    ar: [
      "اجعل اسمك لي نورًا في ظلمات الحيرة.",
      "قرّبني إليك كلما دعوتك بهذا الاسم.",
      "ثبّتني على حبّك حتى ألقاك وأنت عنّي راضٍ.",
      "ألبسني من عظمته خشيةً ومن جلاله أدبًا.",
      "لا تخذلني بعد أن علّمتني أنّك سميع قريب.",
      "املأ صدري إيمانًا يدوم مع المحن واليسر.",
      "ائتني صبرًا حسنًا على أقدارٍ لا أستوعبها.",
      "اعصمني من الفتن ما ظهر منها وما بطن.",
      "اكتب لي عندك خيرًا أراه وأخيرًا لا أراه.",
      "اجمع نفع الدنيا والآخرة في دعوتي.",
      "أذِقني حلاوة المناجاة باسمك.",
      "اختم لي بخاتمة صالحة لا مردّ لها.",
      "احفظ لي أمري بين الكرم والعدل.",
      "ثبّت لساني على الذكر حين تنأى الشواغل.",
      "أذهب عني كلّ غشّ في الدين والمعاش.",
      "بارك لي في أهلي وذريّتي بما يرضيك.",
      "قرّبني من الصادقين في القول والعمل.",
      "لا ترفعني باسمك ثم تورطني في كبر.",
      "ائتني مواساة إذا وحشتني الطريق.",
      "اصطنع لي فرجًا من ضيق لا أستطيع وصفه.",
      "يا من له الأسماء الحسنى اجعل هذا الاسم سبيلًا لي إلى رضوانك.",
    ],
    en: [
      "Let this name be a lantern in my confusion; do not leave me groping alone.",
      "Draw me nearer each time I call You by it sincerely.",
      "Plant awe and love together so I neither freeze nor forget myself before You.",
      "Let my routine today reflect gratitude for what this name unveils of You.",
      "When I feel ordinary, remind me this name is not ordinary.",
      "Keep calling me upward when my mood pulls me downward.",
      "Bless the hidden hours of worship tied to remembering this name.",
      "Let family arguments cool when this name is remembered between us.",
      "Protect my livelihood from what would stain this invocation.",
      "When I succeed, let this name humble me instead of advertising me.",
      "When I fail, let this name lift me without excuses.",
      "Seal my day with sincerity I can admit to You at night.",
      "Let my sleep be peaceful because I entrusted the unseen to You.",
      "Help me forgive others in the spirit of what this name teaches.",
      "Guard my tongue from sarcasm that fights the dignity of Your names.",
      "Let strangers benefit from my character because I remembered You.",
      "In pain, let this name be balm—not a slogan, but a lifeline.",
      "In joy, let this name be grounding—not forgotten in noise.",
      "Bind my plans to adab with You; let haste not ruin them.",
      "Teach me a dua today I will still mean tomorrow.",
      "Combine for me safety in religion and decency in worldly duties.",
    ],
  },
};

const allah = JSON.parse(fs.readFileSync(allahPath, "utf8"));
const rows = [];

for (const x of allah.data) {
  const n = x.number;
  const meaning = (x.en?.meaning || "").trim();
  const desc = (x.en?.desc || "").trim();
  const hay = `${meaning} ${desc}`;
  let cat = "general";
  for (const [key, pool] of Object.entries(pools)) {
    if (key === "general") continue;
    if (pool.test.test(hay)) {
      cat = key;
      break;
    }
  }
  const p = pools[cat] || pools.general;
  const mix = (n * 37 + hay.length * 17 + cat.length * 3) % p.ar.length;
  const arTail = p.ar[mix];
  const enTail = p.en[mix % p.en.length];
  const name = x.name;
  const lat = x.transliteration || "";

  rows.push({
    number: n,
    duaAr: `اللهم يا ${name}، ${arTail}`,
    duaEn: `O Allah, You are ${lat} — ${meaning}. ${enTail}`,
  });
}

const out = { code: 200, status: "OK", data: rows };
fs.writeFileSync(outPath, JSON.stringify(out, null, 1), "utf8");
console.log("Wrote", outPath, "count", rows.length);
