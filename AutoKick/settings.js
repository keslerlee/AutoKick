import {
    @DecimalSliderProperty,
    @NumberProperty,
    @SelectorProperty,
    @SliderProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
} from "Vigilance";

@Vigilant("AutoKick", "AutoKick", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Completions", "Personal Bests", "Weapons", "Pets", "Misc"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
	@SwitchProperty({
        name: "Auto Kick",
        description: "Turn on or off autokick. Can also be enabled or disabled with /ak on or /ak off respectively.",
        category: "General",
        subcategory: "",
    })
    autokick = false;

    @SelectorProperty({
        name: "Auto Kick Mode",
        description: "Normal Mode: Tells party kick reason, then kicks.\nGhost Mode: Tells only you the reason, then kicks.\nBackseat Mode: Tells party kick reason, but doens't kick.\nBackground Mode: Tells only you the reason, and doesn't kick.",
        category: "General",
        subcategory: "",
        options: ["Normal Mode", "Ghost Mode", "Backseat Mode", "Background Mode"],
    })
    mode = 0;

    @SwitchProperty({
        name: "Developer Mode",
        description: "Developer Mode.",
        category: "General",
        subcategory: "",
    })
    developerMode = false;

    @SwitchProperty({
        name: "Kick Nicked Players",
        description: "Kick players that are nicked.",
        category: "Misc",
        subcategory: "",
    })
    kickNicked = false;

    @SwitchProperty({
        name: "Require Magical Power",
        description: "Kick people who don't have a certain configurable amount of magical power.",
        category: "Misc",
        subcategory: "",
    })
    requireMagicalPower = false;

    @TextProperty({
        name: "Magical Power Amount",
        description: "Set the minimum amount of required magical power.",
        category: "Misc",
        subcategory: "",
    })
    magicalPowerAmount = "0";

    @SwitchProperty({
        name: "Require Terminator",
        description: "Kick people who don't have a Terminator.",
        category: "Weapons",
        subcategory: "",
    })
    requireTerminator = false;

    @SwitchProperty({
        name: "Don't Require Mage To Have Terminator",
        description: "Don't kick Mage for not having a Terminator.",
        category: "Weapons",
        subcategory: "",
    })
    unrequireMageTerminator = false;

    @SwitchProperty({
        name: "Require Wither Impact",
        description: "Kick people who don't have a Wither Impact weapon.",
        category: "Weapons",
        subcategory: "",
    })
    requireWitherImpact = false;

    @SwitchProperty({
        name: "Require Gyrokinetic Wand",
        description: "Kick people who don't have a Gyrokinetic Wand.",
        category: "Weapons",
        subcategory: "",
    })
    requireGyro = false;

    @SwitchProperty({
        name: "Require Golden Dragon",
        description: "Kick people who don't have a Golden Dragon.",
        category: "Pets",
        subcategory: "",
    })
    requireGoldenDragon = false;

    @TextProperty({
        name: "Golden Dragon Level",
        description: "Set the minimum level the Golden Dragon should be.",
        category: "Pets",
        subcategory: "",
    })
    goldenDragonLevel = "0";

    @TextProperty({
        name: "Bank Coins Amount",
        description: "Set the minimum amount of required coins (in millions) in the bank.",
        category: "Pets",
        subcategory: "",
    })
    bankCoinsAmount = "0";

    @SwitchProperty({
        name: "Require Spirit",
        description: "Kick people who don't have a legendary Spirit pet.",
        category: "Pets",
        subcategory: "",
    })
    requireSpirit = false;

    @SwitchProperty({
        name: "Require F7 Completions",
        description: "Kick people who don't have enough F7 completions.",
        category: "Completions",
        subcategory: "",
    })
    requireF7Comps = false;

    @TextProperty({
        name: "F7 Comp Count",
        description: "Set the minimum F7 comps a player must have.",
        category: "Completions",
        subcategory: "",
    })
    f7Comps = "0";

    @SwitchProperty({
        name: "Require M4 Completions",
        description: "Kick people who don't have enough M4 completions.",
        category: "Completions",
        subcategory: "",
    })
    requireM4Comps = false;

    @TextProperty({
        name: "M4 Comp Count",
        description: "Set the minimum M4 comps a player must have.",
        category: "Completions",
        subcategory: "",
    })
    m4Comps = "0";

    @SwitchProperty({
        name: "Require M5 Completions",
        description: "Kick people who don't have enough M5 completions.",
        category: "Completions",
        subcategory: "",
    })
    requireM5Comps = false;

    @TextProperty({
        name: "M5 Comp Count",
        description: "Set the minimum M5 comps a player must have.",
        category: "Completions",
        subcategory: "",
    })
    m5Comps = "0";

    @SwitchProperty({
        name: "Require M6 Completions",
        description: "Kick people who don't have enough M6 completions.",
        category: "Completions",
        subcategory: "",
    })
    requireM6Comps = false;

    @TextProperty({
        name: "M6 Comp Count",
        description: "Set the minimum M6 comps a player must have.",
        category: "Completions",
        subcategory: "",
    })
    m6Comps = "0";

    @SwitchProperty({
        name: "Require M7 Completions",
        description: "Kick people who don't have enough M7 completions.",
        category: "Completions",
        subcategory: "",
    })
    requireM7Comps = false;

    @TextProperty({
        name: "M7 Comp Count",
        description: "Set the minimum M7 comps a player must have.",
        category: "Completions",
        subcategory: "",
    })
    m7Comps = "0";

    @SwitchProperty({
        name: "Require F7 PB",
        description: "Kick people who don't have a good enough F7 PB.",
        category: "Personal Bests",
        subcategory: "",
    })
    requireF7 = false;

    @TextProperty({
        name: "F7 PB Time",
        description: "Set the F7 PB time (in seconds) a player must have.",
        category: "Personal Bests",
        subcategory: "",
    })
    f7Time = "600";

    @SwitchProperty({
        name: "Require M4 PB",
        description: "Kick people who don't have a good enough M4 PB.",
        category: "Personal Bests",
        subcategory: "",
    })
    requireM4 = false;

    @TextProperty({
        name: "M4 PB Time",
        description: "Set the M4 PB time (in seconds) a player must have.",
        category: "Personal Bests",
        subcategory: "",
    })
    m4Time = "600";

    @SwitchProperty({
        name: "Require M5 PB",
        description: "Kick people who don't have a good enough M5 PB.",
        category: "Personal Bests",
        subcategory: "",
    })
    requireM5 = false;

    @TextProperty({
        name: "M5 PB Time",
        description: "Set the M5 PB time (in seconds) a player must have.",
        category: "Personal Bests",
        subcategory: "",
    })
    m5Time = "600";

    @SwitchProperty({
        name: "Require M6 PB",
        description: "Kick people who don't have a good enough M6 PB.",
        category: "Personal Bests",
        subcategory: "",
    })
    requireM6 = false;

    @TextProperty({
        name: "M6 PB Time",
        description: "Set the M6 PB time (in seconds) a player must have.",
        category: "Personal Bests",
        subcategory: "",
    })
    m6Time = "600";

    @SwitchProperty({
        name: "Require M7 PB",
        description: "Kick people who don't have a good enough M7 PB.",
        category: "Personal Bests",
        subcategory: "",
    })
    requireM7 = false;

    @TextProperty({
        name: "M7 PB Time",
        description: "Set the M7 PB time (in seconds) a player must have.",
        category: "Personal Bests",
        subcategory: "",
    })
    m7Time = "600";

    constructor() {
        this.initialize(this);
        this.addDependency("Magical Power Amount", "Require Magical Power");
        this.addDependency("Golden Dragon Level", "Require Golden Dragon");
        this.addDependency("Bank Coins Amount", "Require Golden Dragon");
        this.addDependency("F7 Comp Count", "Require F7 Completions");
        this.addDependency("M4 Comp Count", "Require M4 Completions");
        this.addDependency("M5 Comp Count", "Require M5 Completions");
        this.addDependency("M6 Comp Count", "Require M6 Completions");
        this.addDependency("M7 Comp Count", "Require M7 Completions");
        this.addDependency("F7 PB Time", "Require F7 PB");
        this.addDependency("M4 PB Time", "Require M4 PB");
        this.addDependency("M5 PB Time", "Require M5 PB");
        this.addDependency("M6 PB Time", "Require M6 PB");
        this.addDependency("M7 PB Time", "Require M7 PB");
        this.addDependency("Don't Require Mage To Have Terminator", "Require Terminator");
    }
}

export default new Settings();
