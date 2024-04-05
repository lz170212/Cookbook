import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import Filter from '../components/Filter'
import { useLocation, useParams } from 'react-router-dom';

// const recipes = [ 
//   {
//     name: 'Crispy Salt and Pepper Potatoes',
//     ingredients: ['2 large egg whites', '1 pound new potatoes (about 1 inch in diameter)', '2 teaspoons kosher salt', '¾ teaspoon finely ground black pepper', '1 teaspoon finely chopped rosemary', '1 teaspoon finely chopped thyme', '1 teaspoon finely chopped parsley'],
//     instructions: [
//       'Preheat oven to 400°F and line a rimmed baking sheet with parchment.', 
//       'In a large bowl, whisk the egg whites until foamy (there shouldn\'t be any liquid whites in the bowl).', 
//       'Add the potatoes and toss until they are well coated with the egg whites, then transfer to a strainer or colander and let the excess whites drain.', 
//       'Season the potatoes with the salt, pepper, and herbs.', 
//       'Scatter the potatoes on the baking sheet (make sure they/’re not touching) and roast until the potatoes are very crispy and tender when poked with a knife, 15 to 20 minutes (depending on the size of the potatoes).', 
//       'Transfer to a bowl and serve.'
//     ],
//     image: 'crispy-salt-and-pepper-potatoes-dan-kluger',
//     author: ''
//   },
//   {
//     name: 'Miso-Squash Ramen',
//     ingredients: ['1 Tbsp. extra-virgin olive oil', '1 Tbsp. white miso', '2 tsp. pure maple syrup or brown sugar', '1 tsp. regular soy sauce or tamari', '1 small kabocha squash (about 2 lb.), peeled, cut into 1"-thick wedges, or 1 small butternut squash (about 2 lb.), peeled, cut into 1" pieces', '1 Tbsp. extra-virgin olive oil', '1 (1") piece ginger, coarsely chopped', '2 garlic cloves, coarsely chopped', '4 cups low-sodium vegetable broth', '2 Tbsp. white miso', 'Kosher salt, freshly ground pepper', '1 large bunch broccolini (8–10 oz.), halved crosswise, thicker stalks halved lengthwise', '4 (5-oz.) packages wavy ramen noodles, preferably fresh', 'Handful of cilantro leaves with tender stems'],
//     instructions: [
//       'Preheat oven to 400°F. Whisk oil, miso, maple syrup, and soy sauce in a small bowl until a thick paste forms.', 
//       'Place squash on a rimmed baking sheet and scrape dressing over, toss to coat.', 
//       'Arrange squash in a single layer and roast until fork-tender (it will be a little caramelized in spots), 25 to 30 minutes.', 
//       'Heat oil in a medium pot over medium-high. Add ginger and garlic and cook, stirring, 1 minute. Add broth and bring to a boil.', 
//       'Remove from heat. Set 8 roasted squash wedges (or about 2 cups if using butternut) aside for serving.', 
//       'Add miso and remaining squash to pot and blend with an immersion blender until mostly smooth; season with salt and pepper.', 
//       '(Alternatively, you can let broth cool slightly, then purée with sqush and miso in a regular blender.)', 
//       'Meanwhile, bring a large pot of salted water to the boil and cook broccolini until crisp-tender, about 3 minutes. Using tongs, transfer to a plate.',
//       'Add noodles to same pot and cook according to packet directions. Drain and divide noodles among bowls.',
//       'Ladle broth over noodles and arrange broccolini and reserved squash (cut in half if they are very big) on top. Scatter cilantro over.'
//   ],   
//     image: 'miso-squash-ramen-hetty-mckinnon',
//     author: ''
//   },
//   {
//     name: 'Yogurt and Spice Roasted Salmon',
//     ingredients: ['500g skinless salmon fillet, cut into 4cm cubes', '4 tablespoons Greek yogurt', '1 tablespoon garlic granules', '1 heaped tablespoon rose harissa', '1 teaspoon ground turmeric', '1 teaspoon paprika', 'Finely grated zest of 1 unwaxed lime and a good squeeze of juice', '1 teaspoon olive oil', 'Generous amount of Maldon sea salt flakes and freshly ground black pepper', 'Tortilla wraps', 'Sliced tomatoes', 'Finely sliced onion', 'Coriander leaves', 'Greek yogurt'],
//     instructions: [
//       'Preheat your oven to its highest setting (with fan if it has one). Line a baking tray with baking paper.',
//       'Mix all the marinade ingredients together in a mixing bowl. Add the salmon and turn until well coated in the marinade.',
//       'Spread the salmon out on the prepared baking tray and roast for 10 minutes until cooked through.',
//       'Remove from the oven and serve immediately with tortilla wraps, tomatoes, finely sliced onion, coriander leaves and Greek yogurt.'
//     ],    
//     image: 'easy-yogurt-and-spice-roasted-salmon-sabrina-ghayour',
//     author: ''
//   },
//   {
//     name: 'Hummus with Spiced Summer Squash and Lamb',
//     ingredients: ['1 medium sweet potato, baked until tender, skin removed, and mashed (about 3/4 cup)', '1 cup rolled oats', '1 cup unsweetened almond, coconut, or cashew milk', '2 eggs or egg replacer equivalent', '3 tablespoons unsweetened almond butter', '1 tablespoon flax meal', '2 teaspoons baking powder', '1 teaspoon pure vanilla extract', '1 teaspoon ground cinnamon', 'Zest of 1 medium clementine', 'Pinch of ground cardamom', 'Pinch of ground nutmeg', '½ cup chopped pecans, plus more for topping', 'Olive oil cooking spray', 'Maple syrup', 'for serving (optional)'],
//     instructions: [
//       'Process chickpeas in a food processor until powdery clumps form, about 30 seconds.',
//       'Add garlic, tahini, lemon juice, and salt and process until smooth. With motor running, drizzle in 1/2 cup water and process until hummus is very smooth, light, and creamy.',
//       'Spoon onto a large plate. Mix together salt, coriander, cumin, and red pepper flakes (if using) in a small bowl.', 
//       'Heat 1 Tbsp. oil in a large skillet over medium-high. Add lamb and press into a large 1 1/4"-thick patty; sprinkle with half of spice mixture and half of garlic. Cook, without moving, until browned and crisp, about 5 minutes.',
//       'Turn over in pieces and cook until other side is browned and crisp, about 3 minutes. Continue to cook, breaking up and stirring, until cooked through, about 2 minutes longer.', 
//       'Using a slotted spoon, scoop lamb over hummus. Pour out and discard fat and wipe out skillet.',
//       'Heat 1 Tbsp. oil over high. Cook squash in a single layer, undisturbed, until browned, about 4 minutes.',
//       'Sprinkle with remaining spice mixture and garlic and cook, stirring, until squash is coated and cooked through, about 3 minutes.',
//       'Spoon squash over lamb. Drizzle with more oil and top with herbs. Serve with pita.'
//   ],    
//     image: 'hummus-bowls-with-spiced-summer-squash-and-ground-lamb',
//     author: ''
//   },
//   {
//     name: 'Soy Sauce Marinated Grilled Flank Steak and Scallions',
//     ingredients: ['3 Tbsp. extra-virgin olive oil, divided, plus more for grill', '1 1/2 lb. flank steak', 'Kosher salt, freshly ground pepper', '1 bunch scallions, trimmed', '1/4 cup mirin (sweet Japanese rice wine)', '1/4 cup soy sauce', '2 Tbsp. light brown sugar', '1 Tbsp. distilled white vinegar', '1 Tbsp. Sriracha', '2 tsp. toasted sesame oil', 'Toasted sesame seeds (for serving)'],
//     instructions: [
//       'Prepare a grill for medium-high heat; lightly oil grate. Pat steak dry and place on a rimmed baking sheet.',
//       'Lightly score both sides of steak with the tip of a paring knife, making shallow parallel cuts (no deeper than an 1/8") about 1" apart and running across the grain of the meat (this will prevent the steak from curling as it cooks).', 
//       'Season generously all over with salt and pepper; let sit at room temperature at least 30 minutes and up to 1 hour. Meanwhile, toss scallions on another baking sheet with 2 Tbsp. olive oil to coat; season with salt and pepper.',
//       'Whisk mirin, soy sauce, brown sugar, vinegar, Sriracha, and sesame oil in a medium bowl until sugar is dissolved; set marinade aside.',
//       'Pat steak dry again (the salt will have drawn out more moisture) and rub with remaining 1 Tbsp. olive oil. Grill scallions, turning often, until tender and charred in spots, about 1 minute.', 
//       'Return to baking sheet. Grill steak, turning every 2 minutes or so, until medium-rare, 6 to 8 minutes. Transfer to a cutting board and let rest 10 to 15 minutes.',
//       'Thinly slice steak crosswise and arrange on a rimmed platter; drizzle all of the juices that have collected on the cutting board over. Arrange grilled scallions on top of the steak, then pour reserved marinade over.', 
//       'Let sit at least 15 minutes and up to 1 hour before serving. To serve, sprinkle with sesame seeds as desired.'
//     ],    
//     image: 'soy-sauce-marinated-grilled-flank-steak-and-scallions',
//     author: ''
//   },
//   {
//     name: 'Scallop Rice Bowls With Crunchy Spice Oil',
//     ingredients: ['1 lb. dry sea scallops, side muscles removed', '1 tsp. kosher salt, divided', '1 tsp. finely grated peeled ginger', '3 Tbsp. vegetable oil, divided', '2 bunches Tuscan kale, ribs and stems removed', '1 avocado, sliced', 'Steamed rice', 'Crunchy Spice Oil', 'lemon wedges (for serving)'],
//     instructions: [
//       'Pat scallops dry, then season on all sides with ½ tsp. salt.',
//       'Heat ginger and 1 Tbsp. oil in a large high-sided skillet or medium Dutch oven over medium until oil is hot.', 
//       'Add kale and ¼ cup water and toss to coat. Cook until kale is wilted and water is evaporated, 5 to 7 minutes. Season with remaining ½ tsp. salt.',
//       'Meanwhile, heat remaining 2 Tbsp oil in large nonstick or cast-iron skillet over medium-high until shimmering.',
//       'Cook scallops until golden brown and firm to the touch, about 3 minutes per side.',
//       'Divide scallops among shallow bowls or plates; arrange kale, avocado, and some rice next to scallops.', 
//       'Drizzle with spice oil and serve with lemons for squeezing over.'
//     ],    
//     image: 'scallop-rice-bowls-with-crunchy-spice-oil',
//     author: ''
//   },
//   {
//     name: 'Persian Celery Stew With Mushrooms (Khoresh-e Karafs)',
//     ingredients: ['½ cup (120ml) olive oil', '1 ½ lb (675g) cremini mushrooms, cleaned and thickly sliced', '1 bunch (8 stalks) celery, washed and julienned (¼ inch/6mm-by-2 inch/5cm lengths)', '1 medium onion, peeled and thinly sliced', '2 cloves garlic, peeled and thinly sliced', '1 jalapeño pepper, finely chopped or ½ teaspoon red pepper flakes', '2 teaspoons sea salt', '½ teaspoon freshly ground pepper', '3 cups (710ml) water', '½ teaspoon ground saffron threads dissolved in 2 tablespoons water (optional)', '3 tablespoons fresh lime juice', '1 cup (80g) chopped fresh parsley', '½ cup (40g) chopped fresh mint, or 1 tablespoon dried mint', '3 tablespoons dried fenugreek leaves', 'Persian rice for serving (optional)'],
//     instructions: [
//       'Heat the oil in a medium-sized, heavy-bottomed pot over high heat. Add the mushrooms and sauté for 5 minutes. Add the celery, onion, garlic, and jalapeño and sauté for 10 minutes. Add the salt and pepper, and give it a stir.',
//       'Add the water and bring to a boil. Reduce heat to medium, cover, and simmer for 40 minutes.',
//       'Add the saffron, lime juice, parsley, mint, and fenugreek, and give it a stir. Reduce heat to medium-low, cover, and simmer for another 5 minutes or until the celery is tender.',
//       'Adjust seasoning to taste and keep warm until ready to serve.'
//     ],    
//     image: 'persian-celery-stew-with-mushrooms-khoresh-e-karafs',
//     author: ''
//   },
//   {
//     name: 'Green Curry Vinegar Chicken',
//     ingredients: ['8 shallots, peeled, halved if large', '1 lb. green beans, trimmed', '1 cup drained Peppadew peppers in brine, torn in half', '¼ cup white wine vinegar', '2 Tbsp. extra-virgin olive oil', '1 Tbsp. plus ¼ cup store-bought or homemade Thai green curry paste', '3 lb. chicken thighs and/or drumsticks', '2 tsp. kosher salt'],
//     instructions: [
//       'Place a rack in top third of oven; preheat to 425°F.', 
//       'Place shallots, green beans, and peppers in a shallow 3-qt. baking dish.', 
//       'Drizzle with vinegar, oil, and 1 Tbsp. curry paste. Using your hands, toss to combine.',
//       'Season chicken on all sides with salt and rub with remaining ¼ cup curry paste. Nestle chicken pieces, skin side up, into shallot mixture in baking dish.',
//       'Roast, basting chicken with pan juices halfway through, until chicken is cooked through and golden brown on top, 35 to 40 minutes.'
//     ],    
//     image: 'green-curry-vinegar-chicken',
//     author: ''
//   },
//   {
//     name: 'Crispy Tofu With Maple-Soy Glaze',
//     ingredients: ['1 (12-oz.) block firm tofu', '¼ cup low-sodium soy sauce', '3 Tbsp. pure maple syrup', '3 Tbsp. unseasoned rice vinegar', '½ tsp. crushed red pepper flakes', '1 (½") piece ginger, very thinly sliced', '½ cup neutral oil, such as canola or grapeseed', 'Kimchi', 'toasted sesame seeds', 'hijiki', 'daikon', 'sliced scallions', 'and steamed rice (for serving; optional)'],
//     instructions: [
//       'Drain tofu, then sandwich between several layers of kitchen towels to remove excess liquid. Cut into 9 cubes.',
//       'Whisk soy sauce, maple syrup, rice vinegar, red pepper flakes, and ginger in a small bowl.',
//       'Heat oil in a large nonstick skillet over medium-high. When oil is rippling across the surface, carefully add tofu so it doesn\’t splash.', 
//       'Cook, undisturbed, until very crisp and dark brown underneath, 3 to 4 minutes. Carefully turn and repeat on opposite side.',
//       'Holding tofu back with a spatula or slotted spoon, pour out oil into a small bowl.', 
//       'Return skillet to medium-high heat and add soy sauce mixture. Cook, reducing heat to medium so it doesn\’t over-reduce or burn and basting tofu occasionally, until glaze is thick enough to coat a spoon, about 4 minutes.',
//       'Divide tofu among plates. Drizzle with glaze, then top with scallions. Serve with rice alongside.'
//     ],    
//     image: 'crispy-tofu-with-maple-soy-glaze',
//     author: ''
//   },
//   {
//     name: 'Pork Marbella',
//     ingredients: ['2 (1-lb.) pork tenderloins', '2 tsp. kosher salt', '1 cup dry white wine', '½ cup pitted prunes, torn in half', '½ cup pitted Spanish green olives', '⅓ cup (packed) light brown sugar', '¼ cup capers, plus 1 Tbsp. caper brine', '¼ cup red wine vinegar', '4 garlic cloves, peeled, smashed', '1 Tbsp. dried oregano', '¼ cup plus 1 Tbsp. extra-virgin olive oil', '1 Tbsp. unsalted butter', '¼ cup chopped parsley (optional)'],
//     instructions: [
//       'Season pork with salt. Let sit 15 minutes.',
//       'Meanwhile, mix wine, prunes, olives, brown sugar, capers and brine, vinegar, garlic, oregano, and ¼ cup oil in a medium bowl to combine; set sauce aside (or use it to marinate pork up to 12 hours).',
//       'Place a rack in center of oven; preheat to 325°F. Heat remaining 1 Tbsp. oil in a large ovenproof skillet over medium-high. Cook pork, turning occasionally, until golden brown all over, 6 to 8 minutes.',
//       'Remove skillet from heat and let sit 1 minute so pan can cool down a bit. Pour reserved sauce over pork and give pan a few shakes. Transfer to oven and roast pork, basting with sauce halfway through, until an instant-read thermometer inserted into the thickest part of tenderloin registers 145°F, 22 to 26 minutes, depending on the thickness of the meat.', 
//       'Transfer pork to a cutting board and let rest 10 minutes.',    
//       'Return pan to medium-high heat. Add butter to sauce and cook, swirling pan occasionally, until butter is melted and sauce is slightly reduced, 3–5 minutes. Stir in parsley if using.',
//       'Slice tenderloin crosswise against the grain. Transfer to a platter and spoon pan sauce over.'
//     ],    
//     image: 'pork-marbella',
//     author: ''
//   }
// ]

export default function Home() {

  console.log("enter home page"+ window.location.search);
  const [ recipes, setRecipes ] = useState(null)
  const [filterOptions, setFilterOptions] = useState({
    highlights: [],
    cookingTime: '',
    sort: 'createdAt',
  });

  const location = useLocation();
  useEffect(()=>{
    console.log(location.search);
    //user change url directly
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearchTerm = urlParams.get('searchTerm');
    const urlHighlight = urlParams.get('highlight');
    const urlCookingTime = urlParams.get('cookingTime');
    const urlSort = urlParams.get('sort');
    if(urlSearchTerm || urlHighlight || urlCookingTime || urlSort){ // at least one of them not null
      //1. set filter UI
      setFilterOptions({
        highlights:urlHighlight,
        cookingTime: urlCookingTime,
        sort: urlSort,
      })
      //2. fetch result from database
      const fetchSearchedRecipes = async ()=>{
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/recipe/search-recipe?${searchQuery}`);
        const recipes = await res.json();
        console.log(recipes);
        setRecipes(recipes);
      }
      
      fetchSearchedRecipes();
    }
  },[location.search])
  
  const fetchRecipes = async () => {
    try {
      const res = await fetch('/api/recipe/get', {
          method: 'GET'})

      const { data } = await res.json();

      setRecipes(data)

    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    if(recipes === null){
        fetchRecipes({})
    }
  }, [])

  return (
    <div className='flex flex-col md:flex-row'>
    <Filter filter={filterOptions} setFilter ={setFilterOptions}></Filter>
    <div className='py-5 px-[5vw] md:px-[7vw] lg:px-[10vw] gap-5 flex flex-wrap'>
      {console.log(recipes)}
      {
        
        recipes ? 
        recipes.map((recipe, i) => {
          return <RecipeCard  key={i} recipe={recipe}/>
        })
        : ""
      }
    </div>
    </div>
  )
}
 