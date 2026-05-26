/**
 * Listening Tests — Uses browser SpeechSynthesis to "read aloud" the text.
 * 30 per level: Basic (1 sentence) | Intermediate (2-3 sentences) | Advanced (4-5 sentences).
 */
import type { Level } from './readingData';

export interface ListeningTest {
  id: number;
  text: string;
  question: string;
  options: string[];
  correct: number;
}

export const listeningBasic: ListeningTest[] = [
  { id: 1,  text: 'The dog is running fast in the park.', question: 'What is the dog doing?', options: ['Sleeping', 'Running', 'Eating', 'Barking'], correct: 1 },
  { id: 2,  text: 'My mother gave me a red apple.', question: 'What colour was the apple?', options: ['Green', 'Red', 'Yellow', 'Blue'], correct: 1 },
  { id: 3,  text: 'The bird is flying high in the blue sky.', question: 'Where is the bird?', options: ['Ground', 'In the sky', 'In water', 'On tree'], correct: 1 },
  { id: 4,  text: 'I have two blue pencils in my pencil box.', question: 'How many pencils?', options: ['One', 'Two', 'Three', 'Four'], correct: 1 },
  { id: 5,  text: 'The little boy is reading a story book.', question: 'What is the boy doing?', options: ['Writing', 'Reading', 'Playing', 'Drawing'], correct: 1 },
  { id: 6,  text: 'My sister loves to eat chocolate ice cream.', question: 'What does sister love?', options: ['Cake', 'Ice cream', 'Sweets', 'Fruits'], correct: 1 },
  { id: 7,  text: 'The shiny new car is red and very fast.', question: 'What colour is the car?', options: ['Blue', 'Red', 'Black', 'White'], correct: 1 },
  { id: 8,  text: 'We are going to the park tomorrow morning.', question: 'When are we going?', options: ['Today', 'Tomorrow morning', 'Tonight', 'Next week'], correct: 1 },
  { id: 9,  text: 'The baby is sleeping quietly on the bed.', question: 'How is the baby?', options: ['Crying', 'Sleeping', 'Playing', 'Eating'], correct: 1 },
  { id: 10, text: 'There are seven yellow flowers in the vase.', question: 'How many flowers?', options: ['Five', 'Six', 'Seven', 'Eight'], correct: 2 },
  { id: 11, text: 'The cat is sitting on the mat.', question: 'Where is the cat?', options: ['On the mat', 'Under the chair', 'On the table', 'In the box'], correct: 0 },
  { id: 12, text: 'I brush my teeth every morning.', question: 'When do I brush?', options: ['Night', 'Morning', 'Afternoon', 'Evening'], correct: 1 },
  { id: 13, text: 'My favourite fruit is mango.', question: 'My favourite fruit?', options: ['Apple', 'Mango', 'Banana', 'Grape'], correct: 1 },
  { id: 14, text: 'The fish swims in the pond.', question: 'Where does the fish swim?', options: ['Sea', 'River', 'Pond', 'Pool'], correct: 2 },
  { id: 15, text: 'My grandfather is wearing white clothes.', question: 'Who is wearing white?', options: ['Father', 'Brother', 'Grandfather', 'Uncle'], correct: 2 },
  { id: 16, text: 'The cow gives us milk every day.', question: 'What does the cow give?', options: ['Eggs', 'Milk', 'Wool', 'Honey'], correct: 1 },
  { id: 17, text: 'I draw beautiful pictures with my crayons.', question: 'What do I draw with?', options: ['Pencils', 'Crayons', 'Pens', 'Markers'], correct: 1 },
  { id: 18, text: 'The red balloon is flying very high.', question: 'How high is the balloon?', options: ['Low', 'Very high', 'Medium', 'On ground'], correct: 1 },
  { id: 19, text: 'My uncle drives a big truck.', question: 'What does uncle drive?', options: ['Car', 'Truck', 'Bus', 'Bike'], correct: 1 },
  { id: 20, text: 'I love eating warm soup in winter.', question: 'When do I love soup?', options: ['Summer', 'Winter', 'Spring', 'Rain'], correct: 1 },
  { id: 21, text: 'There is a butterfly on the rose.', question: 'Where is the butterfly?', options: ['Leaf', 'Rose', 'Stem', 'Ground'], correct: 1 },
  { id: 22, text: 'The clock shows three o clock.', question: 'What time is it?', options: ['Two', 'Three', 'Four', 'Five'], correct: 1 },
  { id: 23, text: 'My friend wears a green shirt today.', question: 'What colour shirt?', options: ['Blue', 'Red', 'Green', 'Yellow'], correct: 2 },
  { id: 24, text: 'The hen has laid six eggs.', question: 'How many eggs?', options: ['Four', 'Five', 'Six', 'Seven'], correct: 2 },
  { id: 25, text: 'My teacher reads me a lovely poem.', question: 'What does teacher read?', options: ['Story', 'Poem', 'News', 'Book'], correct: 1 },
  { id: 26, text: 'The duck quacks loudly in the morning.', question: 'When does duck quack?', options: ['Night', 'Morning', 'Noon', 'Evening'], correct: 1 },
  { id: 27, text: 'I pack my school bag every night.', question: 'When do I pack?', options: ['Morning', 'Night', 'Afternoon', 'Evening'], correct: 1 },
  { id: 28, text: 'My mother bakes tasty cookies on Sundays.', question: 'When does mother bake?', options: ['Mondays', 'Sundays', 'Fridays', 'Daily'], correct: 1 },
  { id: 29, text: 'There are five birds on the tree branch.', question: 'How many birds?', options: ['Three', 'Four', 'Five', 'Six'], correct: 2 },
  { id: 30, text: 'I share my chocolate with my best friend.', question: 'What do I share?', options: ['Books', 'Chocolate', 'Toys', 'Lunch'], correct: 1 },
];

export const listeningIntermediate: ListeningTest[] = [
  { id: 1, text: 'Yesterday Sarah went to the market with her mother. She bought apples and oranges.', question: 'What did Sarah buy?', options: ['Bananas', 'Apples and oranges', 'Only apples', 'Grapes'], correct: 1 },
  { id: 2, text: 'The school library is closed on Sundays. It opens at nine in the morning on weekdays.', question: 'When is the library closed?', options: ['Mondays', 'Saturdays', 'Sundays', 'Wednesdays'], correct: 2 },
  { id: 3, text: 'Rahul\'s father is a doctor. He works at the city hospital from morning to evening.', question: 'What does father do?', options: ['Teacher', 'Doctor', 'Engineer', 'Pilot'], correct: 1 },
  { id: 4, text: 'The express train to Delhi leaves at five in the evening from platform three.', question: 'What time?', options: ['4 PM', '5 PM', '6 PM', '7 PM'], correct: 1 },
  { id: 5, text: 'Grandmother told me a wonderful story about a clever fox and a foolish crow.', question: 'About?', options: ['Lion and mouse', 'Fox and crow', 'Cat and dog', 'Bear and rabbit'], correct: 1 },
  { id: 6, text: 'The weather is very cold today. Wear your woollen sweater before going outside.', question: 'What to wear?', options: ['Cotton shirt', 'Woollen sweater', 'Raincoat', 'Cap'], correct: 1 },
  { id: 7, text: 'Neha scored ninety-five marks in mathematics and eighty-eight in science this term.', question: 'Science marks?', options: ['95', '88', '90', '85'], correct: 1 },
  { id: 8, text: 'Our school picnic is on Saturday. We are going to the city zoo with our class teacher.', question: 'Where?', options: ['Park', 'Beach', 'Zoo', 'Museum'], correct: 2 },
  { id: 9, text: 'My elder brother wants to become a pilot. He loves flying planes and travelling.', question: 'Brother\'s dream?', options: ['Driver', 'Pilot', 'Captain', 'Engineer'], correct: 1 },
  { id: 10, text: 'The new movie starts at seven this evening. Let us meet at the theatre at six thirty.', question: 'Meet when?', options: ['7:00 PM', '6:30 PM', '6:00 PM', '7:30 PM'], correct: 1 },
  { id: 11, text: 'Last summer we visited Shimla. It was cool and surrounded by tall mountains.', question: 'Where did we visit?', options: ['Goa', 'Shimla', 'Manali', 'Delhi'], correct: 1 },
  { id: 12, text: 'My cousin plays the violin beautifully. She practices for two hours every day.', question: 'How long does she practice?', options: ['One hour', 'Two hours', 'Three hours', 'Four hours'], correct: 1 },
  { id: 13, text: 'The bakery near our house makes the best chocolate cake in the entire city.', question: 'What does it make best?', options: ['Bread', 'Chocolate cake', 'Pizza', 'Cookies'], correct: 1 },
  { id: 14, text: 'I read three books last month. My favourite was a mystery about a missing diamond.', question: 'Number of books read?', options: ['Two', 'Three', 'Four', 'Five'], correct: 1 },
  { id: 15, text: 'Father planted a mango tree in our backyard ten years ago. Now it gives sweet fruits.', question: 'When was it planted?', options: ['5 years ago', '10 years ago', '15 years ago', '20 years ago'], correct: 1 },
  { id: 16, text: 'My friend has been to Japan twice. He loves their food and culture.', question: 'How many times to Japan?', options: ['Once', 'Twice', 'Thrice', 'Never'], correct: 1 },
  { id: 17, text: 'The football match on Saturday was thrilling. Our school won by two goals.', question: 'How did we win?', options: ['By one goal', 'By two goals', 'By three goals', 'Lost'], correct: 1 },
  { id: 18, text: 'Aunt Maya is a famous painter. Her exhibition opens next Friday at the museum.', question: 'When does exhibition open?', options: ['Tuesday', 'Thursday', 'Friday', 'Saturday'], correct: 2 },
  { id: 19, text: 'I forgot my umbrella at school yesterday. It was raining heavily when I left.', question: 'What did I forget?', options: ['Bag', 'Umbrella', 'Books', 'Lunch'], correct: 1 },
  { id: 20, text: 'The science exhibition will be held in our school next month. Students will display their projects.', question: 'What will students do?', options: ['Watch movies', 'Display projects', 'Sing songs', 'Play games'], correct: 1 },
  { id: 21, text: 'Riya\'s birthday party was wonderful. We danced and ate delicious food until late evening.', question: 'How was the party?', options: ['Boring', 'Wonderful', 'Cancelled', 'Short'], correct: 1 },
  { id: 22, text: 'The bus stops at the corner near the post office. It comes every fifteen minutes.', question: 'How often does the bus come?', options: ['10 min', '15 min', '20 min', '30 min'], correct: 1 },
  { id: 23, text: 'My grandmother makes the best laddoos for festivals. She has been making them for forty years.', question: 'How long has she been making them?', options: ['20 years', '30 years', '40 years', '50 years'], correct: 2 },
  { id: 24, text: 'The school bus driver is friendly. He always greets us with a warm smile in the morning.', question: 'How does the driver greet us?', options: ['Silently', 'With a warm smile', 'Angrily', 'With a bow'], correct: 1 },
  { id: 25, text: 'I want to be a scientist when I grow up. I love doing experiments and discovering new things.', question: 'What do I want to be?', options: ['Doctor', 'Scientist', 'Teacher', 'Engineer'], correct: 1 },
  { id: 26, text: 'The art teacher praised my painting yesterday. She said the colours were very bright.', question: 'What did she praise?', options: ['Drawing', 'Painting', 'Sculpture', 'Poem'], correct: 1 },
  { id: 27, text: 'My cousin is visiting us next week from Bangalore. We are very excited to see her.', question: 'Where is cousin from?', options: ['Mumbai', 'Bangalore', 'Chennai', 'Pune'], correct: 1 },
  { id: 28, text: 'The cricket match between India and Australia starts at three in the afternoon.', question: 'When does match start?', options: ['2 PM', '3 PM', '4 PM', '5 PM'], correct: 1 },
  { id: 29, text: 'Last weekend I helped my mother clean the entire house. We washed curtains and dusted shelves.', question: 'What did I help with?', options: ['Cooking', 'Cleaning', 'Shopping', 'Gardening'], correct: 1 },
  { id: 30, text: 'The new park near our school has swings, slides, and a big fountain in the middle.', question: 'What is in the middle?', options: ['Swing', 'Slide', 'Fountain', 'Tree'], correct: 2 },
];

export const listeningAdvanced: ListeningTest[] = [
  { id: 1, text: 'Despite the relentless downpour that had been forecast to cancel the match, the players persevered with extraordinary determination. By the seventy-fifth minute the score remained deadlocked. Then, in the dying seconds of injury time, midfielder Raj curled a stunning free-kick into the top corner. The home crowd erupted in disbelief.', question: 'Based on the passage, when did Raj score?', options: ['In the seventy-fifth minute', 'In injury time of the second half', 'In the opening minutes', 'During the half-time break'], correct: 1 },
  { id: 2, text: 'The old fisherman lived alone by the sea. Every morning, he walked the beach collecting shells. One foggy day, he found a sealed bottle with a mysterious message inside.', question: 'What did he find?', options: ['Treasure', 'Sealed bottle with message', 'Boat', 'Pearl'], correct: 1 },
  { id: 3, text: 'Priya was extremely nervous about her first job interview. She practised for hours. When she walked in, she was surprisingly calm. She got the job within a week.', question: 'How did she feel?', options: ['Nervous', 'Calm and confident', 'Scared', 'Tired'], correct: 1 },
  { id: 4, text: 'The scientist spent twenty long years researching a cure. Her hard work paid off when she discovered the breakthrough vaccine. Millions of lives would be saved.', question: 'Discovered?', options: ['Medicine', 'Vaccine', 'Disease', 'Treatment'], correct: 1 },
  { id: 5, text: 'The ancient book was hidden behind the old wooden shelf in the dusty library. It contained forgotten secrets about the lost kingdom. Only the elderly librarian knew its location.', question: 'Who knew?', options: ['King', 'Librarian', 'Student', 'Teacher'], correct: 1 },
  { id: 6, text: 'The river had completely dried up after months without rain. Villagers prayed for water. One stormy night, the clouds finally burst open, and the river flowed again.', question: 'Why dry?', options: ['Pollution', 'No rain for months', 'Dam', 'Animals'], correct: 1 },
  { id: 7, text: 'She slowly opened the old wooden box with trembling hands. Inside was a faded photograph of her grandmother as a young woman. On the back was written Paris 1950.', question: 'Inside the box?', options: ['Jewels', 'Photograph', 'Letters', 'Coins'], correct: 1 },
  { id: 8, text: 'The spaceship landed gently on the dusty red surface of the planet. The brave astronauts stepped out wearing heavy protective suits. They collected rare soil samples.', question: 'Which planet?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], correct: 0 },
  { id: 9, text: 'After the devastating earthquake, the entire town came together to rebuild. Neighbours shared food. Even small children helped clear rubble. It showed the strength of community.', question: 'What did it show?', options: ['Anger', 'Strength of community', 'Fear', 'Helplessness'], correct: 1 },
  { id: 10, text: 'The dedicated artist painted continuously for twelve hours without stopping. She did not eat or sleep until the final brushstroke. A masterpiece stood before her.', question: 'How long?', options: ['8 hours', '10 hours', '12 hours', '24 hours'], correct: 2 },
  { id: 11, text: 'Climate scientists warn that polar ice is melting at an alarming rate. Sea levels are rising. Coastal cities may be flooded within this century if action is not taken.', question: 'Main warning?', options: ['Volcanoes', 'Polar ice melting', 'Earthquakes', 'Pollution only'], correct: 1 },
  { id: 12, text: 'The Indian Space Research Organisation successfully launched a satellite from Sriharikota last Tuesday. The mission will study cyclone patterns in the Indian Ocean.', question: 'Launch location?', options: ['Bangalore', 'Sriharikota', 'Mumbai', 'Delhi'], correct: 1 },
  { id: 13, text: 'In the bustling streets of Old Delhi, the aroma of freshly baked bread and roasted spices filled the air. Vendors called out their prices in the loud morning chaos.', question: 'What filled the air?', options: ['Smoke', 'Bread and spice aroma', 'Music', 'Silence'], correct: 1 },
  { id: 14, text: 'The orphaned elephant calf was rescued from a poacher\'s trap. Caretakers at the sanctuary fed it milk through a giant bottle. It now plays happily with other elephants.', question: 'Who rescued it?', options: ['Hunters', 'Sanctuary caretakers', 'Tourists', 'Soldiers'], correct: 1 },
  { id: 15, text: 'The new high-speed train will connect Mumbai and Ahmedabad in just two hours. The journey currently takes about seven hours by road. Construction is expected to finish next year.', question: 'New time?', options: ['1 hour', '2 hours', '4 hours', '7 hours'], correct: 1 },
  { id: 16, text: 'The mountain trek was challenging but rewarding. We walked for three days through pine forests and crossed icy streams. The view from the summit was breathtaking.', question: 'Duration of trek?', options: ['1 day', '2 days', '3 days', '7 days'], correct: 2 },
  { id: 17, text: 'The novelist worked on her book for almost a decade, writing every morning before sunrise. When it was finally published, it became a bestseller overnight.', question: 'How long did she write?', options: ['1 year', '5 years', 'A decade', '20 years'], correct: 2 },
  { id: 18, text: 'Despite warnings from his coach, the young swimmer competed with a fever. He won the gold medal but collapsed at the podium. He recovered after a week of rest.', question: 'Result of the race?', options: ['Lost', 'Won gold', 'Did not compete', 'Disqualified'], correct: 1 },
  { id: 19, text: 'The remote village had no electricity for years. Volunteers installed solar panels last month. Now children can study at night, and the entire village feels transformed.', question: 'What was installed?', options: ['Generators', 'Solar panels', 'Wind mills', 'Power lines'], correct: 1 },
  { id: 20, text: 'The chess prodigy, only twelve years old, defeated grandmasters twice her age in the national tournament. Her calm focus and brilliant strategy amazed everyone watching.', question: 'Age of the prodigy?', options: ['10', '12', '14', '16'], correct: 1 },
  { id: 21, text: 'A massive forest fire raged across thousands of acres for nearly two weeks. Firefighters from three states worked tirelessly. Heavy rain finally helped extinguish the flames.', question: 'What stopped the fire?', options: ['Wind', 'Heavy rain', 'Firefighters alone', 'It burned out'], correct: 1 },
  { id: 22, text: 'The retired schoolteacher started a free coaching centre for underprivileged children. Within two years, hundreds of students enrolled. Many now attend top colleges.', question: 'Who started it?', options: ['Doctor', 'Retired teacher', 'Politician', 'Businessman'], correct: 1 },
  { id: 23, text: 'A rare blue moon will be visible tonight. The last time this phenomenon occurred was in 2018. Astronomers urge everyone to step outside and witness this celestial event.', question: 'When did it last occur?', options: ['2015', '2018', '2020', '2022'], correct: 1 },
  { id: 24, text: 'The young engineer designed a low-cost water purifier using everyday materials. Her invention won a national award and is now being distributed in remote villages.', question: 'What did she design?', options: ['Solar lamp', 'Water purifier', 'Fan', 'Cooker'], correct: 1 },
  { id: 25, text: 'After months of practice, the school choir performed flawlessly at the international festival. They received a standing ovation that lasted nearly five minutes.', question: 'Length of ovation?', options: ['1 minute', '2 minutes', '5 minutes', '10 minutes'], correct: 2 },
  { id: 26, text: 'The ancient temple, hidden in dense jungle for centuries, was rediscovered by archaeologists last year. Inscriptions on its walls revealed an unknown chapter of history.', question: 'Who rediscovered it?', options: ['Tourists', 'Archaeologists', 'Soldiers', 'Farmers'], correct: 1 },
  { id: 27, text: 'The popular podcast host interviewed Nobel laureates from around the world. Her show reached audiences in over fifty countries. She used the proceeds to fund education for girls.', question: 'How many countries?', options: ['10', '25', 'Over 50', '100'], correct: 2 },
  { id: 28, text: 'A new species of glowing fish was discovered in the deep ocean trenches. Scientists believe it uses bioluminescence to communicate with others in pitch-black depths.', question: 'How does the fish communicate?', options: ['Sound', 'Bioluminescence', 'Touch', 'Chemicals'], correct: 1 },
  { id: 29, text: 'The university launched a satellite designed and built entirely by undergraduate students. It will study weather patterns and transmit data for five years from orbit.', question: 'Who built the satellite?', options: ['Professors', 'Undergraduate students', 'Engineers', 'Foreign experts'], correct: 1 },
  { id: 30, text: 'A small bookstore in Pune refused to close despite e-commerce competition. The owner hosted weekly readings and built a loyal community. It now thrives as a cultural hub.', question: 'How did it survive?', options: ['Sold online', 'Weekly readings and community', 'Cut prices', 'Government help'], correct: 1 },
];

export function getListeningByLevel(level: Level): ListeningTest[] {
  if (level === 'basic') return listeningBasic;
  if (level === 'intermediate') return listeningIntermediate;
  return listeningAdvanced;
}
