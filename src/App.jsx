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
      const zeilen = eingabe.trim().split("\n");

      let ergebnis = {};

      zeilen.forEach(el => {
         const [id, fnb] = el.split("\t");
         if (!ergebnis[fnb]) {
            ergebnis[fnb] = [];
         }
         ergebnis[fnb].push(id);
      });

      ergebnis = Object.keys(ergebnis).map(key => ({
         id: key,
         werte: ergebnis[key]
      }));

      const outI = ergebnis.map(el => `${el.id}:\n${el.werte.join("\n")}`).join("\n\n");
      setAusgabeI(outI);

      ergebnis = ergebnis.map(el => ({ ids: el.id.split("/ "), werte: el.werte }));

      // ;

      const outII = ergebnis
         .map(
            el =>
               `${el.ids.length > 1 ? `${initial(el.ids).join(", ")} und ${last(el.ids)}` : head(el.ids)} ${
                  el.werte.length > 1 ? "die Maßnahmen mit den ID-Nummern" : "die Maßnahme mit der ID-Nummer"
               } ${el.werte.length > 1 ? `${initial(el.werte).join(", ")} und ${last(el.werte)}` : head(el.werte)} der Anlage 3 als ${
                  el.ids.length > 1 ? "alleinige Projektverantwortliche" : "alleiniger Projektverantwortlicher"
               } zur Genehmigung beantragt,`
         )
         .join("\n\n");

      setAusgabeII(outII);
   };

   return (
      <div className="min-h-screen flex justify-center items-center gap-8">
         <textarea className="w-96 h-[36rem]" value={eingabe} onChange={e => setEingabe(e.target.value)} placeholder="Input: Zwei Spalten"></textarea>
         <button
            type="button"
            onClick={handleButtonClick}
            className="block rounded-full p-2 bg-stone-100 border border-stone-300 transition duration-200 hover:bg-white focus:outline-none focus:bg-white"
         >
            <FastForwardIcon className="w-6 h-6" />
         </button>
         <textarea className="w-96 h-[36rem]" value={ausgabeI} readOnly></textarea>
         <textarea className="w-96 h-[36rem]" value={ausgabeII} readOnly></textarea>
      </div>
   );
};

export default App;
