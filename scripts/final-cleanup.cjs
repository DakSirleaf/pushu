const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Manual cleanup of remaining revealing parenthetical content
const manualFixes = {
  152: { optIndex: 1, newText: "Stimulants" },
  153: { optIndex: 1, newText: "SSRIs" },
  154: { optIndex: 1, newText: "SSRIs" },
  202: { optIndex: 1, newText: "Corticosteroids" },
  246: { optIndex: 1, newText: "Second-generation antihistamines" },
  296: { optIndex: 1, newText: "Hyponatremia" },
  331: { optIndex: 1, newText: "Patient-centered care" },
  389: { optIndex: 1, newText: "Add IM antipsychotic" },
  413: { optIndex: 3, newText: "Switch to GUANFACINE" },
  429: { optIndex: 2, newText: "ANTICHOLINERGICS IM/IV" },
  414: { optIndex: 3, newText: "LAMOTRIGINE" }, // Also clean this one
  432: { optIndex: 2, newText: "TCAs, SNRIs, or pregabalin" },
  477: { optIndex: 3, newText: "LORAZEPAM" },
};

let fixCount = 0;
data.forEach(q => {
  if (manualFixes[q.id]) {
    const fix = manualFixes[q.id];
    const oldText = q.options[fix.optIndex];
    q.options[fix.optIndex] = fix.newText;
    console.log(`Q${q.id} Opt${fix.optIndex}: "${oldText.substring(0, 50)}..." → "${fix.newText}"`);
    fixCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\n=== FINAL CLEANUP: ${fixCount} options fixed ===`);
