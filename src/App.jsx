import { useState } from "react";

import { FastForwardIcon } from "@heroicons/react/solid";

import initial from "lodash/initial.js";
import last from "lodash/last.js";
import head from "lodash/head.js";

const App = () => {
   const [eingabe, setEingabe] = useState("");
   const [ausgabeI, setAusgabeI] = useState("");
   const [ausgabeII, setAusgabeII] = useState("");

   const handleButtonClick = () => {
      const zeilen = eingabe.trim().split("\n"); // Array aller Zeilen, Beispiel: [ "LN004-01\tbayernets/ OGE", ... ]

      let ergebnis = {};

      zeilen.forEach(zeile => {
         const [id, verketteteFNB] = zeile.split("\t"); // Beispiel: id: "LN004-01", verketteteFNB: "bayernets/ OGE"

         if (!ergebnis[verketteteFNB]) {
            ergebnis[verketteteFNB] = [];
         }
         ergebnis[verketteteFNB].push(id);
      });

      // Beispiel: { "bayernets/ OGE": [ "LN004-01", ... ], ... }

      ergebnis = Object.keys(ergebnis).map(key => ({
         verketteteFNB: key,
         ids: ergebnis[key]
      }));

      // Beispiel: [ { verketteteFNB: "bayernets/ OGE", ids: [ "LN004-01", ... ] }, ... ]

      const outI = ergebnis.map(el => `${el.verketteteFNB}:\n${el.ids.join("\n")}`).join("\n\n");
      setAusgabeI(outI);

      ergebnis = ergebnis.map(el => ({ fnb: el.verketteteFNB.split("/ "), ids: el.ids }));

      // Beispiel: [ { fnb: [ "bayernets", "OGE" ], ids: [ "LN004-01", ... ] }, ... ]

      const outII = ergebnis
         .map(
            el =>
               `${el.fnb.length > 1 ? `${initial(el.fnb).join(", ")} und ${last(el.fnb)}` : head(el.fnb)} ${
                  el.ids.length > 1 ? "die Maßnahmen mit den ID-Nummern" : "die Maßnahme mit der ID-Nummer"
               } ${el.ids.length > 1 ? `${initial(el.ids).join(", ")} und ${last(el.ids)}` : head(el.ids)} der Anlage 3 als ${
                  el.fnb.length > 1 ? "alleinige Projektverantwortliche" : "alleiniger Projektverantwortlicher"
               } zur Genehmigung beantragt,`
         )
         .join("\n\n");

      setAusgabeII(outII);
   };

   return (
      <div className="min-h-screen flex justify-center items-center gap-8">
         <textarea className="w-80 h-[36rem]" value={eingabe} onChange={e => setEingabe(e.target.value)} placeholder="Input: Zwei Spalten aus Excel" />
         <button
            type="button"
            onClick={handleButtonClick}
            className="block rounded-full p-2 bg-stone-100 border border-stone-300 transition duration-200 hover:bg-white focus:bg-white focus:outline-none"
         >
            <FastForwardIcon className="w-6 h-6" />
         </button>
         <textarea className="w-80 h-[36rem]" value={ausgabeI} readOnly />
         <textarea className="w-80 h-[36rem]" value={ausgabeII} readOnly />
      </div>
   );
};

export default App;
