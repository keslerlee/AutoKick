import request from "requestV2";
import Settings from "./settings";
import { Profile } from "./profile";

let messages = [];
let requests = [];
let cache = new Map();
let modes = ["Normal Mode", "Ghost Mode", "Backseat Mode", "Background Mode"];
let ongoingRequests = 0;

function currentProfile(data) {
    let profiles = Object.values(data.profiles);
    let profile = null;
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].current) {
            return profiles[i];
        }
    }
    return null;
}

function pbToString(time) {
    return Math.floor(time / 60) + "m " + (time % 60) + "s";
}

function check(setting, conditional, reason, username) {
    if (setting && conditional) {
        switch (Settings.mode) {
            case 0:
                messages.push("pc [AutoKick] Kicked " + username + ": " + reason + ".");
                messages.push("p kick " + username);
                break;
            case 1:
                ChatLib.chat("&c[AutoKick] &fKicked " + username + ": " + reason + ".");
                messages.push("p kick " + username);
                break;
            case 2:
                messages.push("pc [AutoKick] Kick " + username + ": " + reason + ".");
                break;
            case 3:
                ChatLib.chat("&c[AutoKick] &fKick " + username + ": " + reason + ".");
                break;
        }
        return true;
    }
    return false;
}

function kickIfEligible(username, profile, dungeonClass) {
    if (check(Settings.requireMagicalPower, profile.magical_power < parseInt(Settings.magicalPowerAmount), "MP is under " + parseInt(Settings.magicalPowerAmount), username)) return;
    if (check(Settings.requireTerminator, !profile.terminator.exists && !(Settings.unrequireMageTerminator && dungeonClass == "Mage"), "No Terminator", username)) return;
    if (check(Settings.requireWitherImpact, !profile.hyperion.wither_impact, "No Wither Impact", username)) return;
    if (check(Settings.requireGyro, !profile.gyro.exists, "No Gyro", username)) return;
    if (check(Settings.requireGoldenDragon, !profile.gdrag.exists, "No Golden Dragon", username)) return;
    if (check(Settings.requireGoldenDragon, profile.gdrag.level < parseInt(Settings.goldenDragonLevel), "Golden Dragon isn't at least level " + Settings.goldenDragonLevel, username)) return;
    if (check(Settings.requireGoldenDragon, profile.bank < parseInt(Settings.bankCoinsAmount) * 1000000, "Has under " + (parseInt(Settings.bankCoinsAmount) * 1000000) + " in bank", username)) return;
    if (check(Settings.requireSpirit, !profile.spirit.exists, "No Spirit Pet", username)) return;
    if (check(Settings.requireF7Comps, profile.comps.f7 < parseInt(Settings.f7Comps), "Less than " + parseInt(Settings.f7Comps) + " F7 Comp(s)", username)) return;
    if (check(Settings.requireM4Comps, profile.comps.m4 < parseInt(Settings.m4Comps), "Less than " + parseInt(Settings.m4Comps) + " M4 Comp(s)", username)) return;
    if (check(Settings.requireM5Comps, profile.comps.m5 < parseInt(Settings.m5Comps), "Less than " + parseInt(Settings.m5Comps) + " M5 Comp(s)", username)) return;
    if (check(Settings.requireM6Comps, profile.comps.m6 < parseInt(Settings.m6Comps), "Less than " + parseInt(Settings.m6Comps) + " M6 Comp(s)", username)) return;
    if (check(Settings.requireM7Comps, profile.comps.m7 < parseInt(Settings.m7Comps), "Less than " + parseInt(Settings.m7Comps) + " M7 Comp(s)", username)) return;
    if (check(Settings.requireF7, profile.pbs.f7 == -1 || profile.pbs.f7 > parseInt(Settings.f7Time), "F7 PB is worse than " + pbToString(parseInt(Settings.f7Time)), username)) return;
    if (check(Settings.requireM4, profile.pbs.m4 == -1 || profile.pbs.m4 > parseInt(Settings.m4Time), "M4 PB is worse than " + pbToString(parseInt(Settings.m4Time)), username)) return;
    if (check(Settings.requireM5, profile.pbs.m5 == -1 || profile.pbs.m5 > parseInt(Settings.m5Time), "M5 PB is worse than " + pbToString(parseInt(Settings.m5Time)), username)) return;
    if (check(Settings.requireM6, profile.pbs.m6 == -1 || profile.pbs.m6 > parseInt(Settings.m6Time), "M6 PB is worse than " + pbToString(parseInt(Settings.m6Time)), username)) return;
    if (check(Settings.requireM7, profile.pbs.m7 == -1 || profile.pbs.m7 > parseInt(Settings.m7Time), "M7 PB is worse than " + pbToString(parseInt(Settings.m7Time)), username)) return;
    ChatLib.chat("&c[AutoKick] &f" + username + " passed all the requirements.");
}

function evaluateProfile(username, dungeonClass) {
    if (!Settings.autokick) return;
    if (cache.has(username)) {
        let date = new Date();
        if (date.getTime() - cache.get(username).last_updated < 180000) {
            if (Settings.developerMode) {
                ChatLib.chat("&c[AutoKick] &f" + JSON.stringify(cache.get(username)));
                ChatLib.chat("&c[AutoKick] &fProfile From Cache");
            }
            kickIfEligible(username, cache.get(username), dungeonClass);
            return;
        }
        cache.delete(username);
    }
    ongoingRequests++;
    request({url: "https://sky.shiiyu.moe/api/v2/profile/" + username, headers: { 'User-Agent': ' Mozilla/5.0', 'Content-Type': 'application/json' }, json: true}).then(function(data) {
        let shortProfile = new Profile(currentProfile(data));
        if (Settings.developerMode) {
            ChatLib.chat("&c[AutoKick] &f" + JSON.stringify(shortProfile));
            ChatLib.chat("&c[AutoKick] &fProfile From SkyCrypt API");
        }
        kickIfEligible(username, shortProfile, dungeonClass);
        cache.set(username, shortProfile);
        ongoingRequests--;
    }).catch(function(error) {
        check(Settings.kickNicked, error.error.substring(0, 36) == "SkyCryptError: No user with the name", "Nicked", username);
        ongoingRequests--;
    });
}

register("chat", (username, dungeonClass, classLevel) => {
    requests.push([username, dungeonClass]);
}).setCriteria(/&dParty Finder &r&f> &r&\w(\w+) &r&ejoined the dungeon group! \(&r&b(\w+) Level (\w+)&r&e\)&r/);

register("chat", () => {
    new Thread(() => {
        Thread.sleep(100);
        if (Settings.autokick) {
            ChatLib.chat("&c[AutoKick] &fis currently &aEnabled &fand set to " + modes[Settings.mode] + ".")
        } else {
            ChatLib.chat("&c[AutoKick] &fis currently &cDisabled&f.")
        }
    }).start();
}).setCriteria(/&dParty Finder &r&f> &r&aYour party has been queued in the dungeon finder!&r/);

register("step", () => {
    if (messages.length > 0) {
        ChatLib.command(messages.shift());
    }
    if (requests.length > 0 && ongoingRequests <= 1) {
        let temp = requests.shift();
        evaluateProfile(temp[0], temp[1]);
    }
}).setFps(2);

register("command", (arg) => {
    if (!arg) {
        Settings.openGUI();
    } else if (arg.toLowerCase() == "on") {
        Settings.autokick = true;
        ChatLib.chat("&c[AutoKick] &fhas been &aEnabled&f.")
    } else if (arg.toLowerCase() == "off") {
        Settings.autokick = false;
        ChatLib.chat("&c[AutoKick] &fhas been &cDisabled&f.")
    } else {
        ChatLib.chat("\n&c[AutoKick] &fCommands" +
                     "\n&cCommand Prefix&f: &a/autokick &for &a/ak" +
                     "\n&a/ak&f: Opens AutoKick settings." +
                     "\n&a/ak help&f: Shows you this help message." +
                     "\n&a/ak on&f: Turns AutoKick &aon&f." +
                     "\n&a/ak off&f: Turns AutoKick &coff&f." +
                     "\n&c[AutoKick] &fIssues" +
                     "\n&fYour party will &cdisband &fif you &ckick &fwith only &ctwo &fpeople in the party." +
                     "\n&fThis mod is &cslower &fthan other mods because it checks the &centire profile&f." +
                     "\n&fThis mod &ccaches &fprofiles, meaning &crepeat &foffenders will be &cinstantly &fkicked." +
                     "\n&fThis mod &cdoesn't know &fif you have &cpermission &fto &ckick&f players.");
    }
}).setName("autokick").setAliases("ak");

register("command", (arg) => {
    if (!Settings.developerMode) return;
    evaluateProfile(arg, "Tank");
}).setName("kicktest");
