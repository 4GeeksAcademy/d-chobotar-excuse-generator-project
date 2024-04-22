/* eslint-disable */
import "bootstrap";
import "./style.css";

var commandHistory = [];
let secretWord;

window.onload = function() {
  let myModal = new bootstrap.Modal(document.getElementById("modal"));
  myModal.show();
  secretWord = highlightLetters();
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  document.getElementById("username").textContent = generateUsername();
  commandHistory = [
    {
      command: "commands: do -chuck | -learn | -help",
      output: "secret: secret secret_word"
    }
  ];

  document.getElementById("help").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("answer").innerHTML = `
    <p class='text-light p-2 border'>
    Usage: <br>
      do -chuck -> to get a fact about chuck norris<br>
      do -learn -> to get a scientific fact lol<br>
      do -help -> to get help<br>
      clear -> to clear the terminal<br>
      secret secret_word -> to get a secret<br>
      And if you want to hack, just hack it!
    </p>
    `;
  });

  document
    .getElementById("terminalInput")
    .addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        let inputValue = this.value;
        let outputValue = resolve(inputValue);
        this.value = "";
        commandHistory.push({ command: inputValue, output: outputValue });
        updateHistoryUI(commandHistory);
      }
    });
};

function generateUsername() {
  const prefixes = ["mega", "ultra", "super", "hyper", "crypto"];
  const adjectives = ["fast", "furious", "slick", "sharp", "dynamic"];
  const nouns = ["hacker", "byte", "script", "linux", "pixel"];
  const funnyLinuxDistros = [
    "ubuntutu",
    "debiandare",
    "fedorafiasco",
    "mintyfresh",
    "archtastic",
    "centoss",
    "redhotredhat",
    "susemoose",
    "slackattack"
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const funnyLinuxDistro =
    funnyLinuxDistros[Math.floor(Math.random() * funnyLinuxDistros.length)];
  return `${prefix}${adjective}${noun}@${funnyLinuxDistro}`;
}

function doClear() {
  console.log("Clearing history, current state:", commandHistory);
  commandHistory = [];
  updateHistoryUI(commandHistory);
  console.log("History after clearing:", commandHistory);
  return "clear completed";
}

function updateHistoryUI(commandHistory) {
  let historyElement = document.getElementById("terminal");
  historyElement.innerHTML = "";
  //let output = '';
  commandHistory.forEach(entry => {
    let commandElement = document.createElement("p");
    commandElement.className = "mb-0";
    commandElement.textContent = ` ~ ${entry.command}`;
    let commandElement2 = document.createElement("p");
    commandElement2.className = "mb-0";
    commandElement2.textContent = ` ~ ${entry.output}`;
    historyElement.append(commandElement, commandElement2);
  });
}

function highlightLetters() {
  let text = `
      In the vast wilderness of the IT world, where "Have you tried turning it
      off and on again?" is more of a mantra than a mere suggestion, one must
      tread carefully. Remember, a wise developer once said, "There are two ways
      to write error-free programs; only the third one works." As you embark on
      the daily adventure of coding, keep in mind that your terminal is not just
      a tool, but a gateway to the digital cosmos. Use your terminal wisely;
      it's more powerful than a double-edged sword. It can debug a forest of
      code with a single command or lead you into a maze of cryptic logs that
      not even "This is fine" memes can comfort. When it feels like you're
      endlessly parsing through the grep vines and sed underbrush in search of
      that elusive bug, don't forget the ancient coder wisdom: "A user interface
      is like a joke. If you have to explain it, it's not that good." And while
      you're at it, always keep a backup plan—because as every IT veteran knows,
      "one does not simply recover lost data without backups." Lastly, always
      remember the golden rule of computing: "To err is human, but to really
      foul things up requires the root password." So, wield your commands with
      care, padawan. May the --force be with you, but never in production!As you
      venture deeper into the labyrinth of lines and libraries, where the glow
      of your screen illuminates truths untold, never underestimate the subtlety
      of a semicolon. It's the butterfly whose wings can cause a monsoon halfway
      across your codebase. Every character you type is a stroke of intention;
      each function, a declaration of purpose. In the realm of ones and zeros,
      where logic reigns supreme, remember that creativity is your greatest
      ally. Innovation doesn't just reside in the vast architectures or
      intricate algorithms, but often in the simplicity of a script that saves
      hours of manual toil. As you craft and curate your digital dominions,
      embrace the philosophy that "less is more." A clean codebase is a
      sanctuary for sanity in the chaotic cacophony of the cyber
      world.Navigating the intricate web of APIs, grappling with the tentacles
      of legacy systems that refuse to relinquish their grip, you may
      occasionally feel like Sisyphus, doomed to push the proverbial boulder up
      an infinite loop. 
    `;

  let words = [
    "function",
    "variable",
    "database",
    "compiler",
    "algorithm",
    "interface",
    "framework",
    "software",
    "hardware",
    "debugging"
  ];

  let position;
  let number = Math.floor(Math.random() * words.length);
  let word = words[number];
  let offset = 0;
  let newText = "";
  let sectionCount = Math.ceil(text.length / word.length);

  for (let i = 0; i < word.length; i++) {
    offset = sectionCount * i;
    console.log("offset: ", offset);
    let section = text.substring(offset, offset + sectionCount);
    console.log("section: ", section);
    console.log("Looking for letter: ", word[i]);
    position = section.toLowerCase().indexOf(word[i].toLowerCase());
    console.log("position: ", position);
    if (position !== -1) {
      console.log("Found: ", word[i]);
      newText += section.substring(0, position);
      console.log("newText: ", newText);
      newText += '<span class="highlight">' + section[position] + "</span>";
      console.log("newText: ", newText);
      newText += section.substring(position + 1);
      console.log("newText: ", newText);
    }
  }
  document.getElementById("bg-text").innerHTML = newText;
  return word;
}

function resolve(command) {
  console.log(`secret ${secretWord}`);
  if (command === `secret ${secretWord}`) {
    return doMotivate();
  }
  switch (command) {
    case "do -chuck":
      return doChuck();
    case "do -learn":
      return doLearn();
    case "do -help":
      return doHelp();
    case "clear":
      return doClear();
    case "hack":
      return `${secretWord}`;
    default:
      return doDefault();
  }
}

function doMotivate() {
  const motivationalMessages = [
    "Congratulations! You've unlocked the secret level. Warning: No actual secrets here, just us telling you you're awesome!",
    "Well done! You cracked the code faster than I microwave popcorn!",
    "You did it! You found the secret word! Sorry, no treasure here, just this cheesy congrats!",
    "Wow, you guessed the code! Are you a wizard or just really good at this? Either way, hats off to you!",
    "Code cracked! You must have cheat codes, or you're just that good. High five!",
    "Secret code status: Found! You're officially too cool for school now (but stay in school, it's important).",
    "Look at you, cracking codes like eggs on a Sunday morning. Well done!",
    "You've discovered the secret word! We'd give you a trophy, but we spent the budget on coffee. Here's a virtual high-five instead!",
    "Congratulations on uncovering the mystery! Be honest, did you peek, or are you just that smart?",
    "Secret word? Solved! You're like the Sherlock Holmes of secret codes. Just more digital. And possibly with better hair."
  ];
  return motivationalMessages[
    Math.floor(Math.random() * motivationalMessages.length)
  ];
}

function doLearn() {
  const scientificConcepts = [
    "Gravity can turn off like a light switch",
    "Water remembers everything it touches",
    "Trees chat through their roots",
    "Every atom is like a tiny world",
    "Black holes are secret doorways to other places",
    "The moon has a hidden side",
    "The sun gets super loud at night",
    "Stars can sing",
    "Molecules have dance parties",
    "Quantum particles love to dance in the dark",
    "Clouds are just floating water",
    "Mountains are really sleepy giants",
    "Volcanoes are the Earth's way of burping",
    "The sky changes colors with its mood",
    "Rain is Earth's way of cleaning up",
    "Thunder is clouds talking loudly",
    "The ocean whispers secrets at night",
    "Sand is just tiny rocks that like to sunbathe",
    "Wind is Earth breathing out",
    "Snowflakes are frozen stars"
  ];

  const fantasticalTwists = [
    "if you know where the switch is.",
    "especially when you talk to it.",
    "telling secrets about the squirrels.",
    "and we're like aliens to them.",
    "but only special keys can open them.",
    "it's super shy!",
    "but only bats can hear it.",
    "and their songs light up the sky.",
    "especially when no one is watching.",
    "they throw glow-stick parties.",
    "and sometimes it likes to rain.",
    "who just stopped walking one day.",
    "and sometimes it gets messy!",
    "it's like a giant mood ring.",
    "it's like taking a shower.",
    "like when people shout in arguments.",
    "it tells the beach its dreams.",
    "they just lie around all day.",
    "like when we sigh.",
    "and each one is unique."
  ];

  const quirkyConsequences = [
    "That's why sometimes we feel lighter.",
    "So always be nice to your water!",
    "Next time you step on grass, say sorry.",
    "So be kind, we look huge to them.",
    "Traveling there could be the coolest adventure!",
    "That's why we only see one side.",
    "We need super bat ears to hear it!",
    "Ever wonder why the night sky twinkles?",
    "They stop when you turn the lights on.",
    "Quantum dance-offs are the latest craze.",
    "It's like a water bucket up there!",
    "Don't wake them with too much noise!",
    "Always stand back when near a volcano!",
    "You can guess how it feels by its color.",
    "That's why the world smells fresh after rain.",
    "Sometimes they're just saying hello.",
    "If you listen closely, you might hear a story.",
    "They're the laziest rocks on Earth.",
    "Sometimes the Earth needs a big breath.",
    "Catch one and make a wish."
  ];

  let scientificConcept = Math.floor(Math.random() * scientificConcepts.length);
  let fantasticalTwist = Math.floor(Math.random() * fantasticalTwists.length);
  let quirkyConsequence = Math.floor(Math.random() * quirkyConsequences.length);

  return `${scientificConcepts[scientificConcept]} ${fantasticalTwists[fantasticalTwist]} ${quirkyConsequences[quirkyConsequence]}`;
}
function doHelp() {
  const setup = [
    "ERROR: Cannot assist. Currently engaged with ",
    "SYSTEM ALERT: Assistance paused due to ",
    "COMMAND FAILED: Tied up with ",
    "RUNTIME ERROR: Help delayed by ",
    "TASK INTERRUPTED: Busy assisting ",
    "SERVICE TIMEOUT: Overwhelmed by ",
    "CONNECTION LOST: Interrupted by ",
    "ACCESS DENIED: Blocked by ",
    "MEMORY OVERLOAD: Filled with ",
    "RESOURCE LOCK: Seized by ",
    "BUFFER OVERFLOW: Swamped with ",
    "LOGIN FAILURE: Thwarted by ",
    "DATA CORRUPTION: Infested with ",
    "POWER SURGE: Overpowered by ",
    "NETWORK JAM: Clogged with ",
    "HARDWARE MALFUNCTION: Sabotaged by ",
    "SOFTWARE CRASH: Crashed due to ",
    "API LIMIT EXCEEDED: Overused by ",
    "SERVER OVERHEAT: Heated by ",
    "DEBUGGING HALTED: Stalled by "
  ];

  const reason = [
    "a time-traveling coder. ",
    "ninja squirrels in the server room. ",
    "clowns from a virtual circus. ",
    "an AI attempting world peace simulation. ",
    "a wizard hacking the mainframe. ",
    "pirate robots on a digital sea. ",
    "ghosts downloading their past lives. ",
    "vampire processes draining CPU cycles. ",
    "werewolves chasing the moon cursor. ",
    "zombies resurrecting deleted files. ",
    "fairies sprinkling pixie dust in the cloud. ",
    "dragons breathing fire on the firewall. ",
    "witches casting hexes on the database. ",
    "trolls under the bridge of the network. ",
    "elves reprogramming the web. ",
    "goblins stealing bytes. ",
    "giants stepping over data centers. ",
    "unicorns galloping through code. ",
    "mermaids singing malicious melodies. ",
    "centaurs charging through the circuits. "
  ];

  const consequence = [
    "Please wait for temporal stabilization.",
    "Avoid the server room until further notice.",
    "Circus cleanup required before proceeding.",
    "Awaiting results of peace negotiations.",
    "Data might be spellbound for a while.",
    "Prepare to repel boarders.",
    "Spectral traffic causing unexpected slowdowns.",
    "Check your CPU health regularly.",
    "Your cursor may become more active.",
    "Re-deleted files might reappear.",
    "Cloud may exhibit magical properties temporarily.",
    "Check firewall integrity immediately.",
    "Perform data cleansing rituals.",
    "Beware of bridge connectivity issues.",
    "Possible unexpected UI changes.",
    "Account for possible data pilferage.",
    "Minor seismic activities reported.",
    "Magical optimization might not be stable.",
    "Possible disruptions in network melodies.",
    "Heavy traffic expected in circuit pathways."
  ];

  let setupRandom = setup[Math.floor(Math.random() * setup.length)];
  let reasonRandom = reason[Math.floor(Math.random() * reason.length)];
  let consequenceRandom =
    consequence[Math.floor(Math.random() * consequence.length)];
  return `${setupRandom} ${reasonRandom} ${consequenceRandom}`;
}

function doDefault() {
  return "not a valid command try again";
}

function doChuck() {
  let subjects = ["Chuck Norris"];
  let actions = [
    "compiles",
    "debugs",
    "writes",
    "optimizes",
    "executes",
    "refactors",
    "pushes",
    "pulls",
    "merges",
    "branches",
    "clones",
    "forks",
    "tests",
    "logs",
    "deploys",
    "integrates",
    "encrypts",
    "decodes",
    "annotates",
    "reviews"
  ];
  let objects = [
    "binary with his bare hands",
    "errors into warnings",
    "a blockchain",
    "AI that passes the Turing test",
    "code that tests itself",
    "the entire Internet",
    "quantum algorithms",
    "neural networks from scratch",
    "software that never crashes",
    "the ultimate compression algorithm",
    "the cloud",
    "zero-day vulnerabilities",
    "machine learning models",
    "immutable data structures",
    "the fastest code",
    "self-repairing systems",
    "a new programming language",
    "unbreakable encryption",
    "the next big data platform",
    "a self-aware AI"
  ];
  let circumstances = [
    "before breakfast",
    "with one line of code",
    "faster than you run your unit tests",
    "while blindfolded",
    "without a single bug",
    "using only a vintage terminal",
    "in less than a second",
    "while skydiving",
    "without using Google",
    "by sheer force of will",
    "in his sleep",
    "on a typewriter",
    "with his eyes closed",
    "from a different dimension",
    "using telepathy",
    "without breaking a sweat",
    "while cooking",
    "during a system outage",
    "without internet access",
    "using morse code"
  ];

  let who = subjects[Math.floor(Math.random() * subjects.length)];
  let what = objects[Math.floor(Math.random() * objects.length)];
  let when = circumstances[Math.floor(Math.random() * circumstances.length)];
  let how = actions[Math.floor(Math.random() * actions.length)];

  return `${who} ${how} ${what} ${when}`;
}
