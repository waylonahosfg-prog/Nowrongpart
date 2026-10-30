export interface GuideSection {
  heading: string;
  body: string;
  checklist: string[];
  amazonQuery: string;
  amazonCta: string;
}

export interface GuideArticle {
  slug: string;
  category: string;
  title: string;
  metaDescription: string;
  summary: string;
  sections: GuideSection[];
}

export const guidesData: GuideArticle[] = [
  {
    slug: "mower-keeps-throwing-deck-belt",
    category: "Deck Diagnostics & Repair",
    title: "5 Reasons Your Zero-Turn Keeps Throwing, Rolling, or Shredding Its Deck Belt",
    metaDescription:
      "Replacing a mower belt only for it to pop off or shred again? Learn how mechanics inspect seized idler pulleys, bent spindle housings, weak tensioner springs, and belt routing.",
    summary:
      "When a mower throws or shreds a brand-new Kevlar belt within the first hour of cutting, the belt itself is rarely the culprit. Walk through this 5-point shop inspection before installing your next replacement belt.",
    sections: [
      {
        heading: "1. Seized or Wobbling Flat Idler Pulley Bearings",
        body: "With the deck belt removed, spin every flat idler and V-groove pulley by hand. A healthy pulley spins silently and coasts to a stop without lateral play. If a pulley feels gritty, stops immediately, or tilts more than 2 degrees when rocked, its sealed bearing is failing—creating extreme friction heat that melts belt sidewalls and rolls the belt out of the groove.",
        checklist: [
          "Spin each idler pulley by hand and listen for dry bearing growl",
          "Check the backside flat idler for melted rubber buildup",
          "Verify the stationary idler bolt is torqued flat against the deck reinforcement plate"
        ],
        amazonQuery: "zero turn mower flat idler pulley replacement",
        amazonCta: "Shop Replacement Deck Idler Pulleys on Amazon",
      },
      {
        heading: "2. Weak or Fatigued Deck Tensioner Spring",
        body: "Zero-turn cutter decks rely on a heavy coil spring attached to the pivoting idler arm to maintain constant tension when the electric PTO clutch slams into engagement. Over hundreds of heat cycles, tension springs lose their tempered recoil, allowing the belt to whip violently and jump over the lip of the left-hand spindle pulley.",
        checklist: [
          "Inspect the spring hook ends for deep wear grooves or elongated loops",
          "Make sure the pivoting idler arm swings freely and isn't rusted at the brass bushing",
          "Grease the idler pivot fitting until fresh grease purges"
        ],
        amazonQuery: "mower deck belt tension spring heavy duty",
        amazonCta: "Find Heavy-Duty Deck Tension Springs on Amazon",
      },
      {
        heading: "3. Tilted Deck Spindle Housing or Cracked Deck Shell",
        body: "Striking a tree root or curb with a mower blade transfers massive leverage into the cast-iron or aluminum spindle housing. Even a 3-degree bend in the spindle mounting ring tips the top pulley out of plane, forcing the belt to climb the pulley flange every revolution.",
        checklist: [
          "Place a straightedge across the top of all three spindle pulleys to confirm they sit level",
          "Grab the blade tip and push up/down to check for worn internal spindle bearings",
          "Inspect the steel deck stamping around the 4 spindle mounting bolts for hairline cracks"
        ],
        amazonQuery: "zero turn mower deck spindle assembly replacement",
        amazonCta: "Check Complete Deck Spindle Assemblies on Amazon",
      },
      {
        heading: "4. Using Automotive Rubber Belts Instead of Dry-Wrapped Kevlar",
        body: "Standard black industrial or automotive belts have high-tack rubber exteriors designed to wedge tightly into two pulleys. Mower decks use backside idler pulleys and clutch engagement—requiring a dry fabric cover over an Aramid (Kevlar) tensile cord so the belt can handle shock loads without stretching or grabbing.",
        checklist: [
          "Always verify your replacement belt specifies Aramid or Kevlar cord construction",
          "Confirm exact 1/2-inch (A-section) vs. 5/8-inch (B-section) top width",
          "Check belt routing guides and keeper pins to ensure the pin sits 1/8\" from the pulley"
        ],
        amazonQuery: "kevlar aramid lawn mower deck belt",
        amazonCta: "Browse OEM-Spec Kevlar Deck Belts on Amazon",
      }
    ],
  },
  {
    slug: "hydro-gear-transaxle-service-chart",
    category: "Transmission Maintenance",
    title: "Hydro-Gear EZT vs. ZT-2800, ZT-3100 & ZT-3400 Filter & Fluid Cross-Reference Guide",
    metaDescription:
      "Complete Hydro-Gear transaxle service chart: OEM 52114 filter cross-references (Stens, Wix), 20W-50 fluid capacities, and air-purging bleed procedures for zero-turn mowers.",
    summary:
      "Hydrostatic transaxles are the single most expensive component on a zero-turn mower ($800–$1,600 per side). Changing the 20W-50 fluid and spin-on filter at the initial 75-hour break-in and every 250–300 hours thereafter doubles the life of your wheel motors.",
    sections: [
      {
        heading: "1. Identify Your Hydro-Gear Model Tier (EZT vs. ZT-2800/3100/3400/5400)",
        body: "Look under the rear frame of your mower for the white barcode tag riveted to the aluminum transaxle casing. Residential EZT (ZT-2100 / ZT-2200) drives are sealed at the factory without external filters, whereas commercial ZT-2800, ZT-3100, ZT-3200, and ZT-3400 drives feature a black spin-on hydraulic filter underneath or beside each unit.",
        checklist: [
          "ZT-2800 / ZT-3100 / ZT-3400: Uses external spin-on filter Hydro-Gear #52114",
          "Fluid Spec: SAE 20W-50 Full Synthetic or Conventional Motor Oil (approx. 2 to 2.5 quarts per side)",
          "ZT-5400 Powertrain: Uses cartridge filter #71943"
        ],
        amazonQuery: "Hydro-Gear 52114 filter 20W-50 hydro oil service kit",
        amazonCta: "View Complete Hydro-Gear 52114 Oil & Filter Kits on Amazon",
      },
      {
        heading: "2. Hydro-Gear #52114 Spin-On Filter Cross-Reference Matrix",
        body: "Every major mower manufacturer re-boxes the exact same Parker/Hydro-Gear #52114 spin-on filter under their own OEM part number at a 200% dealer markup. All of the numbers below are 100% identical in thread pitch, micron rating, and anti-drainback valve pressure:",
        checklist: [
          "Hydro-Gear OEM: #52114 | Stens Aftermarket: #120-410 | Wix: #57103",
          "Exmark / Toro OEM: #109-3321 | Scag OEM: #HG52114 | Hustler OEM: #600976",
          "Bad Boy OEM: #063-1050-00 | Ferris OEM: #5101026X1 | Gravely: #21545100"
        ],
        amazonQuery: "Hydro-Gear 52114 replacement filter 2 pack",
        amazonCta: "Buy 2-Pack 52114 Hydro Filters on Amazon",
      },
      {
        heading: "3. Post-Change Air Purging (Bleeding) Procedure",
        body: "After refilling both transaxles to the cold-fill line on the overflow expansion tank (or top check plug), you MUST purge trapped air from the hydraulic charge pumps before putting weight on the tires, or the mower will whine and jerk.",
        checklist: [
          "Jack up the rear of the mower so both rear drive tires are safely off the ground",
          "Pull both bypass release rods (tow valves) OUT and cycle the lap bars forward and reverse 6 times",
          "Push the bypass rods back IN, cycle the lap bars again until the wheels spin smoothly, then top off the expansion tank"
        ],
        amazonQuery: "20W-50 hydrostatic transmission oil zero turn",
        amazonCta: "Check 20W-50 Hydrostatic Fluid Prices on Amazon",
      }
    ],
  },
  {
    slug: "how-to-measure-broken-mower-belt",
    category: "Fitment & Measurement",
    title: "How to Measure a Broken or Stretched Lawn Mower Belt (OD vs. ID Formula)",
    metaDescription:
      "Part number worn off your mower belt? Learn how to measure top width (1/2\" vs 5/8\") and outside length accurately, account for belt stretch, and convert ID to OD.",
    summary:
      "When an old mower belt snaps and the printed OEM part number is rubbed off, measuring it directly with a tape measure often leads to ordering a belt that is 2 inches too long. Use this shop formula to find the exact factory belt size.",
    sections: [
      {
        heading: "1. Measure Top Width First (1/2\" vs. 5/8\" Profile)",
        body: "Measure across the widest flat top face of the V-belt—never the bottom narrow edge that rides in the bottom of the pulley V-groove. Almost 95% of outdoor power equipment belts fall into two widths: 1/2-inch (A-section / 4L) or 5/8-inch (B-section / 5L).",
        checklist: [
          "1/2 Inch (0.50\"): Standard on 42\"–50\" residential decks and hydro pump drives",
          "5/8 Inch (0.625\"): Standard on 48\"–72\" commercial zero-turn cutter decks",
          "If your worn belt measures 9/16\", it started life as a 5/8\" belt with worn sidewalls"
        ],
        amazonQuery: "v belt measuring tool gauge",
        amazonCta: "View Belt Measuring Gauges & Tools on Amazon",
      },
      {
        heading: "2. Subtract 1.5\" to 2.0\" from Stretched Broken Belts",
        body: "If your belt snapped in one place, lay it flat on the shop floor without pulling on it and measure from end to end. Because a worn belt stretches 1 to 2 inches over its lifespan—and laying a curved V-belt flat adds another 0.5 inches—a broken belt that measures 143.5 inches flat almost always corresponds to a 141.5-inch or 142-inch factory belt.",
        checklist: [
          "Never pull or stretch the broken belt while measuring",
          "If the belt is still in one piece, wrap a cloth tailor's tape around the OUTSIDE face (Outside Circumference)",
          "Cross-check your measurement against our Exact Belt Size Lookup directory below"
        ],
        amazonQuery: "cloth tape measure sewing tailor",
        amazonCta: "Get a Flexible Belt Measuring Tape on Amazon",
      }
    ],
  },
];
