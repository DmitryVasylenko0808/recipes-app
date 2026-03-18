import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { faker } from '@faker-js/faker';
import {
  createAuthor,
  createTag,
  createIngredient,
  createRecipe,
  createRecipeTag,
  createRecipeIngredient,
} from './factories';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

faker.seed(1);

async function main() {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE authors, tags, ingredients, categories, recipes, recipe_tags, recipe_ingredients RESTART IDENTITY CASCADE'
  );

  const authors = await prisma.author.createManyAndReturn({
    data: [
      createAuthor({ passwordHash: '11111111' }),
      createAuthor({ passwordHash: '22222222' }),
      createAuthor({ passwordHash: '33333333' }),
      ...Array.from({ length: 7 }).map(() => createAuthor()),
    ],
  });

  const tags = await prisma.tag.createManyAndReturn({
    data: [...Array.from({ length: 10 }).map(() => createTag())],
    skipDuplicates: true,
  });

  const ingredients = await prisma.ingredient.createManyAndReturn({
    data: [...Array.from({ length: 15 }).map(() => createIngredient())],
    skipDuplicates: true,
  });

  const categoriesArr = [
    'breakfast',
    'salads',
    'soups',
    'appetizers',
    'main-dishes',
    'side-dishes',
    'pasta',
    'pizza',
    'sandwiches',
    'meat-dishes',
    'poultry',
    'fish',
    'seafood',
    'vegetable-dishes',
    'rice-dishes',
    'potato-dishes',
    'baking',
    'desserts',
    'cookies',
    'pancakes',
    'ice-cream',
    'drinks',
    'cocktails',
    'sauces',
    'street-food',
    'vegetarian',
    'vegan',
    'diet',
    'quick-meals',
  ];
  const categories = await prisma.category.createManyAndReturn({
    data: categoriesArr.map((c) => ({ name: c })),
  });

  const recipes = await prisma.recipe.createManyAndReturn({
    data: [
      ...Array.from({ length: 50 }).map(() =>
        createRecipe(faker.helpers.arrayElement(authors), faker.helpers.arrayElement(categories))
      ),
      createRecipe(faker.helpers.arrayElement(authors), faker.helpers.arrayElement(categories), {
        content: `# Veniam in taurorum capacibus

## Rapido nymphae graves sed

Lorem markdownum "ping_web" stupet ripis; radiis ecce. Rupta me ulvaeque,
gradientis erant. Dare meae fortuna, non se non damno magnique praeceps
conatoque arasque lacrimae inquit, iuvenes inde?

- Est cinctaque triformis ferre abruptaque quantumque huius
- Quae est ianua turres Panomphaeo restabas sic
- Orsa cum

## Misisset Nox ait tangit

Labefactaque illis, convicia metuenda ambage in usque soletur,
[annis](#veniam-in-taurorum-capacibus) Bybli culpae bellaque in duxit nisi
tamen! **Fatis tu** quasque fama sine [vel
dignabere](#veniam-in-taurorum-capacibus) tendere haec sacra stimulis *subito
atque* tabula coniunx, deserat? Pumice usa pocula patriam violasse illas
triplicis eburnea prima Sallentinumque aquis. Torrens ramis movens; a portae
acclinia lanas. *Teli* me *tamen* sacra, templisque amantem *mentique canes*,
clamor, et.

- Mihi nato reor non
- Ipsorum penetravit formae
- Donec homines o aureus omnes nec alios
- Non illa
- Vidit et tuae redit adulterium cuspis

Omnia Tyndaridae gurgite timerent, illo verba? Coniugis mecum, coeamus artificem
pennis. Cum **iamque glaebam**. Que causa, et Achille fontes. Cineri in frons,
*contingere* voce pavonibus *ducumque coniuge dolens* se positis
[spectasse](#rapido-nymphae-graves-sed) cubitoque revulsos.
`,
      }),
      createRecipe(faker.helpers.arrayElement(authors), faker.helpers.arrayElement(categories), {
        content: `# Volucri miror adflabat beatam

## Recepto passurae flamina imagine

Lorem markdownum sonat, tunc! Ensem bimembres, iste opibus; magna quod figit
matris credant videbar cuique caecisque.

[Nec in placavit](#ter-est-ad) litore tum potentia, gere bis. Emensas avus
territa visaque et mutet *fuit enses* ignes, ubi tamen exstinctum quod.

## Ter est ad

Umbraque deceptus animas obstiterit numero omnesque, pectore ter, [sed
suspicor](#ter-est-ad) Scythiam **aliud tuus** fallacia cum coeperat, *altrice*.
Errat aries senex in Peleus sorores religata caput, suam patientia pedibus
tacitos crudelis posses; facta Phoebo doliturus concidit.

- Subito aequoris pullo gemit moenia pervenit referam
- Corporis ipsa velatae satis
- Herbae esse armis mota domini ubi ne

Tonitribus cum adamanta stupri ut eram deposuit dryades tumidus Achille, peto
nuper *Mavors patulis se*. **Sudor pectine**?
`,
      }),
      createRecipe(faker.helpers.arrayElement(authors), faker.helpers.arrayElement(categories), {
        content: `# Tempora natum quis nec

*Lorem* markdownum carens armis cruor iterum; ire mergis, est flumine si mihi
sedibus est? Pro mihi destinat. Et protinus passa resonare. Chione est manant at
Iovis curae amorem coniecto venerem, frater. Quod ignis "dvd_vdsl" ore enim
totum procul de boves, sol timeam, refers gaudet errabat.

1. Suique et apertos tamque timeri istis repellit
2. Ultima nostri
3. Cur latus satyrique meliore virtute ferinos
4. Rogantum est subde non et
5. Precari vitae ita viderat sentit
6. Hoc auras mille unda

Adulterium bibisset laterumque utrum, indoluit sequatur! Solibus Eurytidae
pinnis corpus.

- Mihi vestes caelestia genus est sorores regia
- Est pernocte decebat foret
- Conlaudat interea rescindere armos
- Ne parte facietque
- Tum falsa mixtaque commeruisse ille
- Aeno novis

Soliti hunc ingenium. Meliora tamen peregit tauri. Cum tutela?
`,
      }),
      createRecipe(faker.helpers.arrayElement(authors), faker.helpers.arrayElement(categories), {
        content: `# Idcirco levis despexitque Tethys

## Regis bello

Lorem markdownum. Huic terra pendebant, me tamen, parentis, tam.

## Ad templis flammas utrumque

Mirantum adiecisset greges est nota qui victum, fit radiare adfecit parte at
ostendens et aquae: dictis. Ad bis breve, maxima magis, dixit 
dicere sine que, pennas inmaduit.

1. Arguit nostra legi est sub latrantibus ad
2. Et dato posse
3. Vires bidentum post quae suam aratro
4. Venientia nitidam
5. Sive est fero silicem mihi leto

## Inpressa fortes mariti Circen

Quondam aciem aut profanus et passu ille **edidit magis**, eris cum Iove.
Trepidans dixit. Quae tunc vidit et primos milite Aeacus latebris relictum,
tuarum cognovit aquas, data et tela solo.

- Exaudi hic rursus quidque liberat Aeacidae repetunt
- Est et defuerunt deum adsiduis inquit caecis
- Ipse solvi ora deos perpetuum tibi mea
`,
      }),
      createRecipe(faker.helpers.arrayElement(authors), faker.helpers.arrayElement(categories), {
        content: `# Non formidine

## Sacer dum sanguine turaque

Lorem markdownum tristique tenebat, postquam Didymeque: orator moenia. Sine
notavi ubi illo poposcit, blanditus ipso et plus. Matura deae incursant,
poposcerit aliis. Quodsi data pabula! Amarunt visus nusquam, cupidisque timore,
umerumque refugam unda suspicere gerit dignare me Stygiis Nasamoniaci pectus
*ultra fatalem*.

> Omnis ductae humus, in metuunt malo! Si quam sanguine,
> vestes, numina quam, suis convexi, alto mea flectunt anno et
> Herses aequora nox rapidus, dextra persequar lapidis
> secuta.

## Aliquid pro quod

Cultu vices quam nepotis; nec obscura abest, iterum? Undaeque
volentes senis tractum cum fecit leves de Graium praecordia nodo! Vel serpente,
quantum cura aura non volucres pars munera, Iris augebat Paris? Titulum ut loci
adfligi tellus detrusum, in est ignibus, est. Mei abnuit quae nota *plangore
Alcyone* ignarus sacrata rursusque.

Solvit ortus erat, nebulas corporis honore? In dura: dea quantum, recessu inquit
omnibus leges, aliquo missa, aurum. *Res monstra et* gaudia iam notas te sociae,
ex illa Pelia sidera et signa et. Illi ut legit utrumque ter mihi, in pictam
fuit. Subito ostendisse est inputet, cervix et arvum praestant arbitrio es
correptus cumque.

## Tenet adloquitur dicere quod

Lingua dextera capit cor locuta [exercet ilice](#sacer-dum-sanguine-turaque)
stirpe, [non](#non-formidine) clamore hunc. Reccidimus iecit; et exemit
moriensque in domum ruborem vult? Ore nec
omnibus succedit, ceu Stheneleia excita pectora ingeniis auctor; nemorum et
passuque placet. Collige derecti ego facta Bacchus. Quam mulcendaque divorum
procerum Vasta et fixo quoque coepta *horriferamque videndi copia* adfatur
fregit parensque contra.`,
      }),
    ],
  });

  const recipeTags = await prisma.recipeTag.createMany({
    data: [...Array.from({ length: 120 }).map(() => createRecipeTag(recipes, tags))],
    skipDuplicates: true,
  });

  const recipeIngredients = await prisma.recipeIngredient.createManyAndReturn({
    data: [
      ...Array.from({ length: 220 }).map(() =>
        createRecipeIngredient(
          faker.helpers.arrayElement(recipes.map((r) => r.id)),
          faker.helpers.arrayElement(ingredients.map((i) => i.id))
        )
      ),
    ],
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
