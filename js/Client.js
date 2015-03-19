;(function(exports){

    var dummyData= [
                  {
                    "MR_id": "MR66155",
                    "item": "Odom Coffee Table",
                    "price": 7894,
                    "about": "culpa exercitation sit anim irure magna nulla culpa occaecat id occaecat et velit pariatur exercitation",
                    "category": "sideChair",
                    "image": "ionchairorangered.jpg"
                  },
                  {
                    "MR_id": "MR89053",
                    "item": "Booth Side chair",
                    "price": 6027,
                    "about": "labore ad enim ea nisi fugiat quis duis ad proident ullamco culpa labore minim commodo",
                    "category": "bedFrame",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR56629",
                    "item": "Lawson Bed Frame",
                    "price": 6895,
                    "about": "excepteur incididunt pariatur et ad mollit dolor mollit aliquip id exercitation duis enim cillum pariatur",
                    "category": "diningTable",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR18502",
                    "item": "Bennett Nightstand",
                    "price": 918,
                    "about": "ullamco adipisicing fugiat ipsum exercitation eiusmod adipisicing do incididunt dolore duis ea magna officia velit",
                    "category": "nightstand",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR96692",
                    "item": "Little Office chair",
                    "price": 4616,
                    "about": "commodo duis id duis elit exercitation cupidatat aute aliquip sint sint do consequat id ut",
                    "category": "officeChair",
                    "image": "ionchairorangered.jpg"
                  },
                  {
                    "MR_id": "MR96752",
                    "item": "Joyce Credenza",
                    "price": 3312,
                    "about": "esse elit dolor sint dolor enim consectetur ex eu pariatur commodo magna laborum irure commodo",
                    "category": "nightstand",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR76597",
                    "item": "Taylor Credenza",
                    "price": 1046,
                    "about": "ex labore eiusmod id deserunt duis commodo magna elit dolor dolor dolor dolore id veniam",
                    "category": "bedFrame",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR78365",
                    "item": "Floyd Nightstand",
                    "price": 7210,
                    "about": "sint ex amet dolor ipsum fugiat proident mollit veniam irure do excepteur est ea laborum",
                    "category": "credenza",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR75185",
                    "item": "Woods Lounge Chair",
                    "price": 2924,
                    "about": "fugiat do commodo ea minim reprehenderit minim proident commodo deserunt laborum officia incididunt labore officia",
                    "category": "diningTable",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR38160",
                    "item": "Holden Side chair",
                    "price": 1518,
                    "about": "excepteur qui duis ipsum minim mollit ea exercitation exercitation tempor aliqua ex consectetur eiusmod duis",
                    "category": "bedFrame",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR84629",

                    "item": "Beach Credenza",
                    "price": 3453,
                    "about": "id irure excepteur proident dolor dolore cupidatat officia proident tempor cupidatat labore voluptate eu labore",
                    "category": "diningTable",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR75015",

                    "item": "Mueller Credenza",
                    "price": 5130,
                    "about": "labore anim proident voluptate ea cupidatat dolor aliqua exercitation Lorem ex amet aute consequat commodo",
                    "category": "chair",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR34657",

                    "item": "Ortiz Lounge Chair",
                    "price": 3419,
                    "about": "culpa ut aute duis adipisicing laboris non enim magna ullamco id sint dolore tempor qui",
                    "category": "sofa",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR27625",

                    "item": "Chang Chair",
                    "price": 4009,
                    "about": "nostrud consectetur laboris enim cillum ut culpa cillum pariatur velit cillum commodo consectetur non aliqua",
                    "category": "officeChair",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR12199",

                    "item": "Buckner Office chair",
                    "price": 2994,
                    "about": "et pariatur consequat fugiat id proident laborum cillum ex elit consequat sint voluptate ipsum qui",
                    "category": "dresser",
                    "image": "badilkjairdesk.jpg"
                  },
                  {
                    "MR_id": "MR72274",

                    "item": "Moreno Credenza",
                    "price": 784,
                    "about": "sit pariatur mollit ullamco Lorem velit velit commodo Lorem cillum dolore laboris qui deserunt irure",
                    "category": "chair",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR16776",

                    "item": "Greene Coffee Table",
                    "price": 6301,
                    "about": "ad qui aute exercitation ipsum proident dolore quis veniam minim dolor id laborum aliqua amet",
                    "category": "bedFrame",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR76271",

                    "item": "Oneil Coffee Table",
                    "price": 5260,
                    "about": "et occaecat nostrud cillum aliqua proident in nulla aliqua id culpa ad exercitation in occaecat",
                    "category": "loungeChair",
                    "image": "ionchairorangered.jpg"
                  },
                  {
                    "MR_id": "MR92655",

                    "item": "Griffin Dresser",
                    "price": 615,
                    "about": "enim eu et commodo veniam consequat fugiat ipsum ullamco excepteur duis anim ullamco esse sunt",
                    "category": "nightstand",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR14465",

                    "item": "Downs Dresser",
                    "price": 4728,
                    "about": "enim minim ipsum commodo quis nulla eiusmod in eiusmod velit do in irure dolore exercitation",
                    "category": "loungeChair",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR51270",

                    "item": "Dawson Sofa",
                    "price": 2945,
                    "about": "aliqua in et consequat id proident commodo Lorem amet laboris qui et elit exercitation deserunt",
                    "category": "coffeeTable",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR46391",

                    "item": "Ruiz Side chair",
                    "price": 5133,
                    "about": "ut nulla ex duis ex tempor cillum dolore dolor proident est ullamco labore reprehenderit ex",
                    "category": "credenza",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR22661",

                    "item": "Orr Sofa",
                    "price": 4140,
                    "about": "reprehenderit deserunt ad ex elit irure deserunt cillum reprehenderit elit laboris Lorem irure ad eu",
                    "category": "nightstand",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR32941",

                    "item": "Gardner Credenza",
                    "price": 3916,
                    "about": "adipisicing laboris amet cupidatat ea ex ullamco aute nulla ad adipisicing anim ad dolor id",
                    "category": "dresser",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR23282",

                    "item": "Rosa Lounge Chair",
                    "price": 3635,
                    "about": "non dolore magna amet exercitation ullamco laboris consequat incididunt duis pariatur non consequat qui id",
                    "category": "sofa",
                    "image": "badilkjairdesk.jpg"
                  },
                  {
                    "MR_id": "MR29319",

                    "item": "Cunningham Dining Table",
                    "price": 3751,
                    "about": "irure in incididunt adipisicing dolor aute aliqua do non laborum non anim adipisicing officia consequat",
                    "category": "sofa",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR35130",

                    "item": "Gilmore Lounge Chair",
                    "price": 2020,
                    "about": "anim voluptate adipisicing nostrud tempor duis voluptate aute tempor amet in veniam sint aute elit",
                    "category": "diningTable",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR18577",

                    "item": "Merrill Credenza",
                    "price": 743,
                    "about": "nisi irure veniam ad excepteur consectetur velit ipsum ex pariatur eiusmod esse proident et eu",
                    "category": "chair",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR30910",

                    "item": "Barber Coffee Table",
                    "price": 678,
                    "about": "nisi eiusmod labore aliquip laborum incididunt pariatur labore sunt quis duis duis ut eu dolore",
                    "category": "bedFrame",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR94947",

                    "item": "Buck Dresser",
                    "price": 6264,
                    "about": "ad deserunt qui aliquip exercitation fugiat fugiat incididunt qui aliqua veniam elit pariatur dolor ea",
                    "category": "loungeChair",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR28035",

                    "item": "Delaney Lounge Chair",
                    "price": 1054,
                    "about": "adipisicing cupidatat deserunt aliqua officia minim mollit excepteur cupidatat quis minim anim consequat ex mollit",
                    "category": "coffeeTable",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR18195",

                    "item": "Graves Lounge Chair",
                    "price": 7326,
                    "about": "veniam id do eu in anim nulla mollit culpa aliqua nostrud et dolore velit anim",
                    "category": "chair",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR47019",

                    "item": "Spence Lounge Chair",
                    "price": 858,
                    "about": "exercitation laborum consequat et amet mollit aliquip nostrud mollit laboris Lorem sint et labore laboris",
                    "category": "coffeeTable",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR86637",

                    "item": "Moses Side chair",
                    "price": 3882,
                    "about": "amet consequat ea eiusmod reprehenderit cillum elit officia labore reprehenderit qui commodo cillum anim commodo",
                    "category": "bedFrame",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR96896",

                    "item": "James Side chair",
                    "price": 6407,
                    "about": "do ex dolore culpa dolor duis nostrud officia consequat veniam consequat voluptate sit minim velit",
                    "category": "diningTable",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR68970",

                    "item": "Velez Sofa",
                    "price": 7403,
                    "about": "duis nostrud duis proident nostrud elit sint officia aliquip amet cupidatat magna occaecat commodo excepteur",
                    "category": "sideChair",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR64953",

                    "item": "Merritt Bed Frame",
                    "price": 2079,
                    "about": "qui velit ex adipisicing magna consectetur anim non esse aliqua occaecat deserunt enim adipisicing aliqua",
                    "category": "chair",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR55843",

                    "item": "Hood Side chair",
                    "price": 3123,
                    "about": "commodo non tempor reprehenderit adipisicing cillum excepteur occaecat do eu labore ut laboris irure in",
                    "category": "loungeChair",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR42665",

                    "item": "Mcconnell Coffee Table",
                    "price": 3052,
                    "about": "elit ipsum Lorem anim excepteur ea non eiusmod commodo aliquip in dolore adipisicing pariatur fugiat",
                    "category": "diningTable",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR51603",

                    "item": "Burns Credenza",
                    "price": 7080,
                    "about": "ullamco consectetur ullamco exercitation sunt pariatur adipisicing voluptate excepteur ullamco enim voluptate ex aliqua do",
                    "category": "officeChair",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR10753",

                    "item": "Bradshaw Coffee Table",
                    "price": 5945,
                    "about": "et est sint anim incididunt sit excepteur deserunt cillum deserunt velit amet eu ipsum qui",
                    "category": "nightstand",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR14204",

                    "item": "Terrell Bed Frame",
                    "price": 7228,
                    "about": "eiusmod laborum laboris nulla aliqua laborum labore officia amet ex tempor labore nostrud enim veniam",
                    "category": "sideChair",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR52194",

                    "item": "Gordon Nightstand",
                    "price": 5797,
                    "about": "laborum laboris fugiat excepteur veniam consectetur dolore sit exercitation Lorem aliquip incididunt ex adipisicing exercitation",
                    "category": "sideChair",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR62025",

                    "item": "Holt Coffee Table",
                    "price": 7091,
                    "about": "est eiusmod nisi duis nulla anim ea do nisi ad consequat irure eiusmod duis laboris",
                    "category": "diningTable",
                    "image": "ionchairorangered.jpg"
                  },
                  {
                    "MR_id": "MR36051",

                    "item": "Palmer Dining Table",
                    "price": 854,
                    "about": "anim minim ipsum eiusmod ad eiusmod cillum officia fugiat non adipisicing proident qui in exercitation",
                    "category": "coffeeTable",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR67666",

                    "item": "Meyers Chair",
                    "price": 6151,
                    "about": "Lorem magna amet commodo laborum proident cillum veniam nisi dolore Lorem fugiat deserunt veniam est",
                    "category": "coffeeTable",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR29325",

                    "item": "Mack Nightstand",
                    "price": 4644,
                    "about": "nulla sit aliqua eu sit irure labore occaecat pariatur est do ex amet ut veniam",
                    "category": "coffeeTable",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR60202",

                    "item": "Griffith Sofa",
                    "price": 5062,
                    "about": "elit elit voluptate nulla non id velit ipsum elit minim ipsum tempor aliqua cupidatat consequat",
                    "category": "chair",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR13355",

                    "item": "Garrison Side chair",
                    "price": 5710,
                    "about": "anim excepteur laborum excepteur aliquip amet reprehenderit commodo sint excepteur nulla reprehenderit laboris velit ea",
                    "category": "loungeChair",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR13750",

                    "item": "Decker Credenza",
                    "price": 1792,
                    "about": "non exercitation veniam culpa ea cillum reprehenderit dolore laboris laboris sint fugiat non cillum magna",
                    "category": "sideChair",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR85793",

                    "item": "Velasquez Credenza",
                    "price": 6747,
                    "about": "minim adipisicing nulla non non veniam aliqua mollit reprehenderit ea voluptate excepteur incididunt amet velit",
                    "category": "sideChair",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR55647",

                    "item": "Franks Chair",
                    "price": 4157,
                    "about": "irure laborum exercitation proident adipisicing reprehenderit excepteur elit anim aliquip pariatur cupidatat nostrud nulla consequat",
                    "category": "nightstand",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR70020",

                    "item": "Burgess Bed Frame",
                    "price": 5883,
                    "about": "labore consectetur incididunt proident nostrud deserunt id est ullamco amet Lorem dolor occaecat qui ullamco",
                    "category": "bedFrame",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR96295",

                    "item": "Meadows Lounge Chair",
                    "price": 899,
                    "about": "officia voluptate excepteur cillum aute fugiat adipisicing adipisicing laboris sint est dolore aute cupidatat irure",
                    "category": "sideChair",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR59754",

                    "item": "Serrano Coffee Table",
                    "price": 1957,
                    "about": "consequat in dolore occaecat pariatur id nostrud ut ea incididunt ipsum sit ea nostrud fugiat",
                    "category": "nightstand",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR87694",

                    "item": "Lang Dining Table",
                    "price": 7028,
                    "about": "est irure minim id anim laborum duis dolore aute do aute aliqua officia pariatur irure",
                    "category": "coffeeTable",
                    "image": "ionchairorangered.jpg"
                  },
                  {
                    "MR_id": "MR45760",

                    "item": "Fletcher Dresser",
                    "price": 2125,
                    "about": "ullamco labore voluptate esse in nulla laboris ad qui cupidatat labore occaecat laboris voluptate aute",
                    "category": "sofa",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR30164",

                    "item": "Burt Nightstand",
                    "price": 6818,
                    "about": "irure cillum dolore quis consequat quis quis aliquip aliqua cillum deserunt ipsum labore laboris cupidatat",
                    "category": "coffeeTable",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR73209",

                    "item": "Bolton Lounge Chair",
                    "price": 3389,
                    "about": "culpa duis reprehenderit occaecat reprehenderit pariatur voluptate aliqua enim reprehenderit minim quis nisi ad aliqua",
                    "category": "chair",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR48214",

                    "item": "Hobbs Credenza",
                    "price": 7285,
                    "about": "veniam aliquip ea enim ipsum Lorem amet sit aliquip ullamco minim id cupidatat laboris pariatur",
                    "category": "sideChair",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR12958",

                    "item": "Bowman Office chair",
                    "price": 1400,
                    "about": "duis esse amet in est ipsum ex ut id fugiat ipsum est id exercitation non",
                    "category": "sideChair",
                    "image": "badilkjairdesk.jpg"
                  },
                  {
                    "MR_id": "MR88795",

                    "item": "Logan Nightstand",
                    "price": 6975,
                    "about": "labore non aliquip ea ea sunt in nulla consequat id mollit amet esse nostrud pariatur",
                    "category": "credenza",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR12380",

                    "item": "Morgan Dining Table",
                    "price": 4584,
                    "about": "laboris ex tempor et sit adipisicing Lorem deserunt nisi voluptate consectetur eu nulla non incididunt",
                    "category": "nightstand",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR80284",

                    "item": "Talley Office chair",
                    "price": 2546,
                    "about": "cillum incididunt occaecat dolor et magna qui pariatur minim reprehenderit fugiat aliquip dolore labore proident",
                    "category": "sideChair",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR92277",

                    "item": "Douglas Sofa",
                    "price": 642,
                    "about": "cupidatat anim amet anim reprehenderit cillum ipsum labore dolore sit et laboris duis duis non",
                    "category": "dresser",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR55350",

                    "item": "Blair Credenza",
                    "price": 2002,
                    "about": "aliqua occaecat sit consectetur sunt id mollit quis exercitation reprehenderit nulla magna labore elit aute",
                    "category": "nightstand",
                    "image": "badilkjairdesk.jpg"
                  },
                  {
                    "MR_id": "MR87797",

                    "item": "Delacruz Dresser",
                    "price": 586,
                    "about": "et pariatur laboris pariatur dolor qui enim adipisicing commodo ad consectetur irure dolore esse fugiat",
                    "category": "loungeChair",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR40895",

                    "item": "Horton Sofa",
                    "price": 1356,
                    "about": "dolore sint voluptate ex dolor in aute et nisi et ad proident ex ea esse",
                    "category": "officeChair",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR61412",

                    "item": "Valenzuela Nightstand",
                    "price": 1636,
                    "about": "veniam irure ad Lorem sint ad occaecat duis eiusmod sint ea aliqua velit laborum veniam",
                    "category": "nightstand",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR15773",

                    "item": "Kent Sofa",
                    "price": 3200,
                    "about": "qui aliqua commodo adipisicing culpa esse occaecat sunt magna proident dolore pariatur excepteur velit labore",
                    "category": "bedFrame",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR17730",

                    "item": "Singleton Side chair",
                    "price": 3347,
                    "about": "non incididunt dolore nisi et ut in adipisicing ullamco amet quis mollit exercitation cillum consectetur",
                    "category": "bedFrame",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR68742",

                    "item": "Frost Bed Frame",
                    "price": 4574,
                    "about": "dolore aliquip sit tempor exercitation nulla ea quis qui excepteur ea eu veniam incididunt voluptate",
                    "category": "diningTable",
                    "image": "badilkjairdesk.jpg"
                  },
                  {
                    "MR_id": "MR60198",

                    "item": "Chase Bed Frame",
                    "price": 5722,
                    "about": "sit fugiat eiusmod nostrud mollit dolor aliqua laboris aute minim culpa ad commodo aliquip dolor",
                    "category": "officeChair",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR30945",

                    "item": "May Lounge Chair",
                    "price": 1583,
                    "about": "commodo labore aliqua nisi nulla tempor ipsum consectetur do proident deserunt nulla laborum voluptate deserunt",
                    "category": "coffeeTable",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR21983",

                    "item": "Newton Office chair",
                    "price": 5218,
                    "about": "pariatur tempor nulla sint elit ipsum in anim culpa officia amet labore elit elit nulla",
                    "category": "nightstand",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR68201",

                    "item": "Stone Dining Table",
                    "price": 3559,
                    "about": "commodo dolore ullamco sit labore aliqua esse dolor non sint aliqua do sint pariatur ipsum",
                    "category": "loungeChair",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR84772",

                    "item": "Villarreal Chair",
                    "price": 4973,
                    "about": "deserunt ea ea duis pariatur qui esse et adipisicing qui est id cillum commodo labore",
                    "category": "diningTable",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR87051",

                    "item": "Sharp Office chair",
                    "price": 1434,
                    "about": "veniam et incididunt magna do nostrud tempor exercitation irure veniam aute pariatur officia tempor culpa",
                    "category": "loungeChair",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR81263",

                    "item": "Gibbs Lounge Chair",
                    "price": 6146,
                    "about": "ut nostrud reprehenderit duis est ad ut in culpa reprehenderit culpa nostrud anim labore consectetur",
                    "category": "sideChair",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR10015",

                    "item": "Keith Office chair",
                    "price": 4946,
                    "about": "voluptate culpa consectetur deserunt elit quis esse adipisicing voluptate nulla duis ad deserunt fugiat in",
                    "category": "chair",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR37360",

                    "item": "Clayton Office chair",
                    "price": 7570,
                    "about": "ex aute incididunt cillum velit consequat proident nisi irure ad irure eu sint esse ipsum",
                    "category": "bedFrame",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR88050",

                    "item": "Parks Bed Frame",
                    "price": 6176,
                    "about": "esse est sint esse quis proident reprehenderit esse Lorem adipisicing excepteur labore dolore tempor anim",
                    "category": "bedFrame",
                    "image": "ionchairorangered.jpg"
                  },
                  {
                    "MR_id": "MR73707",

                    "item": "Dominguez Credenza",
                    "price": 7186,
                    "about": "excepteur commodo anim do ullamco occaecat cupidatat exercitation est quis Lorem consectetur ullamco aliquip tempor",
                    "category": "coffeeTable",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR10531",

                    "item": "Payne Nightstand",
                    "price": 5190,
                    "about": "elit minim id veniam Lorem qui aliquip adipisicing veniam quis id sit duis tempor ad",
                    "category": "diningTable",
                    "image": "rowlandchairs.jpg"
                  },
                  {
                    "MR_id": "MR74505",

                    "item": "Hampton Dresser",
                    "price": 4824,
                    "about": "ut aute nostrud ullamco ea consectetur eu adipisicing non aute ex reprehenderit culpa nisi anim",
                    "category": "sofa",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR57275",

                    "item": "Guzman Side chair",
                    "price": 2658,
                    "about": "non id enim cupidatat do pariatur adipisicing consectetur mollit incididunt excepteur minim ex aute laborum",
                    "category": "dresser",
                    "image": "badilkjairdesk.jpg"
                  },
                  {
                    "MR_id": "MR55342",

                    "item": "Morrow Side chair",
                    "price": 4740,
                    "about": "et ad magna mollit eu mollit pariatur est ea fugiat proident aliquip velit enim reprehenderit",
                    "category": "credenza",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR42122",

                    "item": "Mcmillan Dining Table",
                    "price": 2716,
                    "about": "quis reprehenderit velit adipisicing consectetur occaecat eu laborum aliquip fugiat ad sunt nisi nisi duis",
                    "category": "bedFrame",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR27183",

                    "item": "Norman Office chair",
                    "price": 1287,
                    "about": "ad laborum sint pariatur amet enim et reprehenderit consectetur aute ipsum veniam eu officia dolore",
                    "category": "sofa",
                    "image": "badilkjairdesk.jpg"
                  },
                  {
                    "MR_id": "MR65044",

                    "item": "Bradford Bed Frame",
                    "price": 3079,
                    "about": "sint fugiat consequat eu commodo consequat enim proident dolor laborum labore fugiat elit duis tempor",
                    "category": "diningTable",
                    "image": "gonzochair.jpg"
                  },
                  {
                    "MR_id": "MR76445",

                    "item": "Moss Sofa",
                    "price": 6887,
                    "about": "Lorem enim eu magna esse commodo cillum duis aliquip anim enim eu eu consequat veniam",
                    "category": "coffeeTable",
                    "image": "gonzocredenza.jpg"
                  },
                  {
                    "MR_id": "MR87896",

                    "item": "Flores Coffee Table",
                    "price": 5632,
                    "about": "exercitation excepteur non labore adipisicing laboris est ad ad consequat minim magna sit et et",
                    "category": "sofa",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR23700",

                    "item": "Burks Chair",
                    "price": 4188,
                    "about": "aute occaecat in aliqua esse laborum magna enim duis velit eiusmod ad officia sunt culpa",
                    "category": "chair",
                    "image": "saarinen.jpg"
                  },
                  {
                    "MR_id": "MR58553",

                    "item": "Sharpe Coffee Table",
                    "price": 1004,
                    "about": "deserunt duis enim tempor officia eu commodo exercitation eiusmod enim ut aliqua id commodo dolor",
                    "category": "dresser",
                    "image": "baughman.jpg"
                  },
                  {
                    "MR_id": "MR65773",

                    "item": "Leblanc Coffee Table",
                    "price": 1120,
                    "about": "ipsum aliqua nulla aliqua excepteur labore quis deserunt quis aute aliqua exercitation fugiat amet occaecat",
                    "category": "nightstand",
                    "image": "eameslounge.jpg"
                  },
                  {
                    "MR_id": "MR57905",

                    "item": "Higgins Nightstand",
                    "price": 3904,
                    "about": "cillum quis dolor reprehenderit eu magna dolore eiusmod cillum nostrud ex non dolor dolor ex",
                    "category": "coffeeTable",
                    "image": "ionchairorangered.jpg"
                  },
                  {
                    "MR_id": "MR10284",

                    "item": "Stephenson Office chair",
                    "price": 7335,
                    "about": "nisi tempor enim tempor exercitation voluptate et nisi ea velit fugiat magna exercitation cillum tempor",
                    "category": "chair",
                    "image": "knolltable.jpg"
                  },
                  {
                    "MR_id": "MR11995",

                    "item": "Walters Dresser",
                    "price": 3757,
                    "about": "deserunt est consectetur sit dolore aute sunt aliquip velit fugiat aute voluptate in aliquip dolor",
                    "category": "bedFrame",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR15992",

                    "item": "Fulton Bed Frame",
                    "price": 510,
                    "about": "anim ullamco consectetur tempor non nisi velit ad officia fugiat voluptate do exercitation quis quis",
                    "category": "coffeeTable",
                    "image": "girardchair.jpg"
                  },
                  {
                    "MR_id": "MR87111",

                    "item": "Saunders Lounge Chair",
                    "price": 4523,
                    "about": "fugiat irure incididunt exercitation deserunt fugiat irure Lorem ut nisi duis consequat proident qui cillum",
                    "category": "credenza",
                    "image": "gonzocredenza.jpg"
                  }

        ]

    "use strict";

    Parse.PageRouter = Parse.Router.extend({
        initialize: function(){
            console.log('routing started');
            this.navView= new Parse.NavView()
            this.homeView = new Parse.HomeView();
            this.productsListView = new Parse.ProductPageView();
            this.singleListingView = new Parse.SingleListingView();
            this.cartView = new Parse.ShoppingCartView();
            this.thankCustomer = new Parse.ThanksView()
            console.log(dummyData)

            var dataLength = dummyData.length;

            dummyData.forEach(function(dataObj){
                var dummyModelInst = new Parse.DummyFurnitureItem(dataObj)
               dummyModelInst.save().then(function(data){
                    console.log(data)
                    console.log('save successful')
               })
                
           })

            Parse.history.start()
        },

        routes:{
            'thankyou': 'loadThankCustomer',
            'shopping-cart' : 'loadShoppingCart',
            'product/:id':'loadSingleListing',
            'product': 'loadProductPg',
            '*default': 'home'
        },

        home: function(){
            this.navView.render();
            this.homeView.render();
        },

        checkNavCheckFooter:function(){
            var navEl = document.querySelector('nav');
             navEl.innerHTML.indexOf('div') === -1 ? this.navView.render(): console.log('falsy');
            //make logic for checking footer
        },

        loadProductPg: function(){
            console.log('product-page loaded')
            this.checkNavCheckFooter()
            this.productsListView.render();
        },

        loadSingleListing: function(id){
            this.checkNavCheckFooter()
            console.log('single-listing loaded');
            this.singleListingView.render();
        },

        loadShoppingCart: function(){
            this.checkNavCheckFooter()
            this.cartView.render();
        },

        loadOrderConfirmation: function(){
            this.checkNavCheckFooter();
            this.orderConfView.render()
        },

        loadThankCustomer:function(){
            this.checkNavCheckFooter();
            this.thankCustomer.render();
        }
    })


    Parse.HomeView = Parse.TemplateView.extend({
        view: 'homepage',
        el: '.wrapper',
        events: {
            "click a.browse-listings-btn": "goToProductPage"
        },

        goToProductPage: function(evt){
            evt.preventDefault();
            console.log('event hurrrd')
            window.location.hash="/product"
        }

        })

    Parse.NavView = Parse.TemplateView.extend({
        view: 'navigation',
        el: 'nav',
    })

    Parse.ProductPageView = Parse.TemplateView.extend({
        view: 'product-page',
        el: '.wrapper',
        events:{
            'click .more-info': 'triggerSingleListingHash'
        },

        triggerSingleListingHash: function(evt){
            evt.preventDefault();
            var productId = $(evt.target).closest('.img-listing-container').attr('data-productID')
            window.location.hash="/product/"+productId;
        }
    })

    Parse.SingleListingView = Parse.TemplateView.extend({
        view: 'single-listing',
        el: '.wrapper',
        events: {
            'click .cart-link':"triggerShoppingCartHash"
        },

        triggerShoppingCartHash: function(evt){
            evt.preventDefault();
            window.location.hash="/shopping-cart"
        }
    })

    Parse.ShoppingCartView = Parse.TemplateView.extend({
        view: 'shopping-cart',
        el: '.wrapper',
        events: {
            "click a.confirm-purchase" : "triggerThanksHash"
        },
        triggerThanksHash: function(evt){
            evt.preventDefault()
            console.log('hey')
            window.location.hash = "/thankyou"
        }
    })

    Parse.ThanksView = Parse.TemplateView.extend({
        view: 'thank-customer',
        el: '.wrapper'
    })

    Parse.DummyFurnitureItem = Parse.Object.extend({
        className: "DummyItem",

        defaults: {
            mrID: "",
            item: "",
            price: 0,
            description:"",
            // img:"",
            // color: "",
            category: "" // Sofa, Dining-Table, Bedframe, Rug
            // timePeriod: // 
            // styleTags:, // Scandi, Art-Deco, Industrial, Contemporary
            // status: "",
            // manufactureDate: 0,
            // condition:"",
            // height: 0,
            // width: 0,
            // depth: 0,
            // dateOfEntry: 0,
            // newArrival: false,
            // inventoryStatus: {
            //     listed: true
            //     available: true,
            //     shipped: false,
            //     successfulDelivery: false
            //     },
            // sold: false,
            // clearance: false,

        },

        initialize: function(){
            var self

            //sanity check for price: if no price entered, then listed=false
            
            this.on('change', function(){
                self.save()
            })
        }, 

        validate: function(){
            //validate item name
            //validate item category
            //validate MR-ID
            //validate: listing-status

        }
    })

    Parse.FurnitureGroup = Parse.Collection.extend({
        model: Parse.FurnitureItem,

    })
    


    exports.PageRouter = Parse.PageRouter;

})(typeof module === "object" ? module.exports : window);