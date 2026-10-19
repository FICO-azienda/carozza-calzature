# Carozza Calzature · sito demo (FICO)

Sito vetrina statico (HTML + CSS + JS vanilla, nessuna dipendenza né build). Ispirazione visiva: spica-inc.jp (fondo crema, serif display, etichette maiuscole spaziate, card con iniziali giganti, bande bordeaux, linguette laterali e scheda "Visita" fissa).

## Avvio in locale

```bash
cd carozza-calzature
python3 -m http.server 4324
```

Poi apri http://localhost:4324. Si può pubblicare così com'è su Vercel, Netlify o GitHub Pages.

## Struttura

- `index.html`: pagina unica con Hero, La bottega (storia e timeline), Interni, Collezioni, Consulenza (consigli e plantare Bionaïf), Recensioni, Instagram, Orari e contatti, Footer
- `css/style.css`: stili e responsive (menu a tutto schermo e barra Chiama/Indicazioni su smartphone)
- `js/main.js`: header compatto, menu mobile, stato "aperto ora" (ora di Milano), mappa caricata su clic, scheda Visita fissa, animazioni di comparsa (disattivate con prefers-reduced-motion)
- `images/`: foto in JPG/WebP (Google Maps a 900 e 1800 px; Instagram a 640 px, il massimo disponibile senza login), più il logo FICO

## Fonti dei dati (verificate il 19/10/2026)

Scheda Google Maps "Carozza Calzature":
- Categoria: Negozio di scarpe
- Indirizzo: Via Luigi Canonica 59, 20154 Milano MI
- Telefono: 02 3360 1721
- Orari: Lun 10–13 e 15:30–19:30 · Mar–Sab 9:30–13:30 e 15:30–19:30 · Dom chiuso
- Valutazione: 4,7 con 44 recensioni (dato che cambia nel tempo). Citazioni prese dalle recensioni pubbliche e dagli estratti in evidenza

Instagram @carozza.calzature:
- Bio: "Bottega storica dal 1956", scarpe donna, uomo e bambini, "da tre generazioni"
- Post del 15/10/2026: 70 anni di attività festeggiati in negozio
- Post del 12/10/2026: evento in negozio con il Club Imprese Storiche e test Bionaïf
- Post del 13/04/2026: plantare Bionaïf, caratteristiche e prezzo (69 €)
- Post del 16/04/2026: i tre requisiti della scarpa per fascite plantare / metatarso
- Post dell'01/10/2026 (mocassini) e dell'08/10/2026 (sneakers, Gore-Tex)
- Marchi citati o visibili: Birkenstock, Grünland, Tamaris, Ecco (cartellino in vetrina), Bionaïf
- Post di @giovaniconfcommerciomi (28/07/2026): negozio aperto dal nonno nel 1956, oggi c'è Marta

## Foto

| File | Fonte | Soggetto |
|---|---|---|
| vetrina-insegna-angolo | Google Maps (foto sferica, ritagliata) | Insegna curva CAROZZA sull'angolo (hero desktop) |
| ingresso-insegna-carozza | Google Maps | Ingresso con insegna (hero mobile, sezione bottega) |
| interno-bottega-scaffali | Google Maps (foto sferica, ritagliata) | Interno con banco in legno |
| interno-poltrone-blu | Google Maps (foto sferica, ritagliata) | Interno con poltroncine blu e moquette rossa |
| vetrina-calzature-comfort | Google Maps | Vetrina scarpe comfort |
| vetrina-zoccoli-birkenstock | Google Maps | Vetrina zoccoli Birkenstock |
| ig-* | Copertine dei reel di @carozza.calzature | Mocassini, sneakers, sandali, plantare, ecc. |

Prima della pubblicazione definitiva serve l'autorizzazione della titolare, anche perché nelle copertine Instagram compare una persona.
