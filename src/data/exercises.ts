// Übungsbibliothek. Texte auf Deutsch; Übersetzungen folgen mit der Spracheinstellung.
export type Exercise = { id: string; name: string; muscle: string; secondary: string; equip: string; level: string; home: boolean; steps: string[]; mistakes: string[]; safety: string; alts: string[] };

export const EXERCISES: Exercise[] = [
  {
    "id": "kniebeuge",
    "name": "Kniebeuge mit Langhantel",
    "muscle": "Beine",
    "secondary": "Gesäß, unterer Rücken",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Stange auf dem oberen Rücken, Füße schulterbreit, Zehen leicht nach außen.",
      "Hüfte nach hinten und unten, Knie folgen den Zehen, Rücken bleibt gerade.",
      "Mindestens bis die Oberschenkel parallel sind, dann kraftvoll hochdrücken."
    ],
    "mistakes": [
      "Knie fallen nach innen.",
      "Fersen heben ab, Gewicht auf den Zehen."
    ],
    "safety": "Im Rack mit Sicherheitsablagen auf Hüfthöhe trainieren.",
    "alts": [
      "goblet-squat",
      "beinpresse"
    ]
  },
  {
    "id": "goblet-squat",
    "name": "Goblet Squat",
    "muscle": "Beine",
    "secondary": "Gesäß, Bauch",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Kurzhantel senkrecht vor der Brust halten, Ellbogen zeigen nach unten.",
      "Tief in die Hocke, Oberkörper bleibt aufrecht.",
      "Über die ganze Fußsohle zurück nach oben."
    ],
    "mistakes": [
      "Rundrücken im unteren Bereich.",
      "Zu breiter oder zu enger Stand."
    ],
    "safety": "Nur so tief, wie der Rücken gerade bleibt.",
    "alts": [
      "kniebeuge",
      "ausfallschritte"
    ]
  },
  {
    "id": "beinpresse",
    "name": "Beinpresse",
    "muscle": "Beine",
    "secondary": "Gesäß",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Füße schulterbreit in der Mitte der Platte.",
      "Schlitten kontrolliert ablassen, bis die Knie etwa 90 Grad haben.",
      "Hochdrücken, ohne die Knie ganz durchzustrecken."
    ],
    "mistakes": [
      "Gesäß hebt sich vom Polster.",
      "Knie schnappen oben durch."
    ],
    "safety": "Sicherungshebel immer erst lösen, wenn die Beine Spannung haben.",
    "alts": [
      "kniebeuge",
      "goblet-squat"
    ]
  },
  {
    "id": "ausfallschritte",
    "name": "Ausfallschritte mit Kurzhanteln",
    "muscle": "Beine",
    "secondary": "Gesäß",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Aufrecht stehen, Hanteln seitlich halten.",
      "Großen Schritt nach vorn, hinteres Knie Richtung Boden.",
      "Über die vordere Ferse zurückdrücken, Seite wechseln."
    ],
    "mistakes": [
      "Vorderes Knie schiebt weit über die Zehen.",
      "Oberkörper kippt nach vorn."
    ],
    "safety": "Bei Gleichgewichtsproblemen erst ohne Gewicht üben.",
    "alts": [
      "goblet-squat",
      "beinpresse"
    ]
  },
  {
    "id": "beinstrecker",
    "name": "Beinstrecker",
    "muscle": "Beine",
    "secondary": "",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Rückenlehne so einstellen, dass das Knie auf Höhe der Drehachse ist.",
      "Beine kontrolliert strecken, oben kurz halten.",
      "Langsam zurück, ohne das Gewicht abzulegen."
    ],
    "mistakes": [
      "Schwung aus der Hüfte.",
      "Zu schnelles Absenken."
    ],
    "safety": "Bei Knieschmerzen Bewegungsumfang verkleinern.",
    "alts": [
      "ausfallschritte"
    ]
  },
  {
    "id": "beinbeuger",
    "name": "Beinbeuger liegend",
    "muscle": "Beine",
    "secondary": "",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Bauchlage, Polster knapp über den Fersen.",
      "Fersen Richtung Gesäß ziehen.",
      "Langsam ablassen, Hüfte bleibt auf dem Polster."
    ],
    "mistakes": [
      "Hüfte hebt sich.",
      "Ruckartige Bewegung."
    ],
    "safety": "Gewicht so wählen, dass keine Ausweichbewegung nötig ist.",
    "alts": [
      "rumaenisches-kreuzheben",
      "kh-rumaenisch"
    ]
  },
  {
    "id": "rumaenisches-kreuzheben",
    "name": "Rumänisches Kreuzheben",
    "muscle": "Beine",
    "secondary": "Gesäß, unterer Rücken",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Stange schulterbreit greifen, Knie leicht gebeugt.",
      "Hüfte nach hinten schieben, Stange nah an den Beinen nach unten.",
      "Wenn die Rückseite der Beine spannt, Hüfte nach vorn bringen."
    ],
    "mistakes": [
      "Rundrücken.",
      "Stange entfernt sich von den Beinen."
    ],
    "safety": "Nur so tief, wie der Rücken neutral bleibt.",
    "alts": [
      "kh-rumaenisch",
      "beinbeuger"
    ]
  },
  {
    "id": "kh-rumaenisch",
    "name": "Rumänisches Kreuzheben mit Kurzhanteln",
    "muscle": "Beine",
    "secondary": "Gesäß",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Hanteln vor den Oberschenkeln, Knie leicht gebeugt.",
      "Hüfte nach hinten, Hanteln gleiten an den Beinen entlang.",
      "Gesäß anspannen und aufrichten."
    ],
    "mistakes": [
      "Knie zu stark gebeugt (wird zur Kniebeuge).",
      "Kopf überstreckt."
    ],
    "safety": "Rücken die ganze Zeit gerade halten.",
    "alts": [
      "rumaenisches-kreuzheben",
      "glute-bridge"
    ]
  },
  {
    "id": "kreuzheben",
    "name": "Kreuzheben",
    "muscle": "Rücken",
    "secondary": "Beine, Gesäß",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Füße hüftbreit, Stange über der Fußmitte.",
      "Greifen, Brust raus, Rücken gerade, Spannung aufbauen.",
      "Stange nah am Körper hochziehen, oben Hüfte strecken."
    ],
    "mistakes": [
      "Rundrücken beim Anheben.",
      "Stange rollt vom Körper weg."
    ],
    "safety": "Technik mit leichtem Gewicht lernen, im Zweifel Trainer fragen.",
    "alts": [
      "rumaenisches-kreuzheben",
      "kh-rumaenisch"
    ]
  },
  {
    "id": "hip-thrust",
    "name": "Hip Thrust",
    "muscle": "Gesäß",
    "secondary": "Beine",
    "equip": "Langhantel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Oberer Rücken an der Bank, Stange gepolstert auf der Hüfte.",
      "Füße so, dass die Schienbeine oben senkrecht stehen.",
      "Hüfte hochdrücken, oben Gesäß fest anspannen."
    ],
    "mistakes": [
      "Hohlkreuz statt Hüftstreckung.",
      "Füße zu weit vorn."
    ],
    "safety": "Polster für die Stange nutzen.",
    "alts": [
      "glute-bridge"
    ]
  },
  {
    "id": "glute-bridge",
    "name": "Glute Bridge",
    "muscle": "Gesäß",
    "secondary": "Beine",
    "equip": "Körpergewicht",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Rückenlage, Füße aufgestellt.",
      "Hüfte anheben, bis Knie, Hüfte und Schultern eine Linie bilden.",
      "Oben 2 Sekunden halten, langsam ab."
    ],
    "mistakes": [
      "Druck über die Zehen statt Fersen.",
      "Hohlkreuz."
    ],
    "safety": "Für mehr Gewicht eine Kurzhantel auf die Hüfte legen.",
    "alts": [
      "hip-thrust"
    ]
  },
  {
    "id": "wadenheben",
    "name": "Wadenheben stehend",
    "muscle": "Beine",
    "secondary": "",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Fußballen auf einer Kante, Fersen frei.",
      "Fersen so hoch wie möglich drücken.",
      "Langsam tief absenken."
    ],
    "mistakes": [
      "Wippen statt voller Bewegung.",
      "Knie beugen mit."
    ],
    "safety": "Zu Hause auf einer Treppenstufe mit Halt üben.",
    "alts": []
  },
  {
    "id": "bankdruecken",
    "name": "Bankdrücken",
    "muscle": "Brust",
    "secondary": "Trizeps, Schultern",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Auf der Bank liegen, Augen unter der Stange, Schulterblätter zusammen.",
      "Stange kontrolliert zur unteren Brust ablassen.",
      "Kraftvoll nach oben drücken, Füße fest am Boden."
    ],
    "mistakes": [
      "Ellbogen zeigen 90 Grad zur Seite.",
      "Gesäß hebt von der Bank."
    ],
    "safety": "Mit Spotter oder Sicherheitsablagen trainieren.",
    "alts": [
      "schraegbank-kh",
      "liegestuetze"
    ]
  },
  {
    "id": "schraegbank-kh",
    "name": "Schrägbankdrücken mit Kurzhanteln",
    "muscle": "Brust",
    "secondary": "Schultern, Trizeps",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Bank auf etwa 30 Grad, Hanteln auf Brusthöhe.",
      "Hanteln nach oben drücken, oben leicht annähern.",
      "Langsam bis zur Dehnung der Brust ablassen."
    ],
    "mistakes": [
      "Bank zu steil (wird zur Schulterübung).",
      "Hanteln schlagen oben zusammen."
    ],
    "safety": "Hanteln am Ende auf den Oberschenkeln ablegen, nicht fallen lassen.",
    "alts": [
      "bankdruecken",
      "liegestuetze"
    ]
  },
  {
    "id": "liegestuetze",
    "name": "Liegestütze",
    "muscle": "Brust",
    "secondary": "Trizeps, Schultern, Bauch",
    "equip": "Körpergewicht",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Hände etwas breiter als schulterbreit, Körper bildet eine Linie.",
      "Brust kontrolliert Richtung Boden.",
      "Hochdrücken, Bauch bleibt angespannt."
    ],
    "mistakes": [
      "Hüfte hängt durch.",
      "Ellbogen weit zur Seite."
    ],
    "safety": "Einsteiger starten mit Händen auf einer Erhöhung.",
    "alts": [
      "bankdruecken",
      "schraegbank-kh"
    ]
  },
  {
    "id": "dips",
    "name": "Dips am Barren",
    "muscle": "Trizeps",
    "secondary": "Brust, Schultern",
    "equip": "Körpergewicht",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Stütz am Barren, Arme gestreckt.",
      "Ellbogen beugen, Oberkörper leicht nach vorn.",
      "Bis Oberarme parallel, dann hochdrücken."
    ],
    "mistakes": [
      "Zu tief bei eingeschränkter Schulter.",
      "Schultern ziehen zu den Ohren."
    ],
    "safety": "Bei Schulterschmerzen auf Bank-Dips oder Trizepsdrücken ausweichen.",
    "alts": [
      "bank-dips",
      "trizeps-kabel"
    ]
  },
  {
    "id": "bank-dips",
    "name": "Dips an der Bank",
    "muscle": "Trizeps",
    "secondary": "Brust",
    "equip": "Körpergewicht",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Hände hinter dir auf Bank oder Stuhl, Beine nach vorn.",
      "Ellbogen nach hinten beugen, Körper nah an der Bank.",
      "Hochdrücken bis die Arme fast gestreckt sind."
    ],
    "mistakes": [
      "Schultern rollen nach vorn.",
      "Zu tief absenken."
    ],
    "safety": "Stuhl gegen Wegrutschen sichern.",
    "alts": [
      "dips",
      "trizeps-kabel"
    ]
  },
  {
    "id": "schulterdruecken-kh",
    "name": "Schulterdrücken mit Kurzhanteln",
    "muscle": "Schultern",
    "secondary": "Trizeps",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Sitzend oder stehend, Hanteln auf Schulterhöhe.",
      "Nach oben drücken, ohne die Arme ganz zu verriegeln.",
      "Kontrolliert zurück auf Schulterhöhe."
    ],
    "mistakes": [
      "Hohlkreuz beim Drücken.",
      "Hanteln weit vor dem Körper."
    ],
    "safety": "Bauch und Gesäß anspannen, um den unteren Rücken zu schützen.",
    "alts": [
      "seitheben"
    ]
  },
  {
    "id": "seitheben",
    "name": "Seitheben",
    "muscle": "Schultern",
    "secondary": "",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Hanteln seitlich, Ellbogen leicht gebeugt.",
      "Arme seitlich bis Schulterhöhe heben.",
      "Langsam ablassen."
    ],
    "mistakes": [
      "Schwung aus dem Oberkörper.",
      "Schultern ziehen hoch."
    ],
    "safety": "Leichtes Gewicht, saubere Bewegung.",
    "alts": [
      "face-pulls"
    ]
  },
  {
    "id": "face-pulls",
    "name": "Face Pulls",
    "muscle": "Schultern",
    "secondary": "Oberer Rücken",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Seil auf Augenhöhe, mit Daumen nach hinten greifen.",
      "Zum Gesicht ziehen, Ellbogen hoch und außen.",
      "Hinten kurz halten, langsam zurück."
    ],
    "mistakes": [
      "Ziehen mit dem Unterarm statt den Schultern.",
      "Zu schweres Gewicht."
    ],
    "safety": "Eine gute Übung für gesunde Schultern, nicht ins Hohlkreuz gehen.",
    "alts": [
      "seitheben"
    ]
  },
  {
    "id": "klimmzuege",
    "name": "Klimmzüge",
    "muscle": "Rücken",
    "secondary": "Bizeps",
    "equip": "Körpergewicht",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Stange etwas breiter als schulterbreit greifen.",
      "Brust zur Stange ziehen, Schulterblätter nach unten.",
      "Kontrolliert ganz ablassen."
    ],
    "mistakes": [
      "Kipping mit Schwung.",
      "Halbe Wiederholungen."
    ],
    "safety": "Mit Band oder Maschine unterstützen, bis volle Wiederholungen klappen.",
    "alts": [
      "latzug"
    ]
  },
  {
    "id": "latzug",
    "name": "Latzug",
    "muscle": "Rücken",
    "secondary": "Bizeps",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Oberschenkel unter dem Polster fixieren, Stange breit greifen.",
      "Stange zur oberen Brust ziehen, Brust raus.",
      "Langsam nach oben lassen."
    ],
    "mistakes": [
      "Stange in den Nacken ziehen.",
      "Zurücklehnen und reißen."
    ],
    "safety": "Kopf bleibt vor der Stange.",
    "alts": [
      "klimmzuege",
      "kh-rudern"
    ]
  },
  {
    "id": "rudern-lh",
    "name": "Langhantelrudern",
    "muscle": "Rücken",
    "secondary": "Bizeps, hintere Schulter",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Oberkörper etwa 45 Grad vorgeneigt, Rücken gerade.",
      "Stange zum Bauchnabel ziehen.",
      "Kontrolliert ablassen."
    ],
    "mistakes": [
      "Oberkörper richtet sich auf.",
      "Rundrücken."
    ],
    "safety": "Bei Rückenproblemen Kabelrudern oder Kurzhantelrudern wählen.",
    "alts": [
      "kh-rudern",
      "rudern-kabel"
    ]
  },
  {
    "id": "kh-rudern",
    "name": "Einarmiges Kurzhantelrudern",
    "muscle": "Rücken",
    "secondary": "Bizeps",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Eine Hand und ein Knie auf der Bank, Rücken gerade.",
      "Hantel Richtung Hüfte ziehen.",
      "Langsam ablassen, Seite wechseln."
    ],
    "mistakes": [
      "Oberkörper dreht auf.",
      "Ziehen nur mit dem Arm."
    ],
    "safety": "Rücken bleibt die ganze Zeit neutral.",
    "alts": [
      "rudern-lh",
      "rudern-kabel"
    ]
  },
  {
    "id": "rudern-kabel",
    "name": "Kabelrudern sitzend",
    "muscle": "Rücken",
    "secondary": "Bizeps",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Aufrecht sitzen, Griff mit gestreckten Armen.",
      "Griff zum Bauch ziehen, Schulterblätter zusammen.",
      "Langsam nach vorn lassen."
    ],
    "mistakes": [
      "Mit dem Oberkörper reißen.",
      "Schultern ziehen hoch."
    ],
    "safety": "Knie leicht gebeugt lassen.",
    "alts": [
      "kh-rudern",
      "rudern-lh"
    ]
  },
  {
    "id": "bizeps-curl-kh",
    "name": "Bizepscurls mit Kurzhanteln",
    "muscle": "Bizeps",
    "secondary": "",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Hanteln seitlich, Handflächen nach vorn.",
      "Unterarme beugen, Ellbogen bleiben am Körper.",
      "Langsam strecken."
    ],
    "mistakes": [
      "Schwung aus dem Rücken.",
      "Ellbogen wandern nach vorn."
    ],
    "safety": "Gewicht so wählen, dass der Oberkörper ruhig bleibt.",
    "alts": [
      "hammer-curl"
    ]
  },
  {
    "id": "hammer-curl",
    "name": "Hammercurls",
    "muscle": "Bizeps",
    "secondary": "Unterarme",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Hanteln neutral greifen, Daumen nach oben.",
      "Zur Schulter beugen.",
      "Kontrolliert ablassen."
    ],
    "mistakes": [
      "Halbe Bewegung.",
      "Körper schwingt mit."
    ],
    "safety": "Handgelenke gerade halten.",
    "alts": [
      "bizeps-curl-kh"
    ]
  },
  {
    "id": "trizeps-kabel",
    "name": "Trizepsdrücken am Kabel",
    "muscle": "Trizeps",
    "secondary": "",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Seil oder Stange oben greifen, Ellbogen am Körper.",
      "Nach unten strecken, unten Seil auseinanderziehen.",
      "Langsam zurück bis Unterarme waagrecht."
    ],
    "mistakes": [
      "Ellbogen bewegen sich nach vorn.",
      "Oberkörper drückt mit."
    ],
    "safety": "Leicht nach vorn lehnen, Rücken gerade.",
    "alts": [
      "bank-dips",
      "dips"
    ]
  },
  {
    "id": "plank",
    "name": "Unterarmstütz (Plank)",
    "muscle": "Bauch",
    "secondary": "Schultern",
    "equip": "Körpergewicht",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Unterarme unter den Schultern, Körper gerade.",
      "Bauch und Gesäß fest anspannen.",
      "Position halten, ruhig atmen."
    ],
    "mistakes": [
      "Hüfte hängt durch.",
      "Hüfte zu hoch."
    ],
    "safety": "Zeit statt Wiederholungen: 3 × 30 bis 60 Sekunden.",
    "alts": [
      "crunch"
    ]
  },
  {
    "id": "crunch",
    "name": "Crunches",
    "muscle": "Bauch",
    "secondary": "",
    "equip": "Körpergewicht",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Rückenlage, Füße aufgestellt, Hände an den Schläfen.",
      "Schultern einrollen, unterer Rücken bleibt am Boden.",
      "Langsam zurück."
    ],
    "mistakes": [
      "Am Kopf ziehen.",
      "Mit Schwung hochkommen."
    ],
    "safety": "Blick bleibt schräg nach oben.",
    "alts": [
      "plank",
      "crunch-kabel"
    ]
  },
  {
    "id": "haengendes-beinheben",
    "name": "Hängendes Beinheben",
    "muscle": "Bauch",
    "secondary": "Hüftbeuger",
    "equip": "Körpergewicht",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "An der Stange hängen, Schultern aktiv.",
      "Knie oder gestreckte Beine nach oben ziehen.",
      "Langsam ablassen, nicht schwingen."
    ],
    "mistakes": [
      "Schwung holen.",
      "Nur Hüftbeuger, Becken kippt nicht."
    ],
    "safety": "Einsteiger starten mit angewinkelten Knien.",
    "alts": [
      "crunch",
      "plank"
    ]
  },
  {
    "id": "crunch-kabel",
    "name": "Kabel-Crunch",
    "muscle": "Bauch",
    "secondary": "",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Kniend vor dem Kabelzug, Seil neben dem Kopf.",
      "Oberkörper einrollen, Ellbogen Richtung Knie.",
      "Langsam aufrichten."
    ],
    "mistakes": [
      "Ziehen mit den Armen.",
      "Hüfte bewegt sich mit."
    ],
    "safety": "Bewegung kommt aus dem Bauch, nicht aus der Hüfte.",
    "alts": [
      "crunch"
    ]
  },
  {
    "id": "brustpresse",
    "name": "Brustpresse",
    "muscle": "Brust",
    "secondary": "Trizeps, Schultern",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Sitz so einstellen, dass die Griffe auf Brusthöhe sind.",
      "Griffe nach vorn drücken, ohne die Ellbogen ganz durchzustrecken.",
      "Kontrolliert zurück bis zur leichten Dehnung."
    ],
    "mistakes": [
      "Schultern rollen nach vorn.",
      "Rücken löst sich von der Lehne."
    ],
    "safety": "Gewicht nie zurückfallen lassen.",
    "alts": [
      "bankdruecken",
      "schraegbank-kh"
    ]
  },
  {
    "id": "butterfly",
    "name": "Butterfly",
    "muscle": "Brust",
    "secondary": "Schultern",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Rücken an der Lehne, Arme leicht gebeugt an den Polstern.",
      "Arme vor der Brust zusammenführen.",
      "Langsam öffnen bis zur Dehnung."
    ],
    "mistakes": [
      "Arme strecken sich ganz.",
      "Zu weit nach hinten öffnen."
    ],
    "safety": "Bewegung kommt aus der Schulter, Ellbogenwinkel bleibt gleich.",
    "alts": [
      "brustpresse"
    ]
  },
  {
    "id": "schulterpresse-maschine",
    "name": "Schulterpresse an der Maschine",
    "muscle": "Schultern",
    "secondary": "Trizeps",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Griffe auf Schulterhöhe, Rücken an der Lehne.",
      "Nach oben drücken.",
      "Kontrolliert zurück auf Schulterhöhe."
    ],
    "mistakes": [
      "Hohlkreuz.",
      "Kopf schiebt nach vorn."
    ],
    "safety": "Sitzhöhe so wählen, dass die Griffe auf Schulterhöhe starten.",
    "alts": [
      "schulterdruecken-kh"
    ]
  },
  {
    "id": "reverse-butterfly",
    "name": "Reverse Butterfly",
    "muscle": "Schultern",
    "secondary": "Oberer Rücken",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Brust an das Polster, Griffe vor dir.",
      "Arme weit nach hinten öffnen.",
      "Langsam zurück nach vorn."
    ],
    "mistakes": [
      "Schwung aus dem Oberkörper.",
      "Schultern ziehen hoch."
    ],
    "safety": "Leichtes Gewicht, volle Bewegung.",
    "alts": [
      "face-pulls"
    ]
  },
  {
    "id": "rudermaschine",
    "name": "Rudern an der Maschine",
    "muscle": "Rücken",
    "secondary": "Bizeps",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Brust an das Polster, Griffe mit gestreckten Armen.",
      "Griffe zum Körper ziehen, Schulterblätter zusammen.",
      "Langsam nach vorn lassen."
    ],
    "mistakes": [
      "Brust löst sich vom Polster.",
      "Ziehen nur mit den Armen."
    ],
    "safety": "Rücken bleibt gerade an der Lehne.",
    "alts": [
      "rudern-kabel",
      "kh-rudern"
    ]
  },
  {
    "id": "bizepsmaschine",
    "name": "Bizepsmaschine",
    "muscle": "Bizeps",
    "secondary": "",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Oberarme flach auf das Polster.",
      "Griffe zur Schulter beugen.",
      "Langsam strecken."
    ],
    "mistakes": [
      "Gesäß hebt vom Sitz.",
      "Halbe Bewegung."
    ],
    "safety": "Ellbogen auf Höhe der Drehachse.",
    "alts": [
      "bizeps-curl-kh"
    ]
  },
  {
    "id": "smith-kniebeuge",
    "name": "Kniebeuge an der Multipresse",
    "muscle": "Beine",
    "secondary": "Gesäß",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Stange auf dem oberen Rücken, Füße leicht vor der Stange.",
      "Tief in die Hocke gehen.",
      "Hochdrücken, oben nicht ganz durchstrecken."
    ],
    "mistakes": [
      "Knie fallen nach innen.",
      "Füße zu weit hinten."
    ],
    "safety": "Sicherungshaken vor dem Start einstellen.",
    "alts": [
      "kniebeuge",
      "beinpresse"
    ]
  },
  {
    "id": "hackenschmidt",
    "name": "Hackenschmidt-Kniebeuge",
    "muscle": "Beine",
    "secondary": "Gesäß",
    "equip": "Maschine",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Rücken an das Polster, Schultern unter die Bügel.",
      "Kontrolliert tief beugen.",
      "Über die ganze Fußsohle hochdrücken."
    ],
    "mistakes": [
      "Fersen heben ab.",
      "Zu schnell in die Tiefe."
    ],
    "safety": "Sicherung erst lösen, wenn die Beine Spannung haben.",
    "alts": [
      "beinpresse",
      "kniebeuge"
    ]
  },
  {
    "id": "bauchmaschine",
    "name": "Bauchmaschine",
    "muscle": "Bauch",
    "secondary": "",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Polster vor der Brust, Füße fixiert.",
      "Oberkörper nach vorn einrollen.",
      "Langsam aufrichten."
    ],
    "mistakes": [
      "Ziehen mit den Armen.",
      "Zu schweres Gewicht."
    ],
    "safety": "Bewegung kommt aus dem Bauch.",
    "alts": [
      "crunch-kabel",
      "crunch"
    ]
  },
  {
    "id": "kh-bankdruecken",
    "name": "Bankdrücken mit Kurzhanteln",
    "muscle": "Brust",
    "secondary": "Trizeps, Schultern",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Auf der Bank liegen, Kurzhanteln auf Brusthöhe, Schulterblätter zusammen.",
      "Hanteln nach oben drücken, bis die Arme fast gestreckt sind.",
      "Langsam ablassen, bis die Brust gedehnt ist."
    ],
    "mistakes": [
      "Hanteln schlagen oben zusammen.",
      "Ellbogen zeigen 90 Grad zur Seite."
    ],
    "safety": "Hanteln zum Ablegen auf die Oberschenkel bringen, nicht seitlich fallen lassen.",
    "alts": [
      "bankdruecken",
      "liegestuetze"
    ]
  },
  {
    "id": "schraegbank-lh",
    "name": "Schrägbankdrücken mit Langhantel",
    "muscle": "Brust",
    "secondary": "Schultern, Trizeps",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Bank auf etwa 30 Grad, Augen unter der Stange.",
      "Stange kontrolliert zur oberen Brust ablassen.",
      "Nach oben drücken, Schulterblätter bleiben zusammen."
    ],
    "mistakes": [
      "Bank zu steil.",
      "Gesäß hebt von der Bank."
    ],
    "safety": "Mit Spotter oder Sicherheitsablagen trainieren.",
    "alts": [
      "schraegbank-kh",
      "bankdruecken"
    ]
  },
  {
    "id": "kabel-crossover",
    "name": "Kabel-Crossover",
    "muscle": "Brust",
    "secondary": "Schultern",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Zwischen den Kabeltürmen stehen, Griffe oben, ein Fuß vorn.",
      "Arme leicht gebeugt vor dem Körper nach unten zusammenführen.",
      "Langsam öffnen, bis die Brust gedehnt ist."
    ],
    "mistakes": [
      "Arme beugen und strecken wie beim Drücken.",
      "Zu weit nach hinten öffnen."
    ],
    "safety": "Ellbogenwinkel bleibt die ganze Bewegung gleich.",
    "alts": [
      "butterfly"
    ]
  },
  {
    "id": "frontheben",
    "name": "Frontheben",
    "muscle": "Schultern",
    "secondary": "",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Hanteln vor den Oberschenkeln, Arme fast gestreckt.",
      "Arme nach vorn bis auf Schulterhöhe heben.",
      "Langsam ablassen."
    ],
    "mistakes": [
      "Schwung aus dem Rücken.",
      "Arme über Schulterhöhe."
    ],
    "safety": "Leichtes Gewicht, Oberkörper bleibt ruhig.",
    "alts": [
      "seitheben"
    ]
  },
  {
    "id": "kabel-seitheben",
    "name": "Seitheben am Kabel",
    "muscle": "Schultern",
    "secondary": "",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Seitlich neben dem Kabelturm stehen, Griff mit der äußeren Hand.",
      "Arm seitlich bis Schulterhöhe heben.",
      "Langsam zurück, Spannung halten."
    ],
    "mistakes": [
      "Oberkörper kippt zur Seite.",
      "Schultern ziehen hoch."
    ],
    "safety": "Lieber leichter und sauber als schwer mit Schwung.",
    "alts": [
      "seitheben"
    ]
  },
  {
    "id": "shrugs-kh",
    "name": "Shrugs mit Kurzhanteln",
    "muscle": "Rücken",
    "secondary": "Nacken",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Aufrecht stehen, Hanteln seitlich, Arme gestreckt.",
      "Schultern gerade nach oben zu den Ohren ziehen.",
      "Oben kurz halten, langsam ablassen."
    ],
    "mistakes": [
      "Schultern kreisen.",
      "Arme beugen mit."
    ],
    "safety": "Kopf bleibt neutral, nicht nach vorn schieben.",
    "alts": [
      "face-pulls"
    ]
  },
  {
    "id": "t-bar-rudern",
    "name": "T-Bar-Rudern",
    "muscle": "Rücken",
    "secondary": "Bizeps, hintere Schulter",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Über der Stange stehen, Oberkörper etwa 45 Grad vorgeneigt.",
      "Griff zur Brust ziehen, Schulterblätter zusammen.",
      "Kontrolliert ablassen, Rücken bleibt gerade."
    ],
    "mistakes": [
      "Rundrücken.",
      "Oberkörper richtet sich beim Ziehen auf."
    ],
    "safety": "Bei Rückenproblemen Rudern an der Maschine mit Brustpolster wählen.",
    "alts": [
      "rudermaschine",
      "rudern-lh"
    ]
  },
  {
    "id": "trizeps-ueberkopf",
    "name": "Trizepsdrücken über Kopf",
    "muscle": "Trizeps",
    "secondary": "",
    "equip": "Kurzhantel",
    "level": "Einsteiger",
    "home": true,
    "steps": [
      "Eine Kurzhantel mit beiden Händen über dem Kopf halten.",
      "Hantel hinter den Kopf ablassen, Ellbogen zeigen nach oben.",
      "Arme wieder strecken."
    ],
    "mistakes": [
      "Ellbogen gehen weit auseinander.",
      "Hohlkreuz."
    ],
    "safety": "Bauch anspannen, um den unteren Rücken zu schützen.",
    "alts": [
      "trizeps-kabel",
      "french-press"
    ]
  },
  {
    "id": "french-press",
    "name": "French Press (SZ-Stange)",
    "muscle": "Trizeps",
    "secondary": "",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Auf der Bank liegen, Stange mit gestreckten Armen über der Brust.",
      "Nur die Unterarme beugen, Stange Richtung Stirn ablassen.",
      "Arme wieder strecken, Oberarme bleiben ruhig."
    ],
    "mistakes": [
      "Oberarme bewegen sich mit.",
      "Zu schnelles Ablassen."
    ],
    "safety": "Leichtes Gewicht wählen und kontrolliert arbeiten.",
    "alts": [
      "trizeps-kabel",
      "trizeps-ueberkopf"
    ]
  },
  {
    "id": "scottcurls",
    "name": "Scottcurls (SZ-Stange)",
    "muscle": "Bizeps",
    "secondary": "",
    "equip": "Langhantel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Oberarme flach auf das Scottpult, Stange im Untergriff.",
      "Stange zur Schulter beugen.",
      "Langsam ablassen, ohne die Arme ganz zu überstrecken."
    ],
    "mistakes": [
      "Gesäß hebt vom Sitz.",
      "Unten Gewicht fallen lassen."
    ],
    "safety": "Unten nicht ins Gelenk fallen lassen, Spannung halten.",
    "alts": [
      "bizepsmaschine",
      "bizeps-curl-kh"
    ]
  },
  {
    "id": "kabel-curl",
    "name": "Bizepscurls am Kabel",
    "muscle": "Bizeps",
    "secondary": "",
    "equip": "Kabel",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Vor dem unteren Kabelzug stehen, Stange im Untergriff.",
      "Unterarme beugen, Ellbogen bleiben am Körper.",
      "Langsam strecken."
    ],
    "mistakes": [
      "Schwung aus dem Rücken.",
      "Ellbogen wandern nach vorn."
    ],
    "safety": "Gewicht so wählen, dass der Oberkörper ruhig bleibt.",
    "alts": [
      "bizeps-curl-kh"
    ]
  },
  {
    "id": "bulgarian-split",
    "name": "Bulgarian Split Squats",
    "muscle": "Beine",
    "secondary": "Gesäß",
    "equip": "Kurzhantel",
    "level": "Fortgeschritten",
    "home": true,
    "steps": [
      "Hinterer Fuß auf einer Bank, vorderer Fuß weit vorn.",
      "Senkrecht nach unten gehen, bis das vordere Knie etwa 90 Grad hat.",
      "Über die vordere Ferse hochdrücken."
    ],
    "mistakes": [
      "Vorderes Knie fällt nach innen.",
      "Stand zu kurz."
    ],
    "safety": "Erst ohne Gewicht üben, bis das Gleichgewicht sicher ist.",
    "alts": [
      "ausfallschritte",
      "goblet-squat"
    ]
  },
  {
    "id": "frontkniebeuge",
    "name": "Frontkniebeuge",
    "muscle": "Beine",
    "secondary": "Bauch, oberer Rücken",
    "equip": "Langhantel",
    "level": "Fortgeschritten",
    "home": false,
    "steps": [
      "Stange vorn auf den Schultern, Ellbogen hoch.",
      "Tief in die Hocke, Oberkörper bleibt aufrecht.",
      "Über die ganze Fußsohle hochdrücken."
    ],
    "mistakes": [
      "Ellbogen fallen nach unten.",
      "Oberkörper kippt nach vorn."
    ],
    "safety": "Im Rack mit Sicherheitsablagen trainieren.",
    "alts": [
      "kniebeuge",
      "goblet-squat"
    ]
  },
  {
    "id": "beinbeuger-sitzend",
    "name": "Beinbeuger sitzend",
    "muscle": "Beine",
    "secondary": "",
    "equip": "Maschine",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Knie auf Höhe der Drehachse, Polster über den Oberschenkeln schließen.",
      "Fersen nach unten und hinten ziehen.",
      "Langsam zurück, ohne das Gewicht abzulegen."
    ],
    "mistakes": [
      "Gesäß rutscht nach vorn.",
      "Ruckartige Bewegung."
    ],
    "safety": "Oberschenkelpolster fest einstellen, damit die Hüfte ruhig bleibt.",
    "alts": [
      "beinbeuger",
      "rumaenisches-kreuzheben"
    ]
  },
  {
    "id": "hyperextensions",
    "name": "Hyperextensions",
    "muscle": "Rücken",
    "secondary": "Gesäß, Beinrückseite",
    "equip": "Körpergewicht",
    "level": "Einsteiger",
    "home": false,
    "steps": [
      "Hüfte auf dem Polster, Fersen unter der Fußrolle.",
      "Oberkörper kontrolliert nach unten beugen.",
      "Hochkommen, bis der Körper eine Linie bildet, nicht weiter."
    ],
    "mistakes": [
      "Überstrecken oben.",
      "Mit Schwung arbeiten."
    ],
    "safety": "Bewegung langsam ausführen, oben nicht ins Hohlkreuz gehen.",
    "alts": [
      "rumaenisches-kreuzheben"
    ]
  },
  {
    "id": "kettlebell-swing",
    "name": "Kettlebell Swing",
    "muscle": "Gesäß",
    "secondary": "Beine, unterer Rücken",
    "equip": "Kurzhantel",
    "level": "Fortgeschritten",
    "home": true,
    "steps": [
      "Füße etwas breiter als hüftbreit, Kettlebell mit beiden Händen.",
      "Hüfte nach hinten schieben, Kettlebell zwischen die Beine schwingen.",
      "Hüfte explosiv nach vorn, Kettlebell schwingt auf Brusthöhe."
    ],
    "mistakes": [
      "Aus den Armen heben statt aus der Hüfte.",
      "Rundrücken."
    ],
    "safety": "Mit leichtem Gewicht die Hüftbewegung lernen.",
    "alts": [
      "glute-bridge",
      "hip-thrust"
    ]
  }
];

export const EX: Record<string, Exercise> = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));
