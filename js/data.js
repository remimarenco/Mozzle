/** 
 *  Array contenant l'ensemble des données necessaires pour notre application jeux de mot
 */
var data = [
    {
        "categorie":"fruits",
        "libelle": "POMME",
        "img":"../res/img/fruits/pomme.png",
        "audio":"./res/audio/fruits/Fr-pomme.ogg",
        "lettres": [ 
            {
                "libelle":"P",
                "audio":"./res/audio/lettres/Fr-P.ogg" 
            },
            {
                "libelle":"O",
                "audio":"./res/audio/lettres/Fr-O.ogg" 
            },
            {
                "libelle":"M",
                "audio":"./res/audio/lettres/Fr-M.ogg" 
            },
            {
                "libelle":"M",
                "audio":"./res/audio/lettres/Fr-M.ogg" 
            },
            {
                "libelle":"E",
                "audio":"./res/audio/lettres/Fr-E.ogg" 
            }
        ]
    },
    {
        "categorie":"fruits",
        "libelle": "POIRE",
        "img":"../res/img/fruits/poire.png",
        "audio":"./res/audio/fruits/Fr-poire.ogg",
        "lettres": [ "P", "O", "I","R","E" ]
    },
    {
        "categorie":"fruits",
        "libelle": "ORANGE",
        "img":"../res/img/fruits/orange.png",
        "audio":"./res/audio/fruits/Fr-orange.ogg",
        "lettres": [ "O", "R", "A","N","G","E" ]
    },
    {
        "categorie":"fruits",
        "libelle": "TOMATE",
        "img":"../res/img/fruits/tomate.png",
        "audio":"./res/audio/fruits/Fr-tomate.ogg",
        "lettres": [ "T", "O", "M","A","T","E" ]
    },
    {
        "categorie":"fruits",
        "libelle": "NOISETTE",
        "img":"../res/img/fruits/noisette.png",
        "audio":"./res/audio/fruits/Fr-noisette.ogg",
        "lettres": [ "N", "O", "I","S","E","T","T","E" ]
    },
    {
        "categorie":"fruits",
        "libelle": "FRAISE",
        "img":"../res/img/fruits/fraise.png",
        "audio":"./res/audio/fruits/Fr-fraise.ogg",
        "lettres": [ "F", "R", "A","I","S","E" ]
    },
    {
        "categorie":"fruits",
        "libelle": "ABRICOT",
        "img":"../res/img/fruits/abricot.png",
        "audio":"./res/audio/fruits/Fr-abricot.ogg",
        "lettres": [ "A", "B", "R","I","C","O","T" ]
    },
    {
        "categorie":"fruits",
        "libelle": "CITRON",
        "img":"../res/img/fruits/citron.png",
        "audio":"./res/audio/fruits/Fr-citron.ogg",
        "lettres": [ "C", "I", "T","R","O","N" ]
    },
    {
        "categorie":"fruits",
        "libelle": "ANANAS",
        "img":"../res/img/fruits/ananas.png",
        "audio":"./res/audio/fruits/Fr-ananas.ogg",
        "lettres": [ "A", "N", "A","N","A","S" ]
    },
    {
        "categorie":"fruits",
        "libelle": "PECHE",
        "img":"../res/img/fruits/peche.png",
        "audio":"./res/audio/fruits/Fr-peche.ogg",
        "lettres": [ "P", "E", "C","H","E" ]
    },
    {
        "categorie":"animaux",
        "libelle": "CHEVAL",
        "img":"../res/img/animaux/cheval.png",
        "audio":"./res/audio/animaux/Fr-cheval.ogg",
        "lettres": [ "C", "H", "E","V","A","L" ]
    },
    {
        "categorie":"animaux",
        "libelle": "CHIEN",
        "img":"../res/img/animaux/chien.png",
        "audio":"./res/audio/animaux/Fr-chien.ogg",
        "lettres": [ "C", "H", "I","E","N" ]
    },
    {
        "categorie":"animaux",
        "libelle": "CHAT",
        "img":"../res/img/animaux/chat.png",
        "audio":"./res/audio/animaux/Fr-chat.ogg",
        "lettres": [ "C", "H", "A","T" ]
    },
    {
        "categorie":"animaux",
        "libelle": "POISSON",
        "img":"../res/img/animaux/poisson.png",
        "audio":"./res/audio/animaux/Fr-poisson.ogg",
        "lettres": [ "P", "O", "I","S","S","O","N" ]
    },
    {
        "categorie":"animaux",
        "libelle": "COCHON",
        "img":"../res/img/animaux/cochon.png",
        "audio":"./res/audio/animaux/Fr-cochon.ogg",
        "lettres": [ "C", "O", "C","H","O","N" ]
    },
    {
        "categorie":"animaux",
        "libelle": "VACHE",
        "img":"../res/img/animaux/vache.png",
        "audio":"./res/audio/animaux/Fr-vache.ogg",
        "lettres": [ "V", "A", "C","H","E" ]
    },
    {
        "categorie":"animaux",
        "libelle": "MOUTON",
        "img":"../res/img/animaux/mouton.png",
        "audio":"./res/audio/animaux/Fr-mouton.ogg",
        "lettres": [ "M", "O", "U","T","O","N" ]
    },
    {
        "categorie":"animaux",
        "libelle": "PERROQUET",
        "img":"../res/img/animaux/perroquet.png",
        "audio":"./res/audio/animaux/Fr-perroquet.ogg",
        "lettres": [ "P", "E", "R","R","O","Q","U","E","T" ]
    },
    {
        "categorie":"animaux",
        "libelle": "SINGE",
        "img":"../res/img/animaux/singe.png",
        "audio":"./res/audio/animaux/Fr-singe.ogg",
        "lettres": [ "S", "I","N","G","E" ]
    },
    {
        "categorie":"animaux",
        "libelle": "GIRAFE",
        "img":"../res/img/animaux/girafe.png",
        "audio":"./res/audio/animaux/Fr-girafe.ogg",
        "lettres": [ "G", "I", "R","A","F","E" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "ORANGE",
        "img":"../res/img/couleurs/orange.png",
        "audio":"../res/audio/couleurs/Fr-orange.ogg",
        "lettres": [ "O", "R", "A","N","G","E" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "BLEU",
        "img":"../res/img/couleurs/bleu.png",
        "audio":"../res/audio/couleurs/Fr-bleu.ogg",
        "lettres": [ "B", "L", "E","U" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "ROUGE",
        "img":"../res/img/couleurs/rouge.png",
        "audio":"../res/audio/couleurs/Fr-rouge.ogg",
        "lettres": [ "R", "O", "U","G","E" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "JAUNE",
        "img":"../res/img/couleurs/jaune.png",
        "audio":"../res/audio/couleurs/Fr-jaune.ogg",
        "lettres": [ "J", "A", "U","N","E" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "MARRON",
        "img":"../res/img/couleurs/marron.png",
        "audio":"../res/audio/couleurs/Fr-marron.ogg",
        "lettres": [ "M", "A", "R","R","O","N" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "GRIS",
        "img":"../res/img/couleurs/gris.png",
        "audio":"../res/audio/couleurs/Fr-gris.ogg",
        "lettres": [ "G", "R","I","S" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "VIOLET",
        "img":"../res/img/couleurs/violet.png",
        "audio":"../res/audio/couleurs/Fr-violet.ogg",
        "lettres": [ "V", "I", "O","L","E","T" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "BLANC",
        "img":"../res/img/couleurs/blanc.png",
        "audio":"../res/audio/couleurs/Fr-blanc.ogg",
        "lettres": [ "B", "L", "A","N","C" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "NOIR",
        "img":"../res/img/couleurs/noir.png",
        "audio":"../res/audio/couleurs/Fr-noir.ogg",
        "lettres": [ "N", "O","I","R" ]
    },
    {
        "categorie":"couleurs",
        "libelle": "VERT",
        "img":"../res/img/couleurs/vert.png",
        "audio":"../res/audio/couleurs/Fr-vert.ogg",
        "lettres": [ "V", "E", "R","T" ]
    }
]

