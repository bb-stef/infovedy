---
title: Úvod do tématu a vymezení subtémat
popis: Co jsou big data, jak se vymezují a co se v rámci tématu zkoumá.
autori: []
stav: koncept
---

**Související termíny:** data science, data mining, datová analytika, strojové učení, rozhodování na základě dat.

## Co to je

Pro termín big data neexistuje jedna společná definice. O tom, zda se již jedná o big data (velká data), nebo ne, se můžeme rozhodovat na základě charakteristik, které jsou pro tuto problematiku společné napříč zdroji, jež se velkými daty zabývají.

Obecně jsou pojmem big data označovány soubory dat, jejichž velikost, složitost a rychlost generování přesahují možnosti běžných softwarových nástrojů a relačních databází pro jejich efektivní ukládání, správu i analýzu v rozumném čase a s přijatelnými náklady.[^fishleigh] Jinými slovy se tedy jedná o druh dat, který neumíme zpracovat v přiměřeném čase a za vynaložení rozumných sil a prostředků.[^cerny]

Chápání toho, co big data jsou a co naopak nejsou, se historicky vyvíjelo v závislosti na vývoji informačních technologií. Jako příklad nám může posloužit původní vymezení problému velkých dat, které ve své práci popsali Michael Cox a David Ellsworth: problém velkých dat pro ně znamenal, že velikost datové sady překročila kapacitu hlavní operační paměti a také kapacitu lokálních či vzdálených disků.[^cox]

Oproti tomu se dnes měřítko pro velká data pohybuje mezi terabajty a zettabajty. Do éry zettabajtů (10<sup>21</sup> B) se podle analýz společnosti Cisco dostal svět v roce 2016.[^wu]

## Model V

Velká data byla původně definována a spojována se třemi základními koncepty: objem (*Volume*), rychlost (*Velocity*) a různorodost (*Variety*).[^mcafee] Tyto tři koncepty byly později rozšířeny ještě o proměnlivost (*Variability*) a hodnotu či užitečnost informací, které data nesou (*Value*).

### Volume (objem)

Objem dat můžeme vnímat jako:

- **kumulativní objem** – kolik dat máme uloženo a kolik dat zpracováváme,
- **příchozí datový tok** – kolik nových dat přibývá za určitý čas.

### Velocity (rychlost)

Rychlost generování dat, jejich přenášení a analýzy a schopnost systémů reagovat na podněty v téměř reálném čase. V tomto kontextu se často používá termín *fast data*.[^wu]

Data mohou vznikat:

- **kontinuálně v reálném čase** – nepřetržitě každou vteřinu (např. elektroměr, senzor, GPS poloha telefonu),
- **sporadicky v reálném čase** – nárazově podle událostí (kliknutí na webu, nákup kartou apod.).

Podle toho se rozhoduji, zda chci data zpracovat:

- **ihned (real time)** – ve chvíli, kdy informace okamžitě ztrácí svou hodnotu nebo musím na zjištění okamžitě reagovat, tzv. fast data (např. bankovní systémy a odhalování platebních podvodů),
- **později dávkově (batch)** – stačí mi souhrn za den, hodinu, měsíc apod. Dávkově zpracovaná data často poskytují spolehlivý a metodicky vyčištěný celek, proto mohou sloužit pro koncepční a politická rozhodnutí.[^paradigms]

### Variety (různorodost)

Označuje rozmanitost typů, formátů a struktur dat. Existují datové formáty a struktury, které jsou vzájemně nekompatibilní a nekonzistentní.[^wu] Rozlišovat můžeme mezi daty:

| Typ | Popis | Příklad |
| --- | --- | --- |
| strukturovanými | mají předem definovanou strukturu | výpůjční záznamy v knihovně |
| polostrukturovanými | mají organizační prvky, ale ne pevnou tabulkovou strukturu | formáty JSON, XML |
| nestrukturovanými | jednotnou strukturu nemají předem stanovenou, což zásadně ztěžuje jejich strojové zpracování | volný text, fotografie, videa |

Různorodost dat nespočívá pouze v mnoha typech dat, ale také v různorodosti oblastí a zdrojů, ze kterých data pocházejí.[^nist] Různorodost není specifikem pouze big data; v kontextu zpracování velkého množství dat jsou ale taková data náročná na zpracování, a to zejména pro počítačové vědce, kteří byli historicky zvyklí pracovat výhradně s relačními tabulkami.[^kitchin]

### Další V

- **Veracity** – důvěryhodnost, pravdivost: spolehlivost a kvalita dat.[^value]
- **Value** – schopnost vytěžit ze surových dat prakticky uplatnitelné poznatky, které podpoří strategické rozhodování.
- **Variability** – význam a struktura dat se mění v čase a v různých kontextech.[^kitchin]
- **Visibility** – znalost kontextu a celkového obrazu dat poskytuje zpětný pohled (*hindsight*), porozumění problému (*insight*) a předpověď (*foresight*).
- **Validity** – statistická a logická správnost sběru dat a inferenčních modelů bez zkreslení.
- **Verdict** – konečné rozhodnutí nebo volba, kterou má na základě datové inteligence učinit vedení.

## Co se v rámci big data zkoumá

- **Výzkum samotných velkých dat** – jak je získávat, ukládat, propojovat, analyzovat, interpretovat a bezpečně využívat.
- **Výzkum s pomocí velkých dat** – jak rozsáhlé soubory využívat k poznávání konkrétních jevů; v našem oboru například k poznávání informačního chování.

## Subtémata

<!-- Doplnit: vymezení subtémat, kterým se materiál věnuje (výstup z týmového brainstormu). -->

*Doplnit vymezení subtémat.*

[^fishleigh]: FISHLEIGH, Jackie. A Non-Technical Journey into the World of Big Data: an Introduction. *Legal Information Management*. Cambridge University Press, 2014, roč. 14, č. 2, s. 149–151. ISSN 1472-6696. DOI: [10.1017/S1472669614000358](https://doi.org/10.1017/S1472669614000358)

[^cerny]: ČERNÝ, Michal. Big data a jejich možnosti v kontextu knihoven. *Knihovna*. Roč. 24, č. 1, s. 104–111. ISSN 1801-3252.

[^cox]: COX, M. a D. ELLSWORTH. Application-controlled demand paging for out-of-core visualization. 1997. DOI: [10.1109/VISUAL.1997.663888](https://doi.org/10.1109/VISUAL.1997.663888)

[^wu]: WU, C., R. BUYYA a K. RAMAMOHANARAO. Chapter 1 – Big Data Analytics = Machine Learning + Cloud Computing. In: *Big Data*. Elsevier, 2016, s. 3–38. ISBN 978-0-12-809346-7. DOI: [10.1016/B978-0-12-805394-2.00001-5](https://doi.org/10.1016/B978-0-12-805394-2.00001-5)

[^mcafee]: MCAFEE, Andrew a Erik BRYNJOLFSSON. Big data: the management revolution. *Harvard Business Review*. 2012, roč. 90, č. 10, s. 60–66, 68, 128. ISSN 0017-8012.

[^paradigms]: *Big Data: Principles and Paradigms*. [Doplnit úplnou citaci.]

[^nist]: NIST BIG DATA PUBLIC WORKING GROUP DEFINITIONS AND TAXONOMIES SUBGROUP. *NIST Big Data Interoperability Framework: Volume 1, Definitions*. National Institute of Standards and Technology, 2015. DOI: [10.6028/NIST.SP.1500-1](https://doi.org/10.6028/NIST.SP.1500-1)

[^kitchin]: KITCHIN, Rob a Gavin MCARDLE. What makes Big Data, Big Data? Exploring the ontological characteristics of 26 datasets. *Big Data & Society*. 2016, roč. 3, č. 1. ISSN 2053-9517. DOI: [10.1177/2053951716631130](https://doi.org/10.1177/2053951716631130)

[^value]: Big Data for Creating and Capturing Value in the Digitalized Environment: Unpacking the Effects of Volume, Variety, and Veracity on Firm Performance. DOI: [10.1111/jpim.12545](https://doi.org/10.1111/jpim.12545) [Doplnit autory.]
