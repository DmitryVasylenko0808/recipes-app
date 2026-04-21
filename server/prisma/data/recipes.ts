import { faker } from '@faker-js/faker';
import { authors } from './authors';
import { categories } from './categories';
import { v4 as uuidv4 } from 'uuid';
import { tags } from './tags';
import { ingredients } from './ingredients';
import { Rating } from 'src/generated/prisma/client';

const authorsIds = authors.map((a) => a.id);

export const recipes = [
  {
    title: 'Classic Borscht',
    categoryId: categories[0].id,
    description: 'Traditional Ukrainian beet soup with beef',
    previewImage: 'https://example.com/images/borscht.jpg',
    content: `# Quo ille hostis non

## Quam quae sed

Lorem markdownum urbem et nymphas Phoebo est tegmine, mutanda cingebat pectus,
sua neu, est, per Dryopen. Medea **me error**, et aliena se Molossa spargere
dixit et est; mihi. Redeunt si priore inplumes fecit utiliter vellet, vocatur
gurgite Typhoea vocem retinacula et. Tene tenebrosa steterant nam videt cortice
vidit te vela orbem gradibus: Alcides nihil undas Crete mali fecit undis. Ni
plangebat harena spirantis relanguit corpora abstuleris horrendum flectitur
labores.

## Avis corpore mergit

Facerent Cypriae annis. Carinam flet a ululatibus, [miseri cadit
matris](#nec-corvo-aevum-aetas) errans parentali protinus et *dixit* domino.
Iussae **Apollinis pertulit sedes**!

- Tenui sub Panes sed Haec Apidani sua
- Oceano nunc medio meditata periere
- Pyramus animi dulcique
- Et huius opesque sua proles

## Res monte sanguine auctor

Herbis illa et montis vinctum, virgine staret. Sis **vertor solum nunc** vertice
Aricinae sidera: ferro tu traxit mentior tellure in, quae, claudit? Pingues haud
cupidine saturatos lampadibus horret Bacchi, diruerent acclinata non sit nec.

## Nec corvo aevum aetas

Cum dote blanditus inmedicabile neque communemque dinumerat, poma sed, in
profugi tamen. Sint conciliumque inque tamen quem quid legit, sui deieci latus.
Nec pleno de etiam tibi, post vulnere. Aut Diomede saltus, ire se visus,
deprensa, *fuerat*. Voce pascere nomine de arma premebat: quoque sua plura [viam
lactis ausus](#quam-quae-sed) quiescere inponit, spatiis, furentem.

> Taedasque corpusque domos in superas videri, fugae iusto. Non et humanum
> facundia, tandem paruerit mea **possem nostris cum** torum.
`,
    cookingTime: 60,
    difficulty: 'medium',
  },
  {
    title: 'Caesar Salad',
    categoryId: categories[2].id,
    description: 'Fresh salad with chicken and croutons',
    previewImage: 'https://example.com/images/caesar.jpg',
    content: 'Grill chicken, chop lettuce, add dressing and croutons.',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Spaghetti Carbonara',
    categoryId: categories[12].id,
    description: 'Italian pasta with bacon and creamy sauce',
    previewImage: 'https://example.com/images/carbonara.jpg',
    content: 'Cook pasta, fry bacon, mix with sauce and serve.',
    cookingTime: 30,
    difficulty: 'medium',
  },
  {
    title: 'Chocolate Cake',
    categoryId: categories[3].id,
    description: 'Rich chocolate dessert',
    previewImage: 'https://example.com/images/chocolate_cake.jpg',
    content: 'Mix ingredients, bake at 180°C for 35 minutes, cool and serve.',
    cookingTime: 50,
    difficulty: 'hard',
  },
  {
    title: 'Lemonade',
    categoryId: categories[4].id,
    description: 'Refreshing drink with lemon and mint',
    previewImage: 'https://example.com/images/lemonade.jpg',
    content: 'Mix lemon juice, water, sugar, add mint leaves.',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Grilled Chicken Breast',
    categoryId: categories[11].id,
    description: 'Juicy grilled chicken with spices',
    previewImage: 'https://example.com/images/grilled_chicken.jpg',
    content: `# Se solane

## Quae mea

Lorem markdownum rediit ut exclamat accipe: cavis videntur, init nemus nigraque
Philyreius. Thermodontiaco victoris. Pectora Sidonius et animosque inque
liberiore fiducia, visibus per adopertaque.

- Molimine origine equae
- Nam Cinyreius mentique audierat
- Uti ipse regna

Umbra hanc movebere haec Ioles fervidus, tandem dabit ubi **pro digitis**
matris! Unde [posuit](#se-solane) populi intermittuntque [uberibus exitiabile
currum](#se-solane) Adonis. Ausa iacent periturus celebrant. Phoebus Herculis
mearum laniarat felix! Et caelumque alterius tua cui saepe, pectora ferarum,
per.

## Annis tremit

Altis est, ibat facies negat reverentia pressit cuiquam. Corpus esset et qui
condit candida [una demisso](#se-solane) miratur sanguine missus. Tum
[pectusque](#quae-mea) dedit; Tyrrhenus ipse, ante regia, aequorei in pedibus!
Quodsi Marmaridae **ardet**, est semper spreta non: tu. Vitae refert, mariti: in
veros coepisse adit; nam quid his.

> Ducebat tota honorem *occidit et* cornix rapuitque iam arbore pectoribus parte
> gradus texerat sua addidit cura de! Patet concipit est cretus ab aere? Pontus
> haec atque; ense iuvat pars, [animisque laevam Meleagros](#quae-mea) et
> liberat! *Ab erat prodit*, cuspidis annis, dedissent populi acumine inlatum
> Stygias dum!

Pignus corde [inclusaque herbis fragor](#se-solane) comitantibus magis. In [non
Lotis](#annis-tremit) namque invidiosus enim *pectoribusque parvumque harundine*
quoque scalas; credi et refert irascentemque candidus nefas!
`,
    cookingTime: 30,
    difficulty: 'easy',
  },
  {
    title: 'Beef Stir Fry',
    categoryId: categories[12].id,
    description: 'Asian style beef stir fry',
    previewImage: 'https://example.com/images/beef_stirfry.jpg',
    content: 'Fry beef, add vegetables and soy sauce.',
    cookingTime: 25,
    difficulty: 'medium',
  },
  {
    title: 'Pancakes',
    categoryId: categories[5].id,
    description: 'Fluffy breakfast pancakes',
    previewImage: 'https://example.com/images/pancakes.jpg',
    content: 'Mix batter and fry on pan.',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Chocolate Muffins',
    categoryId: categories[7].id,
    description: 'Soft chocolate muffins',
    previewImage: 'https://example.com/images/muffins.jpg',
    content: 'Mix and bake 25 minutes.',
    cookingTime: 35,
    difficulty: 'medium',
  },
  {
    title: 'Greek Salad',
    categoryId: categories[2].id,
    description: 'Fresh vegetable salad',
    previewImage: 'https://example.com/images/greek.jpg',
    content: 'Chop vegetables and mix.',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Tomato Soup',
    categoryId: categories[0].id,
    description: 'Warm and creamy tomato soup',
    previewImage: 'https://example.com/tomato_soup.jpg',
    content: `# Tibi quis convicia

## Apolline ego dicto peccavere

Lorem markdownum nocte referre. Nati adde.

> Vestis nutrici nostrae *aggere Peneidas* numquam parentum afuit tu infecit
> **quondam**, aut aliquis dea Boreas labens posse? Coniunx et aratri,
> hominemque dives Aurora temperat, vereri, simul. Pallada villosis imbres
> labitur gentibus iamque: est retroque quam [Sabinis
> nullus](#moriturae-in-ipsos-cum) quaerente quae, bracchiaque probabo spes
> imagine fera.

Erat senserit, potentia manus. Est summa *modo maturior*, fundamina, murice oro
illum illa vidit potuisse restatque habuere, et una. Draconem agros navibus ab
natos nato solo [lacertis](#moriturae-in-ipsos-cum) vestrae. Est loco mero ubi,
annis quod vestes haec totas, aliquos, in.

## Moriturae in ipsos cum

Manu ventis quicumque malorum ira aede. Taenarides mundi
[Tartara](#apolline-ego-dicto-peccavere) dentibus super Iove quem Balearica,
visurus vel putat parte partibus nostrisque. Tibi meruistis adspicit
[undae](#moriturae-in-ipsos-cum): numina carmine, tibi inquit? Non est venit,
fuit. Una poni quisquis?

> Pennis quo miseri, **praeterea moriuntur aevum**, misit vultu pius habenas
> ficta nec tendere unda. A *et* dare aquae Peliacae variare similis: dant te
> melior quoque!

Certamina fieri chrysolithi tuus me premat; adit multamque procul. Opus ipse o
per est quid taedia quem *gentibus*, Iamque in parias utrimque. Laevum
perpetuoque neque exsecrantia erat imagine, boum at sui efficient illud qua
medio ubi, Minos. Illa huic certe haec, clades quo ubi **tulit struxisse**,
cruore rebellant satis Pelasgos; aequum.
`,
    cookingTime: 35,
    difficulty: 'easy',
  },
  {
    title: 'Fried Rice',
    categoryId: categories[1].id,
    description: 'Classic Asian fried rice',
    previewImage: 'https://example.com/fried_rice.jpg',
    content: 'Fry rice with vegetables and soy sauce.',
    cookingTime: 25,
    difficulty: 'easy',
  },
  {
    title: 'Omelette',
    categoryId: categories[5].id,
    description: 'Simple egg omelette',
    previewImage: 'https://example.com/omelette.jpg',
    content: 'Whisk eggs and fry.',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Banana Smoothie',
    categoryId: categories[4].id,
    description: 'Healthy banana drink',
    previewImage: 'https://example.com/smoothie.jpg',
    content: 'Blend all ingredients.',
    cookingTime: 5,
    difficulty: 'easy',
  },
  {
    title: 'Shrimp Pasta',
    categoryId: categories[12].id,
    description: 'Pasta with shrimp and garlic',
    previewImage: 'https://example.com/shrimp_pasta.jpg',
    content: 'Cook pasta and mix with shrimp.',
    cookingTime: 30,
    difficulty: 'medium',
  },
  {
    title: 'Vegetable Stir Fry',
    categoryId: categories[10].id,
    description: 'Mixed vegetables stir fry',
    previewImage: 'https://example.com/veg_stirfry.jpg',
    content: 'Fry vegetables with sauce.',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Apple Pie',
    categoryId: categories[3].id,
    description: 'Classic apple pie dessert',
    previewImage: 'https://example.com/apple_pie.jpg',
    content: `# Illud concussaque pateat numine

## Adspergine suae ego simul

Lorem markdownum nostri germanae nec spatii, *dextra meris*: quaeque: sol. Huc
quae. Ait agmina, recultae **quia**. Digitis peteret si quale Caenis loca est
creatus feror incursu rogabo mea!

Ut quod. **Ait non** refert, talia, pependit quidam, est pro? Bracchia *curvi
has*, et virentes in catenis notavi ipsum ramos, mortales!

Tenuissima procul petebamus alma: sui adhuc Hylen tectis iacet fores potiere
luctus clara! Latuerunt spemque ruris, accepit est amor: oculisque, primordia
animoque. **Lumina** paritura de manibus Nisus. Me scelus indefessus quem.

## Dique exanimi ille

Superi fuit, aemula arma venti [summa](#dique-exanimi-ille) secto gulae.
Repugnat qui armis, herbis fame minima Minoe Atrides Laurentes misit saltus
formatum fixa. Sonis pectore exiguam Panaque corpore, nec *corpus fuit* nil:
viscera filia ocior splendenti eventu, sibi reddidit. Bitumen territus germanae
verba. Me et leto gravitate locum, fugit motis, omnes terram natus Lyaeo, loci
in finis.

1. Rescindere data Hectoris insequitur metuunt cibo
2. In paelex omni sua
3. Contagia altera potuit ignibus
4. Ardeat consorti coniuge leges
5. Diu pomum notatum vulnera pontifici maior Cnosius
6. Quoque ponderibus flamma volubilibus anilibus et caelo

Tacetve illa, me fuit aras casus: *thyrsos ipse* sequenti corpora erat.
Civilibus effugere adiacet tamen. Silvae id liquidis atria hosti et mora bis
[revelli adest](#illud-concussaque-pateat-numine): tibi eadem hoste **magno**.
Rustica terrae, per est regentis figit **est quasque arces** munus, haec nitente
harenam obvertit in saxoque saxeus. Cruentas noctem parvo, nostris Tiberinaque
raptor.
`,
    cookingTime: 60,
    difficulty: 'hard',
  },
  {
    title: 'Garlic Bread',
    categoryId: categories[6].id,
    description: 'Crispy garlic bread',
    previewImage: 'https://example.com/garlic_bread.jpg',
    content: 'Bake bread with garlic butter.',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Grilled Salmon',
    categoryId: categories[8].id,
    description: 'Fresh grilled salmon fillet',
    previewImage: 'https://example.com/salmon.jpg',
    content: 'Grill salmon with seasoning.',
    cookingTime: 25,
    difficulty: 'medium',
  },
  {
    title: 'Chocolate Milkshake',
    categoryId: categories[4].id,
    description: 'Sweet chocolate drink',
    previewImage: 'https://example.com/milkshake.jpg',
    content: 'Blend milk and chocolate.',
    cookingTime: 5,
    difficulty: 'easy',
  },
  {
    title: 'Chicken Curry',
    categoryId: categories[1].id,
    description: 'Spicy chicken curry with rich sauce',
    previewImage: 'https://example.com/chicken_curry.jpg',
    content: 'Cook chicken with spices and simmer.',
    cookingTime: 40,
    difficulty: 'medium',
  },
  {
    title: 'Beef Burger',
    categoryId: categories[6].id,
    description: 'Juicy homemade beef burger',
    previewImage: 'https://example.com/burger.jpg',
    content: 'Grill patty and assemble burger.',
    cookingTime: 25,
    difficulty: 'easy',
  },
  {
    title: 'Beef Burger',
    categoryId: categories[6].id,
    description: 'Juicy homemade beef burger',
    previewImage: 'https://example.com/burger.jpg',
    content: 'Grill patty and assemble burger.',
    cookingTime: 25,
    difficulty: 'easy',
  },
  {
    title: 'Spaghetti Bolognese',
    categoryId: categories[12].id,
    description: 'Classic Italian pasta with meat sauce',
    previewImage: 'https://example.com/bolognese.jpg',
    content: 'Cook pasta and simmer meat sauce.',
    cookingTime: 45,
    difficulty: 'medium',
  },
  {
    title: 'French Toast',
    categoryId: categories[5].id,
    description: 'Sweet breakfast toast',
    previewImage: 'https://example.com/french_toast.jpg',
    content: 'Dip bread in egg and fry.',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Tuna Salad',
    categoryId: categories[2].id,
    description: 'Protein-rich tuna salad',
    previewImage: 'https://example.com/tuna_salad.jpg',
    content: 'Mix tuna with vegetables.',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Mushroom Risotto',
    categoryId: categories[12].id,
    description: 'Creamy risotto with mushrooms',
    previewImage: 'https://example.com/risotto.jpg',
    content: 'Cook rice slowly with broth.',
    cookingTime: 40,
    difficulty: 'hard',
  },
  {
    title: 'Chicken Nuggets',
    categoryId: categories[6].id,
    description: 'Crispy fried chicken nuggets',
    previewImage: 'https://example.com/nuggets.jpg',
    content: 'Bread and fry chicken pieces.',
    cookingTime: 20,
    difficulty: 'easy',
  },
  {
    title: 'Berry Smoothie',
    categoryId: categories[4].id,
    description: 'Fresh berry smoothie',
    previewImage: 'https://example.com/berry_smoothie.jpg',
    content: `# Humanas volucris haud

## Manu artus gentisque ite

Lorem markdownum voluptas corpore subitam bracchia sentirent Pelates numerum
Tritonia in vipereis repellit, vindice sit: et. Hospitio minantia commissaque
**pedicis**. Primus cum, dixit, a petis veniens; thyrso omnia stamina Caicus tu
super si vulnera hedera. Male illo deas vinaque, nullus atra, tardantis, sero.
*Sine armis* voluptas et litora mater, cum tetigit parabam crudeles ovantem.

- Iubentem limina
- Illac Iunonius ad ulla
- Ex dolosae nulla quod Ericthonio locus
- Caelo Palameden inaniter edidit mutatis iuvenis tempora
- Tenus confundere ipsi pacali
- Putavi adfuit non

## Notis genetrix monitis moveoque

Fas humo colitur aevum cursu. Ita suo tremoribus genitam *nympha*. *Pro timet*
et notatum loqui Oriente *imago pectore admissa* diu fugit, spumeus, o. Quidem
quarum fuere ut intima **totoque tibi**: cedere omnia Rhadamanthon avium aurea
portis. Ora rigori viderit, cum ecce via corpore sonos.

> Glaebis tantaeque nostro ludunt ferrumque dixit, fratrique spissa lacertos,
> ire, Diana Region. Indicet Phoebus silvae, deum Scythicas caerulus iuncta,
> ortuque, pestis. Iam reicerer vosne. Ipsi robore ceram profundi locus,
> recursus rursus spernentem novena potuit.

## Quamvis manu sed possemque

Ita es, videbar tendentem conubia medias hastis aliter, ad ut alteriusque victa
consilium pepulere: ille. Quod aequore nam habuere sumpsit orbem. **Ipse
iuvenis** inpia.

Manu arces agnovere penetrale quidque, deus flere, huc pias ferri thyrsos! Ea
frontis tacebitur lenis refugitque canum induroque aliasque secum me tanget ab
cuius vidisse reservant coniunx. Inpensior potiere quamvis, et utque sororia,
inpune, *digitosque genua*. **Sustulit abstinet**!
`,
    cookingTime: 5,
    difficulty: 'easy',
  },
  {
    title: 'Roasted Potatoes',
    categoryId: categories[1].id,
    description: 'Crispy roasted potatoes',
    previewImage: 'https://example.com/potatoes.jpg',
    content: 'Bake potatoes with oil.',
    cookingTime: 35,
    difficulty: 'easy',
  },
  {
    title: 'Garlic Shrimp',
    categoryId: categories[8].id,
    description: 'Shrimp sautéed in garlic butter',
    previewImage: 'https://example.com/shrimp.jpg',
    content: 'Cook shrimp with garlic.',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Pork Chops',
    categoryId: categories[1].id,
    description: 'Pan-fried pork chops',
    previewImage: 'https://example.com/pork.jpg',
    content: 'Season and fry pork.',
    cookingTime: 30,
    difficulty: 'medium',
  },
  {
    title: 'Veggie Wrap',
    categoryId: categories[6].id,
    description: 'Healthy vegetable wrap',
    previewImage: 'https://example.com/wrap.jpg',
    content: 'Wrap veggies in flatbread.',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Chicken Alfredo',
    categoryId: categories[12].id,
    description: 'Creamy chicken pasta',
    previewImage: 'https://example.com/alfredo.jpg',
    content: 'Cook pasta and creamy sauce.',
    cookingTime: 35,
    difficulty: 'medium',
  },
  {
    title: 'Egg Salad',
    categoryId: categories[2].id,
    description: 'Simple egg salad',
    previewImage: 'https://example.com/egg_salad.jpg',
    content: 'Mix boiled eggs.',
    cookingTime: 15,
    difficulty: 'easy',
  },
  {
    title: 'Lentil Soup',
    categoryId: categories[0].id,
    description: 'Healthy lentil soup',
    previewImage: 'https://example.com/lentil.jpg',
    content: 'Boil lentils and spices.',
    cookingTime: 40,
    difficulty: 'easy',
  },
  {
    title: 'BBQ Ribs',
    categoryId: categories[11].id,
    description: 'Slow cooked BBQ ribs',
    previewImage: 'https://example.com/ribs.jpg',
    content: 'Bake ribs with sauce.',
    cookingTime: 90,
    difficulty: 'hard',
  },
  {
    title: 'Avocado Toast',
    categoryId: categories[5].id,
    description: 'Simple avocado toast',
    previewImage: 'https://example.com/avocado.jpg',
    content: 'Spread avocado on toast.',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Avocado Toast',
    categoryId: categories[5].id,
    description: 'Simple avocado toast',
    previewImage: 'https://example.com/avocado.jpg',
    content: 'Spread avocado on toast.',
    cookingTime: 10,
    difficulty: 'easy',
  },
  {
    title: 'Chocolate Brownie',
    categoryId: categories[9].id,
    description: 'Rich and fudgy chocolate brownie',
    previewImage: 'https://example.com/brownie.jpg',
    content: 'Mix ingredients, bake until set.',
    cookingTime: 30,
    difficulty: 'easy',
  },
].map((item, index) => ({
  ...item,
  id: uuidv4(),
  authorId: faker.helpers.arrayElement(authorsIds),
  previewImage: `${index}.jpg`,
  viewsCount: faker.number.int({ min: 50, max: 150 }),
  createdAt: faker.date.past({ years: 2 }),
  ratingsCount: 0,
  ratingsSum: 0,
  ratingsAvg: 0,
}));

export const recipeTags = [
  { recipeId: recipes[0].id, tagId: tags[1].id }, // Classic Borscht - Healthy
  { recipeId: recipes[0].id, tagId: tags[6].id }, // Classic Borscht - Spicy
  { recipeId: recipes[1].id, tagId: tags[0].id }, // Caesar Salad - Quick
  { recipeId: recipes[1].id, tagId: tags[7].id }, // Caesar Salad - Vegetarian
  { recipeId: recipes[2].id, tagId: tags[0].id }, // Spaghetti Carbonara - Quick
  { recipeId: recipes[2].id, tagId: tags[15].id }, // Spaghetti Carbonara - Intermediate
  { recipeId: recipes[3].id, tagId: tags[5].id }, // Chocolate Cake - Comfort Food
  { recipeId: recipes[3].id, tagId: tags[16].id }, // Chocolate Cake - Advanced
  { recipeId: recipes[4].id, tagId: tags[9].id }, // Lemonade - Breakfast
  { recipeId: recipes[4].id, tagId: tags[0].id }, // Lemonade - Quick
  { recipeId: recipes[5].id, tagId: tags[0].id }, // Grilled Chicken Breast - Quick
  { recipeId: recipes[5].id, tagId: tags[10].id }, // Grilled Chicken Breast - Dinner
  { recipeId: recipes[6].id, tagId: tags[6].id }, // Beef Stir Fry - Spicy
  { recipeId: recipes[6].id, tagId: tags[15].id }, // Beef Stir Fry - Intermediate
  { recipeId: recipes[7].id, tagId: tags[9].id }, // Pancakes - Breakfast
  { recipeId: recipes[7].id, tagId: tags[0].id }, // Pancakes - Quick
  { recipeId: recipes[8].id, tagId: tags[5].id }, // Chocolate Muffins - Comfort Food
  { recipeId: recipes[8].id, tagId: tags[16].id }, // Chocolate Muffins - Advanced
  { recipeId: recipes[9].id, tagId: tags[7].id }, // Greek Salad - Vegetarian
  { recipeId: recipes[9].id, tagId: tags[0].id }, // Greek Salad - Quick
  { recipeId: recipes[10].id, tagId: tags[0].id }, // Tomato Soup - Quick
  { recipeId: recipes[10].id, tagId: tags[1].id }, // Tomato Soup - Healthy
  { recipeId: recipes[11].id, tagId: tags[0].id }, // Fried Rice - Quick
  { recipeId: recipes[11].id, tagId: tags[6].id }, // Fried Rice - Spicy
  { recipeId: recipes[12].id, tagId: tags[0].id }, // Omelette - Quick
  { recipeId: recipes[12].id, tagId: tags[9].id }, // Omelette - Breakfast
  { recipeId: recipes[13].id, tagId: tags[1].id }, // Banana Smoothie - Healthy
  { recipeId: recipes[13].id, tagId: tags[0].id }, // Banana Smoothie - Quick
  { recipeId: recipes[14].id, tagId: tags[6].id }, // Shrimp Pasta - Spicy
  { recipeId: recipes[14].id, tagId: tags[15].id }, // Shrimp Pasta - Intermediate
  { recipeId: recipes[15].id, tagId: tags[7].id }, // Vegetable Stir Fry - Vegetarian
  { recipeId: recipes[15].id, tagId: tags[0].id }, // Vegetable Stir Fry - Quick
  { recipeId: recipes[16].id, tagId: tags[5].id }, // Apple Pie - Comfort Food
  { recipeId: recipes[16].id, tagId: tags[16].id }, // Apple Pie - Advanced
  { recipeId: recipes[17].id, tagId: tags[0].id }, // Garlic Bread - Quick
  { recipeId: recipes[17].id, tagId: tags[10].id }, // Garlic Bread - Dinner
  { recipeId: recipes[18].id, tagId: tags[15].id }, // Grilled Salmon - Intermediate
  { recipeId: recipes[18].id, tagId: tags[10].id }, // Grilled Salmon - Dinner
  { recipeId: recipes[19].id, tagId: tags[0].id }, // Chocolate Milkshake - Quick
  { recipeId: recipes[19].id, tagId: tags[5].id }, // Chocolate Milkshake - Comfort Food
  { recipeId: recipes[20].id, tagId: tags[6].id }, // Chicken Curry - Spicy
  { recipeId: recipes[20].id, tagId: tags[15].id }, // Chicken Curry - Intermediate
  { recipeId: recipes[21].id, tagId: tags[0].id }, // Beef Burger - Quick
  { recipeId: recipes[21].id, tagId: tags[18].id }, // Beef Burger - Kid-Approved
  { recipeId: recipes[22].id, tagId: tags[0].id }, // Spaghetti Bolognese - Quick
  { recipeId: recipes[22].id, tagId: tags[15].id }, // Spaghetti Bolognese - Intermediate
  { recipeId: recipes[23].id, tagId: tags[9].id }, // French Toast - Breakfast
  { recipeId: recipes[23].id, tagId: tags[0].id }, // French Toast - Quick
  { recipeId: recipes[24].id, tagId: tags[1].id }, // Tuna Salad - Healthy
  { recipeId: recipes[24].id, tagId: tags[0].id }, // Tuna Salad - Quick
  { recipeId: recipes[25].id, tagId: tags[16].id }, // Mushroom Risotto - Advanced
  { recipeId: recipes[25].id, tagId: tags[15].id }, // Mushroom Risotto - Intermediate
  { recipeId: recipes[26].id, tagId: tags[0].id }, // Chicken Nuggets - Quick
  { recipeId: recipes[26].id, tagId: tags[18].id }, // Chicken Nuggets - Kid-Approved
  { recipeId: recipes[27].id, tagId: tags[1].id }, // Berry Smoothie - Healthy
  { recipeId: recipes[27].id, tagId: tags[0].id }, // Berry Smoothie - Quick
  { recipeId: recipes[28].id, tagId: tags[0].id }, // Roasted Potatoes - Quick
  { recipeId: recipes[28].id, tagId: tags[5].id }, // Roasted Potatoes - Comfort Food
  { recipeId: recipes[29].id, tagId: tags[6].id }, // Garlic Shrimp - Spicy
  { recipeId: recipes[29].id, tagId: tags[15].id }, // Garlic Shrimp - Intermediate
  { recipeId: recipes[30].id, tagId: tags[15].id }, // Pork Chops - Intermediate
  { recipeId: recipes[30].id, tagId: tags[10].id }, // Pork Chops - Dinner
  { recipeId: recipes[31].id, tagId: tags[7].id }, // Veggie Wrap - Vegetarian
  { recipeId: recipes[31].id, tagId: tags[0].id }, // Veggie Wrap - Quick
  { recipeId: recipes[32].id, tagId: tags[15].id }, // Chicken Alfredo - Intermediate
  { recipeId: recipes[32].id, tagId: tags[10].id }, // Chicken Alfredo - Dinner
  { recipeId: recipes[33].id, tagId: tags[0].id }, // Egg Salad - Quick
  { recipeId: recipes[33].id, tagId: tags[1].id }, // Egg Salad - Healthy
  { recipeId: recipes[34].id, tagId: tags[1].id }, // Lentil Soup - Healthy
  { recipeId: recipes[34].id, tagId: tags[0].id }, // Lentil Soup - Quick
  { recipeId: recipes[35].id, tagId: tags[16].id }, // BBQ Ribs - Advanced
  { recipeId: recipes[35].id, tagId: tags[5].id }, // BBQ Ribs - Comfort Food
  { recipeId: recipes[36].id, tagId: tags[0].id }, // Avocado Toast - Quick
  { recipeId: recipes[36].id, tagId: tags[7].id }, // Avocado Toast - Vegetarian
  { recipeId: recipes[37].id, tagId: tags[0].id }, // Avocado Toast - Quick
  { recipeId: recipes[37].id, tagId: tags[7].id }, // Avocado Toast - Vegetarian
  { recipeId: recipes[38].id, tagId: tags[5].id }, // Chocolate Brownie - Comfort Food
  { recipeId: recipes[38].id, tagId: tags[16].id }, // Chocolate Brownie - Advanced
];

export const recipeIngredients = [
  // Classic Borscht
  {
    id: uuidv4(),
    recipeId: recipes[0].id,
    ingredientId: ingredients[1].id,
    amount: 300,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeId: recipes[0].id,
    ingredientId: ingredients[19].id,
    amount: 2,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeId: recipes[0].id,
    ingredientId: ingredients[20].id,
    amount: 3,
    unit: 'pcs',
  }, // Potato
  {
    id: uuidv4(),
    recipeId: recipes[0].id,
    ingredientId: ingredients[21].id,
    amount: 2,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeId: recipes[0].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic

  // Caesar Salad
  {
    id: uuidv4(),
    recipeId: recipes[1].id,
    ingredientId: ingredients[0].id,
    amount: 200,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeId: recipes[1].id,
    ingredientId: ingredients[21].id,
    amount: 1,
    unit: 'pcs',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeId: recipes[1].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  { id: uuidv4(), recipeId: recipes[1].id, ingredientId: ingredients[8].id, amount: 50, unit: 'g' }, // Cheddar Cheese
  {
    id: uuidv4(),
    recipeId: recipes[1].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil

  // Spaghetti Carbonara
  {
    id: uuidv4(),
    recipeId: recipes[2].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeId: recipes[2].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs
  { id: uuidv4(), recipeId: recipes[2].id, ingredientId: ingredients[9].id, amount: 50, unit: 'g' }, // Parmesan Cheese
  {
    id: uuidv4(),
    recipeId: recipes[2].id,
    ingredientId: ingredients[17].id,
    amount: 2,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeId: recipes[2].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Chocolate Cake
  {
    id: uuidv4(),
    recipeId: recipes[3].id,
    ingredientId: ingredients[12].id,
    amount: 200,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeId: recipes[3].id,
    ingredientId: ingredients[13].id,
    amount: 150,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeId: recipes[3].id,
    ingredientId: ingredients[7].id,
    amount: 100,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[3].id,
    ingredientId: ingredients[42].id,
    amount: 100,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeId: recipes[3].id,
    ingredientId: ingredients[5].id,
    amount: 3,
    unit: 'pcs',
  }, // Eggs

  // Lemonade
  {
    id: uuidv4(),
    recipeId: recipes[4].id,
    ingredientId: ingredients[35].id,
    amount: 2,
    unit: 'pcs',
  }, // Lemon
  {
    id: uuidv4(),
    recipeId: recipes[4].id,
    ingredientId: ingredients[34].id,
    amount: 3,
    unit: 'tbsp',
  }, // Honey
  {
    id: uuidv4(),
    recipeId: recipes[4].id,
    ingredientId: ingredients[33].id,
    amount: 500,
    unit: 'ml',
  }, // Water
  {
    id: uuidv4(),
    recipeId: recipes[4].id,
    ingredientId: ingredients[36].id,
    amount: 5,
    unit: 'leaves',
  }, // Basil (mint substitute)

  // Grilled Chicken Breast
  {
    id: uuidv4(),
    recipeId: recipes[5].id,
    ingredientId: ingredients[0].id,
    amount: 1,
    unit: 'pcs',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeId: recipes[5].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[5].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeId: recipes[5].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Beef Stir Fry
  {
    id: uuidv4(),
    recipeId: recipes[6].id,
    ingredientId: ingredients[1].id,
    amount: 200,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeId: recipes[6].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeId: recipes[6].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeId: recipes[6].id,
    ingredientId: ingredients[30].id,
    amount: 2,
    unit: 'tbsp',
  }, // Soy Sauce
  {
    id: uuidv4(),
    recipeId: recipes[6].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Pancakes
  {
    id: uuidv4(),
    recipeId: recipes[7].id,
    ingredientId: ingredients[12].id,
    amount: 100,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeId: recipes[7].id,
    ingredientId: ingredients[13].id,
    amount: 50,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeId: recipes[7].id,
    ingredientId: ingredients[5].id,
    amount: 1,
    unit: 'pcs',
  }, // Egg
  { id: uuidv4(), recipeId: recipes[7].id, ingredientId: ingredients[7].id, amount: 20, unit: 'g' }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[7].id,
    ingredientId: ingredients[6].id,
    amount: 100,
    unit: 'ml',
  }, // Milk

  // Chocolate Muffins
  {
    id: uuidv4(),
    recipeId: recipes[8].id,
    ingredientId: ingredients[12].id,
    amount: 150,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeId: recipes[8].id,
    ingredientId: ingredients[13].id,
    amount: 100,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeId: recipes[8].id,
    ingredientId: ingredients[42].id,
    amount: 50,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeId: recipes[8].id,
    ingredientId: ingredients[5].id,
    amount: 1,
    unit: 'pcs',
  }, // Egg
  { id: uuidv4(), recipeId: recipes[8].id, ingredientId: ingredients[7].id, amount: 30, unit: 'g' }, // Butter

  // Greek Salad
  {
    id: uuidv4(),
    recipeId: recipes[9].id,
    ingredientId: ingredients[21].id,
    amount: 1,
    unit: 'pcs',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeId: recipes[9].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeId: recipes[9].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  { id: uuidv4(), recipeId: recipes[9].id, ingredientId: ingredients[8].id, amount: 50, unit: 'g' }, // Cheddar Cheese
  {
    id: uuidv4(),
    recipeId: recipes[9].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Tomato Soup
  {
    id: uuidv4(),
    recipeId: recipes[10].id,
    ingredientId: ingredients[21].id,
    amount: 4,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeId: recipes[10].id,
    ingredientId: ingredients[19].id,
    amount: 2,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeId: recipes[10].id,
    ingredientId: ingredients[20].id,
    amount: 3,
    unit: 'pcs',
  }, // Potato
  {
    id: uuidv4(),
    recipeId: recipes[10].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[10].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Fried Rice
  {
    id: uuidv4(),
    recipeId: recipes[11].id,
    ingredientId: ingredients[40].id,
    amount: 200,
    unit: 'g',
  }, // Rice
  {
    id: uuidv4(),
    recipeId: recipes[11].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeId: recipes[11].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeId: recipes[11].id,
    ingredientId: ingredients[30].id,
    amount: 2,
    unit: 'tbsp',
  }, // Soy Sauce
  {
    id: uuidv4(),
    recipeId: recipes[11].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Omelette
  {
    id: uuidv4(),
    recipeId: recipes[12].id,
    ingredientId: ingredients[5].id,
    amount: 3,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeId: recipes[12].id,
    ingredientId: ingredients[6].id,
    amount: 50,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeId: recipes[12].id,
    ingredientId: ingredients[7].id,
    amount: 20,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[12].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Banana Smoothie
  {
    id: uuidv4(),
    recipeId: recipes[13].id,
    ingredientId: ingredients[44].id,
    amount: 2,
    unit: 'pcs',
  }, // Banana
  {
    id: uuidv4(),
    recipeId: recipes[13].id,
    ingredientId: ingredients[6].id,
    amount: 200,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeId: recipes[13].id,
    ingredientId: ingredients[49].id,
    amount: 100,
    unit: 'g',
  }, // Yogurt
  {
    id: uuidv4(),
    recipeId: recipes[13].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tbsp',
  }, // Honey

  // Shrimp Pasta
  {
    id: uuidv4(),
    recipeId: recipes[14].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeId: recipes[14].id,
    ingredientId: ingredients[4].id,
    amount: 150,
    unit: 'g',
  }, // Shrimp
  {
    id: uuidv4(),
    recipeId: recipes[14].id,
    ingredientId: ingredients[17].id,
    amount: 2,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeId: recipes[14].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Vegetable Stir Fry
  {
    id: uuidv4(),
    recipeId: recipes[15].id,
    ingredientId: ingredients[19].id,
    amount: 1,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeId: recipes[15].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeId: recipes[15].id,
    ingredientId: ingredients[23].id,
    amount: 1,
    unit: 'pcs',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeId: recipes[15].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[15].id,
    ingredientId: ingredients[30].id,
    amount: 1,
    unit: 'tbsp',
  }, // Soy Sauce

  // Apple Pie
  {
    id: uuidv4(),
    recipeId: recipes[16].id,
    ingredientId: ingredients[12].id,
    amount: 250,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeId: recipes[16].id,
    ingredientId: ingredients[13].id,
    amount: 150,
    unit: 'g',
  }, // Sugar
  {
    id: uuidv4(),
    recipeId: recipes[16].id,
    ingredientId: ingredients[7].id,
    amount: 100,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[16].id,
    ingredientId: ingredients[44].id,
    amount: 3,
    unit: 'pcs',
  }, // Apple
  {
    id: uuidv4(),
    recipeId: recipes[16].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs

  // Garlic Bread
  {
    id: uuidv4(),
    recipeId: recipes[17].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'loaf',
  }, // Bread
  {
    id: uuidv4(),
    recipeId: recipes[17].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeId: recipes[17].id,
    ingredientId: ingredients[7].id,
    amount: 50,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[17].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Grilled Salmon
  {
    id: uuidv4(),
    recipeId: recipes[18].id,
    ingredientId: ingredients[3].id,
    amount: 1,
    unit: 'pcs',
  }, // Salmon
  {
    id: uuidv4(),
    recipeId: recipes[18].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[18].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeId: recipes[18].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Chocolate Milkshake
  {
    id: uuidv4(),
    recipeId: recipes[19].id,
    ingredientId: ingredients[6].id,
    amount: 200,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeId: recipes[19].id,
    ingredientId: ingredients[42].id,
    amount: 50,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeId: recipes[19].id,
    ingredientId: ingredients[49].id,
    amount: 50,
    unit: 'g',
  }, // Yogurt
  {
    id: uuidv4(),
    recipeId: recipes[19].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tbsp',
  }, // Honey

  // Chicken Curry
  {
    id: uuidv4(),
    recipeId: recipes[20].id,
    ingredientId: ingredients[0].id,
    amount: 300,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeId: recipes[20].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeId: recipes[20].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeId: recipes[20].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[20].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Beef Burger (1)
  {
    id: uuidv4(),
    recipeId: recipes[21].id,
    ingredientId: ingredients[1].id,
    amount: 200,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeId: recipes[21].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'pcs',
  }, // Bread
  {
    id: uuidv4(),
    recipeId: recipes[21].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[21].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeId: recipes[21].id,
    ingredientId: ingredients[7].id,
    amount: 10,
    unit: 'g',
  }, // Butter

  // Beef Burger (2)
  {
    id: uuidv4(),
    recipeId: recipes[22].id,
    ingredientId: ingredients[1].id,
    amount: 200,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeId: recipes[22].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'pcs',
  }, // Bread
  {
    id: uuidv4(),
    recipeId: recipes[22].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[22].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeId: recipes[22].id,
    ingredientId: ingredients[7].id,
    amount: 10,
    unit: 'g',
  }, // Butter

  // Spaghetti Bolognese
  {
    id: uuidv4(),
    recipeId: recipes[23].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeId: recipes[23].id,
    ingredientId: ingredients[1].id,
    amount: 150,
    unit: 'g',
  }, // Ground Beef
  {
    id: uuidv4(),
    recipeId: recipes[23].id,
    ingredientId: ingredients[17].id,
    amount: 2,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeId: recipes[23].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeId: recipes[23].id,
    ingredientId: ingredients[30].id,
    amount: 2,
    unit: 'tbsp',
  }, // Soy Sauce

  // French Toast
  {
    id: uuidv4(),
    recipeId: recipes[24].id,
    ingredientId: ingredients[43].id,
    amount: 2,
    unit: 'slices',
  }, // Bread
  {
    id: uuidv4(),
    recipeId: recipes[24].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeId: recipes[24].id,
    ingredientId: ingredients[6].id,
    amount: 50,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeId: recipes[24].id,
    ingredientId: ingredients[7].id,
    amount: 10,
    unit: 'g',
  }, // Butter

  // Tuna Salad
  {
    id: uuidv4(),
    recipeId: recipes[25].id,
    ingredientId: ingredients[43].id,
    amount: 50,
    unit: 'g',
  }, // Bread (as croutons)
  {
    id: uuidv4(),
    recipeId: recipes[25].id,
    ingredientId: ingredients[22].id,
    amount: 1,
    unit: 'pcs',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeId: recipes[25].id,
    ingredientId: ingredients[21].id,
    amount: 2,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeId: recipes[25].id,
    ingredientId: ingredients[1].id,
    amount: 100,
    unit: 'g',
  }, // Ground Beef (optional protein substitute)
  {
    id: uuidv4(),
    recipeId: recipes[25].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tbsp',
  }, // Honey (dressing touch)

  // Mushroom Risotto
  {
    id: uuidv4(),
    recipeId: recipes[26].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Rice
  {
    id: uuidv4(),
    recipeId: recipes[26].id,
    ingredientId: ingredients[26].id,
    amount: 150,
    unit: 'g',
  }, // Mushrooms
  {
    id: uuidv4(),
    recipeId: recipes[26].id,
    ingredientId: ingredients[12].id,
    amount: 50,
    unit: 'g',
  }, // Flour (optional thickener)
  {
    id: uuidv4(),
    recipeId: recipes[26].id,
    ingredientId: ingredients[11].id,
    amount: 100,
    unit: 'ml',
  }, // Cream
  {
    id: uuidv4(),
    recipeId: recipes[26].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil

  // Chicken Nuggets
  {
    id: uuidv4(),
    recipeId: recipes[27].id,
    ingredientId: ingredients[0].id,
    amount: 250,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeId: recipes[27].id,
    ingredientId: ingredients[12].id,
    amount: 100,
    unit: 'g',
  }, // Flour
  {
    id: uuidv4(),
    recipeId: recipes[27].id,
    ingredientId: ingredients[7].id,
    amount: 50,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[27].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[27].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper

  // Berry Smoothie
  {
    id: uuidv4(),
    recipeId: recipes[28].id,
    ingredientId: ingredients[46].id,
    amount: 50,
    unit: 'g',
  }, // Blueberries
  {
    id: uuidv4(),
    recipeId: recipes[28].id,
    ingredientId: ingredients[44].id,
    amount: 1,
    unit: 'pcs',
  }, // Banana
  {
    id: uuidv4(),
    recipeId: recipes[28].id,
    ingredientId: ingredients[6].id,
    amount: 200,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeId: recipes[28].id,
    ingredientId: ingredients[49].id,
    amount: 50,
    unit: 'g',
  }, // Yogurt

  // Roasted Potatoes
  {
    id: uuidv4(),
    recipeId: recipes[29].id,
    ingredientId: ingredients[20].id,
    amount: 4,
    unit: 'pcs',
  }, // Potato
  {
    id: uuidv4(),
    recipeId: recipes[29].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[29].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[29].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper

  // Garlic Shrimp
  {
    id: uuidv4(),
    recipeId: recipes[30].id,
    ingredientId: ingredients[4].id,
    amount: 200,
    unit: 'g',
  }, // Shrimp
  {
    id: uuidv4(),
    recipeId: recipes[30].id,
    ingredientId: ingredients[17].id,
    amount: 3,
    unit: 'cloves',
  }, // Garlic
  {
    id: uuidv4(),
    recipeId: recipes[30].id,
    ingredientId: ingredients[7].id,
    amount: 15,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[30].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[30].id,
    ingredientId: ingredients[15].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Black Pepper

  // Pork Chops
  {
    id: uuidv4(),
    recipeId: recipes[31].id,
    ingredientId: ingredients[2].id,
    amount: 250,
    unit: 'g',
  }, // Pork
  {
    id: uuidv4(),
    recipeId: recipes[31].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[31].id,
    ingredientId: ingredients[15].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Black Pepper
  {
    id: uuidv4(),
    recipeId: recipes[31].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil

  // Veggie Wrap
  {
    id: uuidv4(),
    recipeId: recipes[32].id,
    ingredientId: ingredients[23].id,
    amount: 50,
    unit: 'g',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeId: recipes[32].id,
    ingredientId: ingredients[24].id,
    amount: 50,
    unit: 'g',
  }, // Cucumber
  {
    id: uuidv4(),
    recipeId: recipes[32].id,
    ingredientId: ingredients[25].id,
    amount: 50,
    unit: 'g',
  }, // Bell Pepper
  {
    id: uuidv4(),
    recipeId: recipes[32].id,
    ingredientId: ingredients[43].id,
    amount: 1,
    unit: 'pcs',
  }, // Bread (wrap)
  {
    id: uuidv4(),
    recipeId: recipes[32].id,
    ingredientId: ingredients[34].id,
    amount: 1,
    unit: 'tsp',
  }, // Honey (dressing)

  // Chicken Alfredo
  {
    id: uuidv4(),
    recipeId: recipes[33].id,
    ingredientId: ingredients[0].id,
    amount: 200,
    unit: 'g',
  }, // Chicken Breast
  {
    id: uuidv4(),
    recipeId: recipes[33].id,
    ingredientId: ingredients[41].id,
    amount: 200,
    unit: 'g',
  }, // Pasta
  {
    id: uuidv4(),
    recipeId: recipes[33].id,
    ingredientId: ingredients[11].id,
    amount: 100,
    unit: 'ml',
  }, // Cream
  {
    id: uuidv4(),
    recipeId: recipes[33].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[33].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // Egg Salad
  {
    id: uuidv4(),
    recipeId: recipes[34].id,
    ingredientId: ingredients[5].id,
    amount: 3,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeId: recipes[34].id,
    ingredientId: ingredients[21].id,
    amount: 1,
    unit: 'pcs',
  }, // Tomato
  {
    id: uuidv4(),
    recipeId: recipes[34].id,
    ingredientId: ingredients[23].id,
    amount: 30,
    unit: 'g',
  }, // Lettuce
  {
    id: uuidv4(),
    recipeId: recipes[34].id,
    ingredientId: ingredients[14].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[34].id,
    ingredientId: ingredients[15].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Black Pepper

  // Lentil Soup
  {
    id: uuidv4(),
    recipeId: recipes[35].id,
    ingredientId: ingredients[41].id,
    amount: 150,
    unit: 'g',
  }, // Rice (optional for thickness)
  {
    id: uuidv4(),
    recipeId: recipes[35].id,
    ingredientId: ingredients[19].id,
    amount: 1,
    unit: 'pcs',
  }, // Carrot
  {
    id: uuidv4(),
    recipeId: recipes[35].id,
    ingredientId: ingredients[18].id,
    amount: 1,
    unit: 'pcs',
  }, // Onion
  {
    id: uuidv4(),
    recipeId: recipes[35].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[35].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt

  // BBQ Ribs
  {
    id: uuidv4(),
    recipeId: recipes[36].id,
    ingredientId: ingredients[2].id,
    amount: 500,
    unit: 'g',
  }, // Pork
  {
    id: uuidv4(),
    recipeId: recipes[36].id,
    ingredientId: ingredients[34].id,
    amount: 2,
    unit: 'tbsp',
  }, // Honey (sauce)
  {
    id: uuidv4(),
    recipeId: recipes[36].id,
    ingredientId: ingredients[27].id,
    amount: 2,
    unit: 'tbsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[36].id,
    ingredientId: ingredients[14].id,
    amount: 1,
    unit: 'tsp',
  }, // Salt
  {
    id: uuidv4(),
    recipeId: recipes[36].id,
    ingredientId: ingredients[15].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Black Pepper

  // Avocado Toast (1)
  {
    id: uuidv4(),
    recipeId: recipes[37].id,
    ingredientId: ingredients[43].id,
    amount: 2,
    unit: 'slices',
  }, // Bread
  {
    id: uuidv4(),
    recipeId: recipes[37].id,
    ingredientId: ingredients[44].id,
    amount: 1,
    unit: 'pcs',
  }, // Banana (or Avocado if available)
  {
    id: uuidv4(),
    recipeId: recipes[37].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[37].id,
    ingredientId: ingredients[14].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Salt

  // Avocado Toast (2)
  {
    id: uuidv4(),
    recipeId: recipes[38].id,
    ingredientId: ingredients[43].id,
    amount: 2,
    unit: 'slices',
  }, // Bread
  {
    id: uuidv4(),
    recipeId: recipes[38].id,
    ingredientId: ingredients[44].id,
    amount: 1,
    unit: 'pcs',
  }, // Banana (or Avocado)
  {
    id: uuidv4(),
    recipeId: recipes[38].id,
    ingredientId: ingredients[27].id,
    amount: 1,
    unit: 'tsp',
  }, // Olive Oil
  {
    id: uuidv4(),
    recipeId: recipes[38].id,
    ingredientId: ingredients[14].id,
    amount: 0.25,
    unit: 'tsp',
  }, // Salt

  // Chocolate Brownie
  {
    id: uuidv4(),
    recipeId: recipes[39].id,
    ingredientId: ingredients[42].id,
    amount: 100,
    unit: 'g',
  }, // Chocolate
  {
    id: uuidv4(),
    recipeId: recipes[39].id,
    ingredientId: ingredients[6].id,
    amount: 100,
    unit: 'ml',
  }, // Milk
  {
    id: uuidv4(),
    recipeId: recipes[39].id,
    ingredientId: ingredients[5].id,
    amount: 2,
    unit: 'pcs',
  }, // Eggs
  {
    id: uuidv4(),
    recipeId: recipes[39].id,
    ingredientId: ingredients[7].id,
    amount: 50,
    unit: 'g',
  }, // Butter
  {
    id: uuidv4(),
    recipeId: recipes[39].id,
    ingredientId: ingredients[14].id,
    amount: 0.5,
    unit: 'tsp',
  }, // Salt
].map((item) => ({ ...item, id: uuidv4() }));

export let ratingsResult: Rating[] = [];
for (const recipe of recipes) {
  const shuffledAuthorIds = faker.helpers.shuffle(authorsIds);

  const ratingsCount = faker.number.int({ min: 3, max: shuffledAuthorIds.length });

  const recipeRatings = shuffledAuthorIds.slice(0, ratingsCount).map((userId) => ({
    id: uuidv4(),
    userId,
    recipeId: recipe.id,
    value: faker.number.int({ min: 1, max: 5 }),
  }));

  recipe.ratingsCount = ratingsCount;
  recipe.ratingsSum = recipeRatings.reduce((acc, curr) => (acc += curr.value), 0);
  recipe.ratingsAvg = recipe.ratingsSum / ratingsCount;

  ratingsResult = [...ratingsResult, ...recipeRatings];
}

export const ratings: Rating[] = ratingsResult;
