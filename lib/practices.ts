import type { PracticeCard } from "./types";

const p = (card: Omit<PracticeCard, "kind">): PracticeCard => ({ kind: "pratique", ...card });

export const PRACTICES: PracticeCard[] = [
    p({
        id: "hydromassage-flottaison",
        name: "Hydromassage - lit de flottaison",
        withArticle: "la hydromassage - lit de flottaison",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "marche-nordique",
        name: "Marche nordique",
        withArticle: "la marche nordique",
        category: "mouvement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "adresses-healthy",
        name: "Adresses healthy",
        withArticle: "la adresses healthy",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "dietetique-nutrition",
        name: "Dietetique et nutrition",
        withArticle: "la dietetique et nutrition",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "naturopathie",
        name: "Naturopathie",
        withArticle: "la naturopathie",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "beaute-visage",
        name: "Beaute du visage",
        withArticle: "la beaute du visage",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-kobido",
        name: "Massage Kobido",
        withArticle: "la massage kobido",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "life-head-lift",
        name: "Life Head Lift",
        withArticle: "la life head lift",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-huiles-essentielles",
        name: "Massage aux huiles essentielles",
        withArticle: "la massage aux huiles essentielles",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-californien",
        name: "Massage californien",
        withArticle: "la massage californien",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-lomi-lomi",
        name: "Massage Lomi Lomi",
        withArticle: "la massage lomi lomi",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-coquillages-chauds",
        name: "Massage aux coquillages chauds",
        withArticle: "la massage aux coquillages chauds",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-lymphatique",
        name: "Massage lymphatique",
        withArticle: "la massage lymphatique",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-sportif",
        name: "Massage sportif",
        withArticle: "la massage sportif",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-suedois",
        name: "Massage suedois",
        withArticle: "la massage suedois",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-breuss",
        name: "Massage Breuss",
        withArticle: "la massage breuss",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-bebe",
        name: "Massage bien-etre bebe",
        withArticle: "la massage bien-etre bebe",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-prenatal",
        name: "Massage prenatal",
        withArticle: "la massage prenatal",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "bol-tibetain",
        name: "Bol tibetain",
        withArticle: "la bol tibetain",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "chant-vibratoire",
        name: "Chant vibratoire",
        withArticle: "la chant vibratoire",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-sonore",
        name: "Massage sonore",
        withArticle: "la massage sonore",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "musicotherapie",
        name: "Musicotherapie",
        withArticle: "la musicotherapie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "musique-intuitive",
        name: "Musique intuitive",
        withArticle: "la musique intuitive",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "sonotherapie",
        name: "Sonotherapie",
        withArticle: "la sonotherapie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "chi-nei-tsang",
        name: "Chi Nei Tsang",
        withArticle: "la chi nei tsang",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-coreen",
        name: "Massage coreen",
        withArticle: "la massage coreen",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-japonais-amma",
        name: "Massage japonais Amma",
        withArticle: "la massage japonais amma",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "meditation",
        name: "Meditation",
        withArticle: "la meditation",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "reflexologie-toutes-zones",
        name: "Reflexologie toutes zones",
        withArticle: "la reflexologie toutes zones",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "bioenergie",
        name: "Bioenergie",
        withArticle: "la bioenergie",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "lahochi",
        name: "LaHoChi",
        withArticle: "la lahochi",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "magnetisme",
        name: "Magnetisme",
        withArticle: "la magnetisme",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "ondobiologie",
        name: "Ondobiologie",
        withArticle: "la ondobiologie",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "reiki",
        name: "Reiki",
        withArticle: "la reiki",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "fasciotherapie",
        name: "Fasciotherapie",
        withArticle: "la fasciotherapie",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "methode-demelt",
        name: "Methode Demelt",
        withArticle: "la methode demelt",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "methode-knap",
        name: "Methode Knap",
        withArticle: "la methode knap",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "osteotherapie",
        name: "Osteotherapie",
        withArticle: "la osteotherapie",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-ayurvedique",
        name: "Massage ayurvedique",
        withArticle: "la massage ayurvedique",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-intuitif",
        name: "Massage intuitif",
        withArticle: "la massage intuitif",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-shiatsu",
        name: "Massage Shiatsu",
        withArticle: "la massage shiatsu",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "massage-shirochampi",
        name: "Massage Shirochampi",
        withArticle: "la massage shirochampi",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "vagu-expans",
        name: "Vagu Expans",
        withArticle: "la vagu expans",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "feng-shui",
        name: "Feng Shui",
        withArticle: "la feng shui",
        category: "cocon",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "geobiologie",
        name: "Geobiologie",
        withArticle: "la geobiologie",
        category: "cocon",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "harmonisation-lieux",
        name: "Harmonisation des lieux",
        withArticle: "la harmonisation des lieux",
        category: "cocon",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "harmonisation-globale",
        name: "Harmonisation globale",
        withArticle: "la harmonisation globale",
        category: "cocon",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "tse-therapie",
        name: "TSE - Therapie solutionniste expérientielle",
        withArticle: "la tse - therapie solutionniste expérientielle",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "hypnose-ericksonienne",
        name: "Hypnose ericksonienne",
        withArticle: "la hypnose ericksonienne",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "hypnose-evolutive",
        name: "Hypnose evolutive",
        withArticle: "la hypnose evolutive",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "hypnose-regressive",
        name: "Hypnose regressive",
        withArticle: "la hypnose regressive",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "hypnose-spirituelle",
        name: "Hypnose spirituelle",
        withArticle: "la hypnose spirituelle",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "fleurs-de-bach",
        name: "Fleurs de Bach",
        withArticle: "la fleurs de bach",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "olfactotherapie",
        name: "Olfactotherapie",
        withArticle: "la olfactotherapie",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "gemmotherapie",
        name: "Gemmotherapie",
        withArticle: "la gemmotherapie",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "thanadoula",
        name: "Thanadoula",
        withArticle: "la thanadoula",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "access-bars",
        name: "Access Bars",
        withArticle: "la access bars",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "decodage-biologique",
        name: "Decodage biologique",
        withArticle: "la decodage biologique",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "eft",
        name: "EFT",
        withArticle: "la eft",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "emdr",
        name: "EMDR",
        withArticle: "la emdr",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "onirologie",
        name: "Onirologie",
        withArticle: "la onirologie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "kinesiologie",
        name: "Kinesiologie",
        withArticle: "la kinesiologie",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "sophrologie",
        name: "Sophrologie",
        withArticle: "la sophrologie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "tft",
        name: "TFT",
        withArticle: "la tft",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "bioresonance",
        name: "Bioresonance",
        withArticle: "la bioresonance",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "lampe-lucia",
        name: "Lampe Lucia N3",
        withArticle: "la lampe lucia n3",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "luminotherapie",
        name: "Luminotherapie",
        withArticle: "la luminotherapie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "neurofeedback",
        name: "Neurofeedback",
        withArticle: "la neurofeedback",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "ondes-scalaires",
        name: "Ondes scalaires",
        withArticle: "la ondes scalaires",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "andc",
        name: "ANDC",
        withArticle: "la andc",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "ecoute-intuitive",
        name: "Ecoute intuitive",
        withArticle: "la ecoute intuitive",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "gestalt-therapie",
        name: "Gestalt-therapie",
        withArticle: "la gestalt-therapie",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "psychogenealogie",
        name: "Psychogenealogie",
        withArticle: "la psychogenealogie",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "therapie-couple",
        name: "Therapie de couple",
        withArticle: "la therapie de couple",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "coaching-vie",
        name: "Coaching de vie",
        withArticle: "la coaching de vie",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "coaching-image-soi",
        name: "Coaching image de soi",
        withArticle: "la coaching image de soi",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "coaching-professionnel",
        name: "Coaching professionnel",
        withArticle: "la coaching professionnel",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "coaching-spirituel",
        name: "Coaching spirituel",
        withArticle: "la coaching spirituel",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "olfacto-coaching",
        name: "Olfacto-coaching",
        withArticle: "la olfacto-coaching",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "phototherapie",
        name: "Phototherapie",
        withArticle: "la phototherapie",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "preparation-mentale",
        name: "Preparation mentale",
        withArticle: "la preparation mentale",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "preparation-mentale-sportifs",
        name: "Preparation mentale des sportifs",
        withArticle: "la preparation mentale des sportifs",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "enneagramme",
        name: "Enneagramme",
        withArticle: "la enneagramme",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "human-design",
        name: "Human Design",
        withArticle: "la human design",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "nbr",
        name: "NBR",
        withArticle: "la nbr",
        category: "mouvement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "mission-sens-vie",
        name: "Mission et sens de vie",
        withArticle: "la mission et sens de vie",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "numerologie",
        name: "Numerologie",
        withArticle: "la numerologie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "annales-akashiques",
        name: "Annales akashiques",
        withArticle: "la annales akashiques",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "astrologie",
        name: "Astrologie",
        withArticle: "la astrologie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "canalisation",
        name: "Canalisation",
        withArticle: "la canalisation",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "cartomancie",
        name: "Cartomancie",
        withArticle: "la cartomancie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "constellations-familiales",
        name: "Constellations familiales et systemiques",
        withArticle: "la constellations familiales et systemiques",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "guidance",
        name: "Guidance",
        withArticle: "la guidance",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "mediumnite",
        name: "Mediumnite",
        withArticle: "la mediumnite",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "cercles-femmes",
        name: "Cercles de femmes",
        withArticle: "la cercles de femmes",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "cercles-parole",
        name: "Cercles de parole",
        withArticle: "la cercles de parole",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "art-therapie",
        name: "Art-therapie",
        withArticle: "la art-therapie",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "chant-intuitif",
        name: "Chant intuitif",
        withArticle: "la chant intuitif",
        category: "meditation",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "danse-therapie",
        name: "Danse-therapie",
        withArticle: "la danse-therapie",
        category: "mouvement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "retraites-bien-etre",
        name: "Retraites bien-etre",
        withArticle: "la retraites bien-etre",
        category: "cocon",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "sejours-theme",
        name: "Sejours a theme",
        withArticle: "la sejours a theme",
        category: "cocon",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "formations-bien-etre",
        name: "Formations bien-etre",
        withArticle: "la formations bien-etre",
        category: "accompagnement",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "communication-animale",
        name: "Communication animale",
        withArticle: "la communication animale",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "mediation-animale",
        name: "Mediation animale",
        withArticle: "la mediation animale",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "magnetisme-animal",
        name: "Magnetisme animal",
        withArticle: "la magnetisme animal",
        category: "lien",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
    p({
        id: "osteotherapie-animale",
        name: "Osteotherapie animale",
        withArticle: "la osteotherapie animale",
        category: "soin",
        what: "Une pratique du bien-etre HOW PASS qui te reconnecte a toi-meme et a ton energie.",
        mantra: "Je prends soin de moi avec conscience et bienveillance.",
        exercise: "Prends 5 minutes pour respirer profondement et ressentir cette pratique en toi."
    }),
] as const;
